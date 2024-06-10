function findDirectBlockquotes(element) {
    const allBlockquotes = element.querySelectorAll('blockquote');
    const directBlockquotes = Array.from(allBlockquotes).filter(blockquote => {
        const closestBlockquote = blockquote.parentNode.closest('blockquote');
        return closestBlockquote === element
    });
    return directBlockquotes;
}

function resolveReplyIdFromHashtag() {
    const hashtag = window.location.hash.slice(1);
    if (hashtag === "") {
        return null;
    }
    if (document.querySelector(`#${hashtag}`) === null) {
        return null;
    }
    return hashtag;
}

function unHideAncestors(element) {
    let current = element.closest('blockquote');
    while (true) {
        let lastElement = current;
        current = current.parentNode.closest('blockquote')
        if (current === null) {
            break;
        }
        let childElements = Array.from(current.querySelectorAll('*')).filter(el =>
            el.closest('blockquote') === current
        );
        current.style.display = "";
        childElements.forEach(element => {
            element.style.display = '';
            if (element.matches("button") && element.classList.contains(lastElement.id)) {
                toggleButtonText(element, true);
            }
        });
    }
}


function highlightReply(blockquote) {
    // Get all child elements of the blockquote
    const elements = blockquote.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        // Check if the closest blockquote ancestor is the original blockquote
        if (element.closest('blockquote') === blockquote && element.tagName !== "BUTTON") {
            element.style.color = 'blue';
        }
    }
}


// Function to create buttons
function createButton(text, clickHandler, classes) {
    const button = document.createElement('button');
    button.textContent = text;
    // button.style.borderColor = "#00ff00";
    // button.style.borderWidth = "2px";
    button.style.color = "#00ff00";
    button.style.backgroundColor = "black";
    button.addEventListener('click', clickHandler);
    classes.forEach(className => button.classList.add(className));
    return button;
}

function toggleButtonText(button, visible) {
    if (button.classList.contains("firstButton")) {
        button.textContent = visible ? 'Hide All Replies' : 'Show Next Reply';
    }
    else if (button.classList.contains("secondButton")) {
        button.textContent = visible ? 'Hide All Replies' : 'Show All Replies';
    }
    button.style.color = visible ? "white" : "#00ff00";
}

// Function to toggle visibility of elements based on classes
function toggleVisibility(event, replyId) {
    const clickedButton = event.target;
    const otherButton = [
        clickedButton.previousElementSibling,
        clickedButton.nextElementSibling
    ].find(sibling => sibling && sibling.tagName === 'BUTTON');
    const recursive = clickedButton.textContent.includes('All')
    const visible = clickedButton.textContent.includes('Show');
    let targetDisplay = visible ? '' : 'none';

    const replyElement = document.getElementById(replyId);
    let replyBlockquote = replyElement.closest('blockquote');
    let childElements = Array.from(replyBlockquote.querySelectorAll('*')).filter(el =>
        el.closest('blockquote') === replyBlockquote || recursive
    );
    replyBlockquote.style.display = targetDisplay;
    childElements.forEach(element => {
        element.style.display = targetDisplay;
        if (element.matches("button") && recursive) {
            toggleButtonText(element, visible);
        }
    });
    toggleButtonText(clickedButton, visible);
    if (!(visible && !recursive)) {
        toggleButtonText(otherButton, visible);
    }
    else {
        otherButton.style.color = visible ? "white" : "#00ff00";
    }
}



function alternateBlockquoteColors() {
    const topBlockquotes = document.querySelectorAll('.post > blockquote');

    function colorize(blockquote, depth) {
        if (depth % 2 === 0) {
            blockquote.style.backgroundColor = '#1f1f1f';
        } else {
            blockquote.style.backgroundColor = 'black';
        }

        const nestedBlockquotes = findDirectBlockquotes(blockquote);
        for (let nestedBlockquote of nestedBlockquotes) {
            colorize(nestedBlockquote, depth + 1);
        }
    }

    for (let i = 0; i < topBlockquotes.length; i++) {
        colorize(topBlockquotes[i], 0);
    }
}

