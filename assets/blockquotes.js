window.onload = function () {
    const topBlockquotes = document.querySelectorAll('.post > blockquote');

    function colorize(blockquote, depth) {
        if (depth % 2 === 0) {
            blockquote.style.backgroundColor = '#1f1f1f';
        } else {
            blockquote.style.backgroundColor = 'black';
        }

        const nestedBlockquotes = findDirectBlockquotes(blockquote);
        for (nestedBlockquote of nestedBlockquotes) {
            colorize(nestedBlockquote, depth + 1);
        }
    }

    for (let i = 0; i < topBlockquotes.length; i++) {
        colorize(topBlockquotes[i], 0);
    }
};

function findDirectBlockquotes(element) {
    const allBlockquotes = element.querySelectorAll('blockquote');
    const directBlockquotes = Array.from(allBlockquotes).filter(blockquote => {
        const closestBlockquote = blockquote.parentNode.closest('blockquote');
        return closestBlockquote === element
    });
    return directBlockquotes;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('blockquote').forEach(blockquote => {
        if (blockquote.parentNode.closest('blockquote')) {
            const parentElement = blockquote.parentElement;
            let randomId = Math.floor(Math.random() * 100000);
            blockquote.id = `blockquote-${randomId}`;
            const toggleNextReply = createButton('Show Next Reply', (event) => toggleVisibility(event, blockquote.id), "firstButton");
            const showAllReplies = createButton('Show All Replies', (event) => toggleVisibility(event, blockquote.id), "secondButton");
            const breakElement = document.createElement('br');
            const breakElement2 = document.createElement('br');
            parentElement.insertBefore(breakElement, blockquote);
            parentElement.insertBefore(toggleNextReply, blockquote);
            parentElement.insertBefore(showAllReplies, blockquote);
            parentElement.insertBefore(breakElement2, blockquote);
        }
    });

    enableDesktopModeIfNestedBlockquotes();
    addReplyLinks();
    const replyId = resolveReplyIdFromHashtag();
    if (replyId) {
        unhideMatchingReplyAndContext(replyId);
    }
});

function addReplyLinks() {
    document.querySelectorAll('blockquote').forEach(blockquote => {
        if (blockquote.parentNode.closest('blockquote')) {
            let lastElement = blockquote.firstChild;
            while (true) {
                nextElement = lastElement.nextSibling;
                if (nextElement) {
                    if (nextElement.tagName === 'BUTTON') {
                        break;
                    }
                    lastElement = nextElement;
                }
                else {
                    break;
                }
            }

            if (lastElement && lastElement.tagName !== 'BUTTON') {
                const replyText = lastElement.textContent.trim();
                const replyId = replyText.split(' ').slice(0, 6).join('-');
                lastElement.id = replyId;

                const linkElement = document.createElement('a');
                linkElement.href = `#${replyId}`;
                linkElement.textContent = 'Link to this reply';
                blockquote.prepend(linkElement);
            }
            else {
                console.log("error", lastElement, blockquote)
            }
        };
    })
}


function resolveReplyIdFromHashtag() {
    const hashtag = window.location.hash.slice(1);
    if (document.querySelector(`#${hashtag}`) === null) {
        return null;
    }
    return hashtag;
}


function unHideAncestors(element) {
    // Find all blockquote ancestors
    let current = element;
    while (current = current.closest('blockquote')) {
        // Process each child element of the current blockquote
        Array.from(current.children).forEach(child => {
            // Apply the display style only if the child's closest blockquote is the current blockquote
            if (child.closest('blockquote') === current) {
                setDisplayRecursively(child);
            }
        });
    }
    function setDisplayRecursively(elem) {
        elem.style.display = "";
        Array.from(elem.children).forEach(setDisplayRecursively);
    }
}

function unhideMatchingReplyAndContext(replyId) {
    const replyElement = document.getElementById(replyId);
    if (replyElement) {
        const replyBlockquote = replyElement.closest('blockquote');
        let replyChildElements = Array.from(blockquote.querySelectorAll('*')).filter(el =>
            el.closest('blockquote') === blockquote
        );
        replyChildElements.forEach(element => {
            element.style.display = '';
        });
        unHideAncestors(replyBlockquote);
        highlightReply(replyBlockquote);
        console.log(replyLink)
        setTimeout(() => {
            replyLink.scrollIntoView();
        }, 1500);
    }
}

function highlightReply(blockquote) {
    // Get all child elements of the blockquote
    const elements = blockquote.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        // Check if the closest blockquote ancestor is the original blockquote
        if (element.closest('blockquote') === blockquote && element.tagName !== "BUTTON") {
            element.style.color = '#00ff00';
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
function toggleVisibility(event, replyId) {
    const clickedButton = event.target;
    let recursive = false;
    if (clickedButton.textContent.includes('Next')) {
        recursive = true;
    }
    const replyElement = document.getElementById(replyId);
    let childElements = Array.from(replyElement.querySelectorAll('*')).filter(el =>
        el.closest('blockquote') === replyElement || recursive
    );
    const visible = clickedButton.textContent.includes('Show');

    let targetDisplay = visible ? '' : 'none';
    childElements.forEach(element => {
        element.style.display = targetDisplay;
        if (element.matches("button") && recursive) {
            toggleButtonText(element, visible);
        }
    });
    toggleButtonText(clickedButton, visible);
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