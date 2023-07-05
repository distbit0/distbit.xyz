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