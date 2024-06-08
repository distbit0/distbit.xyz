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
            blockquote.style.backgroundColor = '#1f1f1f';
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
    assignDepthLevelClassesAndIdsToBlockquotes();
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(blockquote => {
        const lastElement = blockquote.lastElementChild;
        // don't add buttons to blockquotes that do not actually have any text in them
        if (lastElement && lastElement.tagName !== 'BLOCKQUOTE') {
            const toggleNextReply = createButton('Show Next Reply', (event) => toggleVisibility(event, blockquote.id), "firstButton");
            const showAllReplies = createButton('Show All Replies', (event) => toggleVisibility(event, blockquote.id), "secondButton");
            blockquote.appendChild(toggleNextReply);
            blockquote.appendChild(showAllReplies);
        }
        else {
            // so that logic works which relies on each blockquote having at least one child element
            // specifically logic relating to recursively hiding/showing next blockquote until text is found
            let dustElement = document.createElement('div');
            dustElement.id = 'dustElement';
            dustElement.style.display = 'none';
            blockquote.appendChild(dustElement)
        }
    });
    enableDesktopModeIfNestedBlockquotes();

    addReplyLinks();
    addClassesToChildElements();
    const replyId = resolveReplyIdFromHashtag();
    if (replyId) {
        unhideMatchingReplyAndContext(replyId);
    }
});

function addReplyLinks() {
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(parentBlockquote => {
        const nestedBlockquotes = Array.from(parentBlockquote.children).filter(child => child.tagName === 'BLOCKQUOTE');
        nestedBlockquotes.forEach(nestedBlockquote => {
            let lastElement = nestedBlockquote.nextElementSibling;
            lastElement = lastElement.id === 'dustElement' ? null : lastElement;
            while (lastElement) {
                nextElement = lastElement.nextElementSibling;
                if (nextElement.tagName === 'BUTTON' || nextElement.tagName === 'BLOCKQUOTE') {
                    break;
                }
                lastElement = lastElement.nextElementSibling;
            }

            if (lastElement && lastElement.tagName !== 'BUTTON' && lastElement.tagName !== 'BLOCKQUOTE') {
                const replyText = lastElement.textContent.trim();
                const replyId = replyText.split(' ').slice(0, 5).join('-');
                lastElement.id = replyId;

                const linkElement = document.createElement('a');
                linkElement.href = `#${replyId}`;
                linkElement.textContent = 'Link to this reply';
                nestedBlockquote.insertAdjacentElement('afterend', linkElement);
            }
            else {
                console.log(lastElement);
            }
        });
    });
}

function resolveReplyIdFromHashtag() {
    const hashtag = window.location.hash.slice(1);
    if (hashtag) {
        const elements = document.querySelectorAll('*');
        for (const element of elements) {
            if (element.id === hashtag) {
                return element.id;
            }
        }
    }
    return null;
}

function unhideMatchingReplyAndContext(replyId) {
    const replyElement = document.getElementById(replyId);
    if (replyElement) {
        const replyBlockquote = replyElement.closest('blockquote');
        const replyDepth = parseInt(replyBlockquote.id.match(/depth(\d+)-/)[1]);

        let latestDepth = replyDepth;
        const blockquotes = document.querySelectorAll('blockquote');
        for (const blockquote of blockquotes) {
            const blockquoteDepth = parseInt(blockquote.id.match(/depth(\d+)-/)[1]);
            if (blockquoteDepth < latestDepth) {
                const childElements = blockquote.querySelectorAll(`:scope > *:not(blockquote)`);
                for (let i = childElements.length - 1; i >= 0; i--) {
                    const element = childElements[i];
                    element.style.display = '';
                    if (element.previousElementSibling && element.previousElementSibling.tagName === 'BLOCKQUOTE') {
                        break;
                    }
                }
                latestDepth = blockquoteDepth;
            }
        }
    }
}


// Function to create buttons
function createButton(text, clickHandler, id) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    button.classList.add(id);
    return button;
}

function toggleButtonText(button, visible) {
    if (button.classList.contains("firstButton")) {
        button.textContent = visible ? 'Hide All Replies' : 'Show Next Reply';
    }
    else if (button.classList.contains("secondButton")) {
        button.textContent = visible ? 'Hide All Replies' : 'Show All Replies';
    }
}

// Function to toggle visibility of elements based on classes
function toggleVisibility(event, className) {
    const clickedButton = event.target;
    if (clickedButton.textContent.includes('Next')) {
        className = "childOf_" + className;
    }
    const elements = document.querySelectorAll(`.${className}`);
    const visible = clickedButton.textContent.includes('Show');

    let targetDisplay = visible ? '' : 'none';
    elements.forEach(element => {
        if (!element.textContent.includes('#draft')) {
            element.style.display = targetDisplay;
        }
        if (element.matches("button") && !className.includes("childOf_") && element !== clickedButton) {
            toggleButtonText(element, visible);
        }
    });
    // keep toggling visibility of elements until come across one which actually contains text, to save user from having to successively toggle until they find a blockquote with text
    const modifiedElements = Array.from(elements).filter(element => element.style.display == targetDisplay);
    if (!modifiedElements.some(element => element.textContent.trim().length > 0 && !element.matches("button"))) {
        const closestBlockquoteClass = modifiedElements[0].closest('blockquote').id;
        toggleVisibility(event, closestBlockquoteClass);
    }
    else {
        toggleButtonText(clickedButton, visible);
    }
}

function assignDepthLevelClassesAndIdsToBlockquotes() {
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


function isMobileBrowser() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function enableDesktopModeIfNestedBlockquotes() {
    const nestedBlockquotesExist = document.querySelector('blockquote blockquote') !== null;
    if (nestedBlockquotesExist && isMobileBrowser()) {
        enableDesktopMode();
    }
}

function enableDesktopMode() {
    const metaViewport = document.querySelector('meta[name="viewport"]');

    if (metaViewport) {
        metaViewport.setAttribute('content', 'width=1024');
    } else {
        const newMetaViewport = document.createElement('meta');
        newMetaViewport.setAttribute('name', 'viewport');
        newMetaViewport.setAttribute('content', 'width=1024');
        document.head.appendChild(newMetaViewport);
    }
}