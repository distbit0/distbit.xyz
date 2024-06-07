window.onload = function () {
    const allBlockquotes = document.querySelectorAll('blockquote');
    let maxDepth = 0;
    const topBlockquotes = document.querySelectorAll('.post > blockquote');

    // Function to calculate the maximum depth of blockquote nesting
    function calculateDepth(blockquote, depth) {
        if (depth > maxDepth) {
            maxDepth = depth;
        }
        const nestedBlockquotes = blockquote.querySelectorAll(':scope > blockquote');
        for (let i = 0; i < nestedBlockquotes.length; i++) {
            calculateDepth(nestedBlockquotes[i], depth + 1);
        }
    }

    for (let i = 0; i < allBlockquotes.length; i++) {
        calculateDepth(allBlockquotes[i], 0);
    }

    function colorize(blockquote, depth) {
        if ((maxDepth - depth) % 2 === 0) {
            blockquote.style.backgroundColor = '#262626';
        } else {
            blockquote.style.backgroundColor = 'black';
        }

        const nestedBlockquotes = blockquote.querySelectorAll(':scope > blockquote');
        for (let i = 0; i < nestedBlockquotes.length; i++) {
            colorize(nestedBlockquotes[i], depth + 1);
        }
    }

    for (let i = 0; i < topBlockquotes.length; i++) {
        colorize(topBlockquotes[i], 0);
    }
};


document.addEventListener('DOMContentLoaded', function () {
    assignDepthLevelClassesToBlockquotes();
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(blockquote => {
        const showAllReplies = createButton('Show All Replies', (event) => toggleVisibility(event, blockquote.id));
        const hideAllReplies = createButton('Hide All Replies', (event) => toggleVisibility(event, blockquote.id));
        const toggleNextReply = createButton('Show Next Reply', (event) => toggleVisibility(event, `childOf_${blockquote.id}`));
        blockquote.appendChild(toggleNextReply);
        blockquote.appendChild(showAllReplies);
        blockquote.appendChild(hideAllReplies);
    });
    addClassesToChildElements();
});

// Function to create buttons
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}

// Function to toggle visibility of elements based on classes
function toggleVisibility(event, className) {
    const clickedButton = event.target;
    const elements = document.querySelectorAll(`.${className}`);
    const visible = clickedButton.textContent.includes('Show');

    let targetDisplay = visible ? 'inline-block' : 'none';
    elements.forEach(element => {
        if (!element.textContent.includes('#draft')) {
            element.style.display = targetDisplay;
        }
    });

    const modifiedElements = Array.from(elements).filter(element => element.style.display == targetDisplay);
    if (!modifiedElements.some(element => element.textContent.trim().length > 0 && !element.matches("button"))) {
        elements.forEach(element => { if (element.matches("button")) { element.textContent = element.textContent.replace('Show Next', 'Hide Next'); } });
        const closestBlockquoteClass = "childOf_" + modifiedElements[0].closest('blockquote').id;
        toggleVisibility(event, closestBlockquoteClass);
    }
    clickedButton.textContent = visible ? clickedButton.textContent.replace('Show Next', 'Hide Next') : clickedButton.textContent.replace('Hide Next', 'Show Next');
}

function assignDepthLevelClassesToBlockquotes() {
    const blockquotes = Array.from(document.querySelectorAll('blockquote'));
    const depthLevels = new Map();

    blockquotes.forEach(blockquote => {
        let depth = 0;
        let parent = blockquote.parentElement;
        while (parent) {
            if (parent.tagName === 'BLOCKQUOTE') {
                depth++;
            }
            parent = parent.parentElement;
        }

        if (!depthLevels.has(depth)) {
            depthLevels.set(depth, []);
        }
        depthLevels.get(depth).push(blockquote);
    });

    depthLevels.forEach((blockquotesAtDepth, depth) => {
        blockquotesAtDepth.forEach((blockquote, index) => {
            blockquote.id = `depth${depth}-${index}`;
            blockquote.classList.add(`depth-${depth}`);
        });
    });
}

function isElementBetween(topElement, bottomElement, compElement) {
    const originalDisplay = compElement.style.display;
    compElement.style.display = 'block';
    const topRect = topElement.getBoundingClientRect();
    const compRect = compElement.getBoundingClientRect();
    const topBottom = topRect.bottom;
    const bottomTop = bottomElement ? bottomElement.getBoundingClientRect().top : Infinity;
    const compTop = compRect.top;
    compElement.style.display = originalDisplay;
    return compTop >= topBottom && compTop <= bottomTop;
}

function addClassesToChildElements() {
    const depthLevels = Array.from(document.querySelectorAll('blockquote'))
        .map(blockquote => parseInt(blockquote.className.match(/depth-(\d+)/)[1]))
        .filter((depth, index, self) => self.indexOf(depth) === index);
    let maxDepth = depthLevels.length;
    depthLevels.forEach(depth => {
        const blockquotesAtDepth = Array.from(document.querySelectorAll(`.depth-${depth}`));
        blockquotesAtDepth.forEach((blockquote, index) => {
            const nextBlockquote = blockquotesAtDepth[index + 1];
            const childElements = Array.from(document.querySelectorAll('*'))
                .filter(element => !element.matches('blockquote') && element.closest('blockquote'))
                .filter(element => {
                    return isElementBetween(blockquote, nextBlockquote, element);
                });
            childElements.forEach(element => {
                element.classList.add(blockquote.id);
                const closestBlockquote = element.closest('blockquote');
                if (closestBlockquote && parseInt(closestBlockquote.className.match(/depth-(\d+)/)[1]) === depth - 1) {
                    element.classList.add(`childOf_${blockquote.id}`);
                    if (depth < maxDepth) {
                        element.style.display = 'none';
                    }
                }
                if (element.textContent.includes('#draft')) {
                    element.style.display = 'none';
                }
            });
        });
    });
}