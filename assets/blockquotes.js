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
    // Assign unique IDs to each blockquote
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach((blockquote, index) => {
        blockquote.id = `blockquote-${index}`;
    });

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
    blockquotes.forEach(blockquote => {
        const maxHeight = blockquote.getBoundingClientRect().top;
        addClassToParentBlockquoteChildren(blockquote, blockquote.id, maxHeight, false);
    });
    reuniteOrphanRootQuotes();

});


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
        element.style.display = visible ? 'inline-block' : 'none';
    });
}


function isIndirectAncestor(currentElement, targetBlockquote) {
    closestBlockquote = currentElement.closest('blockquote');
    if (!closestBlockquote) {
        return false;
    }
    return closestBlockquote.contains(targetBlockquote) && closestBlockquote !== targetBlockquote;
}

function getAncestorBlockQuotes(element) {
    const ancestorBlockquotes = [];
    let currentElement = element.parentElement;

    while (currentElement) {
        if (currentElement.tagName === 'BLOCKQUOTE') {
            ancestorBlockquotes.push(currentElement);
        }
        currentElement = currentElement.parentElement;
    }
    return ancestorBlockquotes;
}

function getAllChildElements(ancestorBlockquotes) {
    let childElements = [];
    for (const ancestor of ancestorBlockquotes) {
        const descendants = Array.from(ancestor.querySelectorAll('*'));
        let filteredDescendants = descendants.filter(descendant => !ancestorBlockquotes.includes(descendant)); // removes blockquotes
        filteredDescendants = filteredDescendants.filter(descendant => descendant.closest('blockquote') == ancestor);
        childElements = childElements.concat(filteredDescendants);
    }
    return childElements;
}

function addClassToParentBlockquoteChildren(blockquote, classToAdd, maxVisualHeight, classFromDifferentBlockquote) {
    // visual height allows us to discriminate between replies to the above message and replies to the current message, even if both are in a blockquote which is a parent of the current message
    // it is apparently measures from top of screen not bottom, which makes comparisons seem weird
    const ancestorBlockquotes = getAncestorBlockQuotes(blockquote);
    const childElements = getAllChildElements(ancestorBlockquotes);
    childElements.forEach(element => {
        if (element.getBoundingClientRect().top > maxVisualHeight) {
            if (!classFromDifferentBlockquote) {
                if (blockquote.parentNode === element) {
                    element.classList.add(`childOf_${classToAdd}`);
                }
            }

            if (isIndirectAncestor(element, blockquote)) {
                element.classList.add(classToAdd);
            }
        }
        if (element.textContent.includes('#draft')) {
            element.style.display = 'none';
        }
    });
}

function addClassToBlockquoteChildElements(blockquote, classToAdd) {
    const childElements = getAllChildElements([blockquote]);
    childElements.forEach(element => {
        if (element.textContent.includes('#draft')) {
            element.style.display = 'none';
        }
        element.classList.add(classToAdd);
    });
}

function findBlockquotesWithoutNestedBlockquotes() {
    const blockquotes = Array.from(document.querySelectorAll('blockquote'));
    const blockquotesWithoutNestedBlockquotes = blockquotes.filter(blockquote => {
        const nestedBlockquotes = blockquote.querySelectorAll('blockquote');
        return nestedBlockquotes.length === 0;
    });

    const blockquotesWithNestingLevels = blockquotesWithoutNestedBlockquotes.map(blockquote => {
        let nestingLevel = 1;
        let parentBlockquoteIds = [];
        parentBlockquoteIds.push(blockquote.id);
        let parentElement = blockquote.parentElement;
        while (parentElement) {
            if (parentElement.tagName === 'BLOCKQUOTE') {
                nestingLevel++;
                parentBlockquoteIds.push(parentElement.id);
            }
            parentElement = parentElement.parentElement;
        }
        parentBlockquoteIds.reverse(); // so that the first element is blockquote for outermost reply
        return [blockquote, nestingLevel, parentBlockquoteIds];
    });

    blockquotesWithNestingLevels.sort((a, b) => {
        const rectA = a[0].getBoundingClientRect();
        const rectB = b[0].getBoundingClientRect();
        return rectA.top - rectB.top;
    });

    return blockquotesWithNestingLevels;
}

function reuniteOrphanRootQuotes() {
    let lastIdAtDepth = [];
    let maxDepth = 0;
    let depthGap;
    let directParentId;
    let ancestorIds;
    const blockquotesWithNestingLevels = findBlockquotesWithoutNestedBlockquotes();
    for (const [blockquote, nestingLevel, parentBlockquoteIds] of blockquotesWithNestingLevels) {
        maxDepth = Math.max(maxDepth, nestingLevel);
        depthGap = maxDepth - nestingLevel;
        let same = true;
        for (let i = 0; i < Math.min(lastIdAtDepth.length, parentBlockquoteIds.length); i++) {
            if (lastIdAtDepth[i] !== parentBlockquoteIds[i]) {
                same = false;
                break;
            }
        }
        if (parentBlockquoteIds.length == maxDepth) {
            lastIdAtDepth = parentBlockquoteIds;
        }
        console.log("______________________");
        console.log("lastIdAtDepth", lastIdAtDepth);
        console.log("parentBlockquoteIds", parentBlockquoteIds);
        console.log("nestingLevel", nestingLevel);
        let pElement = blockquote.querySelector('p');
        if (pElement) {
            console.log(pElement.innerHTML);
        }
        if (nestingLevel > 0) {
            directParentId = lastIdAtDepth[nestingLevel];
            console.log("directParentId", directParentId);
            ancestorIds = lastIdAtDepth.slice(nestingLevel);
            console.log("ancestors", ancestorIds);
            if (directParentId) {
                addClassToBlockquoteChildElements(blockquote, `childOf_${directParentId}`);
                maxVisualHeight = document.getElementById(directParentId).getBoundingClientRect().top;
            }
            for (ancestorId of ancestorIds) {
                addClassToParentBlockquoteChildren(blockquote, ancestorId, maxVisualHeight, true);
                addClassToBlockquoteChildElements(blockquote, ancestorId);
            }
        }
    }
}
/// TODO
// - iterate through all first level children of root blockquote
// - keep array of last deepest element at each level of depth
// - if child element of root blockquote has max depth that is less than the length of the array, add the id of the elements deeper in the array to it and all its children, because it has been cut off
// only collapse things which are after not before the current message and its ancestors. otherwise you can collapse reply to previous message just because it is at the same level of indentation as a reply to the current message
// remove margins which separate blockquotes when there is no text between them
// start off with all blockquotes except root ones collapsed
// replace 4 buttons with 2 toggle buttons
// if expand button is pressed and there is no text that is displayed as a result, expand the next level until text is displayed or the last level is reached. so that the user doesn't have to keep clicking expand if the response to something is separated by several layers
// make mobile friendly
// hide child show child not working
// element only child of a node if it is below it and above the next node at the same indent level