function moveNestedBlockquotes() {
    document.querySelectorAll('blockquote').forEach(blockquote => {
        const closestBlockquoteAncestor = blockquote.parentNode.closest('blockquote');
        if (closestBlockquoteAncestor) {
            let seniorAncestor = blockquote;
            while (seniorAncestor.parentNode !== closestBlockquoteAncestor) {
                seniorAncestor = seniorAncestor.parentNode;
            }
            closestBlockquoteAncestor.insertBefore(blockquote, seniorAncestor.nextSibling);
        }
    });
}
function addButtons() {
    document.querySelectorAll('blockquote').forEach(blockquote => {
        if (blockquote.parentNode.closest('blockquote')) {
            const parentElement = blockquote.parentElement;
            const showNextReply = createButton('Show Next Reply', (event) => toggleVisibility(event, blockquote.id), ["firstButton", blockquote.id]);
            const showAllReplies = createButton('Show All Replies', (event) => toggleVisibility(event, blockquote.id), ["secondButton", blockquote.id]);
            const breakElement = document.createElement('br');
            const breakElement2 = document.createElement('br');
            parentElement.insertBefore(breakElement, blockquote);
            parentElement.insertBefore(showNextReply, blockquote);
            parentElement.insertBefore(showAllReplies, blockquote);
            parentElement.insertBefore(breakElement2, blockquote);
        }
    });
}

function addReplyLinks() {
    document.querySelectorAll('blockquote').forEach(blockquote => {
        if (blockquote.parentNode.closest('blockquote')) {
            let replyId = blockquote.id;
            let linkElement = document.createElement('a');
            linkElement.style.color = "white";
            linkElement.href = `#${replyId}`;
            if (window.location.protocol === 'http:') {
                linkElement.href = 'https://distbit.xyz' + window.location.pathname + `#${replyId}`;
            }
            linkElement.textContent = 'Link to this reply';
            linkElement.addEventListener('click', function (event) {
                event.preventDefault();
                let hashtag = "#" + this.getAttribute('href').split('#')[1];
                window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname + hashtag;
                window.location.reload();
            });
            blockquote.prepend(linkElement);
        };
    })
}

function hideNestedBlockquoteElements() {
    document.querySelectorAll('blockquote').forEach(blockquote => {
        if (blockquote.parentNode.closest('blockquote')) {
            blockquote.style.display = 'none';
            let childElements = blockquote.querySelectorAll('*');
            for (let childElement of childElements) {
                childElement.style.display = 'none';
            }
        }
    })
}

function unhideMatchingReplyAndContext() {
    replyId = resolveReplyIdFromHashtag();
    if (!replyId) {
        return;
    }
    const replyElement = document.getElementById(replyId);
    if (replyElement) {
        const replyBlockquote = replyElement.closest('blockquote');
        let replyChildElements = Array.from(replyBlockquote.querySelectorAll('*')).filter(el =>
            el.closest('blockquote') === replyBlockquote
        );
        replyChildElements.forEach(element => {
            element.style.display = '';
        });
        replyBlockquote.style.display = '';
        unHideAncestors(replyBlockquote);
        highlightReply(replyBlockquote);
        setTimeout(() => {
            replyBlockquote.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })
        }, 1000); // not sure why this is necessary, but it is, for scrollIntoView to work
    }
}

function getBlockquoteAncestorCount(blockquote) {
    let count = 0;
    let ancestor = blockquote.parentElement.closest("blockquote");
    while (ancestor) {
        count++;
        ancestor = ancestor.parentElement.closest("blockquote");
    }
    return count;
}
function getPrevSiblingText(parentElement, childElement) {
    let currentChild = parentElement.lastChild;
    let seenChild = false;
    while (currentChild) {
        if (currentChild.textContent.trim() !== '' && seenChild && !currentChild.matches("blockquote")) {
            return currentChild.textContent.trim();
        }
        if (currentChild === childElement) {
            seenChild = true;
        }
        currentChild = currentChild.previousSibling;
    }
    return '';
}

function generateHash(text, length) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).substring(0, length);
}

function addIdsToBlockquotes() {
    const blockquotes = Array.from(document.querySelectorAll('blockquote'));
    blockquotes.sort((a, b) => getBlockquoteAncestorCount(a) - getBlockquoteAncestorCount(b));

    blockquotes.forEach(blockquote => {
        if (blockquote.parentNode.closest('blockquote')) {
            const parentElement = blockquote.parentElement;
            let lastTextElementInParent = getPrevSiblingText(parentElement, blockquote);
            let words = lastTextElementInParent.split(' ');
            let blockquoteId;
            let wordCount = 6;

            do {
                blockquoteId = "h" + generateHash(words.slice(-wordCount).join('-'), 8);
                wordCount++;
            } while (document.getElementById(blockquoteId) && wordCount <= words.length);

            blockquote.id = blockquoteId;
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    alternateBlockquoteColors();
    moveNestedBlockquotes();
    addIdsToBlockquotes();
    addButtons();
    addReplyLinks();
    hideNestedBlockquoteElements();
    unhideMatchingReplyAndContext();
});