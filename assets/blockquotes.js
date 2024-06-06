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

    // Assign classes to <p> tags and create buttons
    blockquotes.forEach(blockquote => {
        // Create buttons
        const showAllButton = createButton('Show All', () => toggleVisibility(true, blockquote.id));
        const hideAllButton = createButton('Hide All', () => toggleVisibility(false, blockquote.id));
        const showChildrenButton = createButton('Show Child', () => toggleVisibility(true, `childof_${blockquote.id}`));
        const hideChildrenButton = createButton('Hide Child', () => toggleVisibility(false, `childof_${blockquote.id}`));

        blockquote.appendChild(showAllButton);
        blockquote.appendChild(hideAllButton);
        blockquote.appendChild(showChildrenButton);
        blockquote.appendChild(hideChildrenButton);
    });

    blockquotes.forEach(blockquote => {
        addClassToChildElements(blockquote);
    });

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
        element.style.display = visible ? 'block' : 'none';
    });
}


function isIndirectAncestor(currentElement, targetBlockquote) {
    closestBlockquote = currentElement.closest('blockquote');
    if (!closestBlockquote) {
        return false;
    }
    return closestBlockquote.contains(targetBlockquote) && closestBlockquote !== targetBlockquote;
}

function getAncestorChildElements(element) {
    const ancestorBlockquotes = [];
    let currentElement = element.parentElement;

    while (currentElement) {
        if (currentElement.tagName === 'BLOCKQUOTE') {
            ancestorBlockquotes.push(currentElement);
        }
        currentElement = currentElement.parentElement;
    }


    let childElements = [];

    for (const ancestor of blockquoteAncestors) {
        const descendants = Array.from(ancestor.querySelectorAll('*'));
        const filteredDescendants = descendants.filter(descendant => !blockquoteAncestors.includes(descendant));
        childElements = childElements.concat(filteredDescendants);
    }
    return childElements;
}

function addClassToChildElements(blockquote) {
    const childElements = getAncestorChildElements(blockquote);
    childElements.forEach(element => {
        if (blockquote.parentNode === element) {
            // Assign class based on direct parent blockquote ID
            if (directParentBlockquote) {
                element.classList.add(`childof_${blockquote.id}`);
            }

        }
        if (isIndirectAncestor(element, blockquote)) {
            element.classList.add(blockquote.id);
        }

        if (element.textContent.includes('#draft')) {
            element.style.display = 'none';
        }
    });
}


/// TODO
// - iterate through all first level children of root blockquote
// - keep array of last deepest element at each level of depth
// - if child element of root blockquote has max depth that is less than the length of the array, add the id of the elements deeper in the array to it and all its children, because it has been cut off