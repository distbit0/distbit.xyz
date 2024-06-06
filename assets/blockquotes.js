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

        const elements = blockquote.querySelectorAll(':not(blockquote)');
        elements.forEach(element => {
            // Assign classes based on nested blockquote IDs
            const nestedBlockquotes = blockquote.querySelectorAll('blockquote');
            nestedBlockquotes.forEach(nestedBlockquote => {
                element.classList.add(nestedBlockquote.id);
            });

            // Assign class based on direct parent blockquote ID
            const directParentBlockquote = blockquote.querySelector('blockquote');
            if (directParentBlockquote) {
                element.classList.add(`childof_${directParentBlockquote.id}`);
            }

            // Auto-hide element if it contains "#draft"
            if (element.textContent.includes('#draft')) {
                element.style.display = 'none';
            }
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
});