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
    assignIdsToBlockquotes();
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(blockquote => {
        // Create buttons
        const showAllButton = createButton('Show All', () => toggleVisibility(true, blockquote.id));
        const hideAllButton = createButton('Hide All', () => toggleVisibility(false, blockquote.id));
        const showChildrenButton = createButton('Show Child', () => toggleVisibility(true, `childOf_${blockquote.id}`));
        const hideChildrenButton = createButton('Hide Child', () => toggleVisibility(false, `childOf_${blockquote.id}`));

        blockquote.appendChild(showAllButton);
        blockquote.appendChild(hideAllButton);
        blockquote.appendChild(showChildrenButton);
        blockquote.appendChild(hideChildrenButton);
    });

    assignDepthLevelClassesToBlockquotes();
    addClassesToChildElements();
});

function assignIdsToBlockquotes() {
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach((blockquote, index) => {
        blockquote.id = `blockquote-${index}`;
    });
}

// Function to create buttons
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}

// Function to toggle visibility of elements based on classes
function toggleVisibility(visible, className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        if (!element.textContent.includes('#draft')) {
            element.style.display = visible ? 'inline-block' : 'none';
        }
    });
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

function addClassesToChildElements() {
    const depthLevels = Array.from(document.querySelectorAll('blockquote'))
        .map(blockquote => parseInt(blockquote.className.match(/depth-(\d+)/)[1]))
        .filter((depth, index, self) => self.indexOf(depth) === index);

    depthLevels.forEach(depth => {
        const blockquotesAtDepth = Array.from(document.querySelectorAll(`.depth-${depth}`));
        blockquotesAtDepth.forEach((blockquote, index) => {
            const nextBlockquote = blockquotesAtDepth[index + 1];
            const blockquoteBottom = blockquote.getBoundingClientRect().bottom;
            const nextBlockquoteTop = nextBlockquote ? nextBlockquote.getBoundingClientRect().top : Infinity;

            const childElements = Array.from(document.querySelectorAll('*'))
                .filter(element => !element.matches('blockquote') && element.closest('blockquote'))
                .filter(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    return elementTop > blockquoteBottom && elementTop < nextBlockquoteTop;
                });

            childElements.forEach(element => {
                element.classList.add(blockquote.id);
                const closestBlockquote = element.closest('blockquote');
                if (closestBlockquote && parseInt(closestBlockquote.className.match(/depth-(\d+)/)[1]) === depth - 1) {
                    element.classList.add(`childOf_${blockquote.id}`);
                }
                if (element.textContent.includes('#draft')) {
                    element.style.display = 'none';
                }
            });
        });
    });
}