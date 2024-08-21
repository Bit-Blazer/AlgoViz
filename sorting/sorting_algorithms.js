async function bubbleSort() {
    comparisonCount = 0;
    swapCount = 0;
    isSorting = true;
    toggleButtons();

    for (let i = 0; i < data.length - 1 && isSorting; i++) {
        let swapped = false;
        for (let j = 0; j < data.length - i - 1 && isSorting; j++) {
            incrementComparisonCount();

            // Highlight the two bars being compared
            svg.select(`#rect${j}`).style("fill", "#9DBDC6");
            svg.select(`#rect${j + 1}`).style("fill", "#9DBDC6");

            await new Promise((resolve) => setTimeout(resolve, delay));

            if (data[j] > data[j + 1]) {
                incrementSwapCount();

                // Swap data values
                [data[j], data[j + 1]] = [data[j + 1], data[j]];

                // Animate the swap
                await animateBars(j, j + 1);

                swapped = true;
            }

            // Revert colors after comparison
            svg.select(`#rect${j}`).style("fill", "#CC1616");
            svg.select(`#rect${j + 1}`).style("fill", "#CC1616");
        }
        if (!swapped) break;

        // Mark the last sorted element as green
        svg.select(`#rect${data.length - i - 1}`).style("fill", "#00FF00");
    }

    // Mark all elements as green to indicate sorting is complete
    for (let i = 0; i < data.length; i++) {
        svg.select(`#rect${i}`).style("fill", "#00FF00");
    }

    isSorting = false;
    toggleButtons();
}

async function cocktailShakerSort() {
    comparisonCount = 0;
    swapCount = 0;
    isSorting = true;

    toggleButtons();

    let start = 0;
    let end = data.length - 1;
    let swapped;

    do {
        swapped = false;

        // Forward pass
        for (let i = start; i < end; i++) {
            incrementComparisonCount();

            // Highlight the two bars being compared
            svg.select(`#rect${i}`).style("fill", "#9DBDC6");
            svg.select(`#rect${i + 1}`).style("fill", "#9DBDC6");

            await new Promise((resolve) => setTimeout(resolve, delay));

            if (data[i] > data[i + 1]) {
                incrementSwapCount();

                // Swap data values
                [data[i], data[i + 1]] = [data[i + 1], data[i]];

                // Animate the swap
                await animateBars(i, i + 1);

                swapped = true;
            }

            // Revert colors after comparison
            svg.select(`#rect${i}`).style("fill", "#CC1616");
            svg.select(`#rect${i + 1}`).style("fill", "#CC1616");
        }

        // Mark the last sorted element as green
        svg.select(`#rect${end}`).style("fill", "#00FF00");

        // Reduce the range for the next pass
        end--;

        // Backward pass
        for (let i = end; i > start; i--) {
            incrementComparisonCount();

            // Highlight the two bars being compared
            svg.select(`#rect${i}`).style("fill", "#9DBDC6");
            svg.select(`#rect${i - 1}`).style("fill", "#9DBDC6");

            await new Promise((resolve) => setTimeout(resolve, delay));

            if (data[i] < data[i - 1]) {
                incrementSwapCount();

                // Swap data values
                [data[i], data[i - 1]] = [data[i - 1], data[i]];

                // Animate the swap
                await animateBars(i, i - 1);

                swapped = true;
            }

            // Revert colors after comparison
            svg.select(`#rect${i}`).style("fill", "#CC1616");
            svg.select(`#rect${i - 1}`).style("fill", "#CC1616");
        }

        // Mark the first sorted element as green
        svg.select(`#rect${start}`).style("fill", "#00FF00");

        // Increase the starting index for the next pass
        start++;
    } while (swapped && isSorting);

    // Mark all elements as green to indicate sorting is complete
    for (let i = 0; i < data.length; i++) {
        svg.select(`#rect${i}`).style("fill", "#00FF00");
    }

    isSorting = false;
    toggleButtons();
}

async function combSort() {
    comparisonCount = 0;
    swapCount = 0;
    isSorting = true;

    toggleButtons();

    let gap = data.length;
    const shrinkFactor = 1.3;
    let swapped = true;

    while (gap > 1 || swapped) {
        // Calculate the new gap size
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) gap = 1;

        swapped = false;

        // Traverse the array and compare elements with the current gap
        for (let i = 0; i + gap < data.length; i++) {
            incrementComparisonCount();

            // Highlight the two bars being compared
            svg.select(`#rect${i}`).style("fill", "#9DBDC6");
            svg.select(`#rect${i + gap}`).style("fill", "#9DBDC6");

            await new Promise((resolve) => setTimeout(resolve, delay));

            if (data[i] > data[i + gap]) {
                incrementSwapCount();

                // Swap data values
                [data[i], data[i + gap]] = [data[i + gap], data[i]];

                // Animate the swap
                await animateBars(i, i + gap);

                swapped = true;
            }

            // Revert colors after comparison
            svg.select(`#rect${i}`).style("fill", "#CC1616");
            svg.select(`#rect${i + gap}`).style("fill", "#CC1616");
        }
    }

    // Mark all elements as green to indicate sorting is complete
    for (let i = 0; i < data.length; i++) {
        svg.select(`#rect${i}`).style("fill", "#00FF00");
    }

    isSorting = false;
    toggleButtons();
}

async function gnomeSort() {
    comparisonCount = 0;
    swapCount = 0;
    isSorting = true;

    toggleButtons();

    let i = 1;

    while (i < data.length) {
        incrementComparisonCount();

        // Highlight the bars being compared
        svg.select(`#rect${i - 1}`).style("fill", "#9DBDC6");
        svg.select(`#rect${i}`).style("fill", "#9DBDC6");

        await new Promise((resolve) => setTimeout(resolve, delay));

        if (i == 0 || data[i - 1] <= data[i]) {
            // Move forward if the order is correct
            svg.select(`#rect${i - 1}`).style("fill", "#CC1616");
            svg.select(`#rect${i}`).style("fill", "#CC1616");
            i++;
        } else {
            incrementSwapCount();

            // Swap data values
            [data[i], data[i - 1]] = [data[i - 1], data[i]];

            // Animate the swap
            await animateBars(i, i - 1);

            svg.select(`#rect${i - 1}`).style("fill", "#CC1616");
            svg.select(`#rect${i}`).style("fill", "#CC1616");

            // Move backward to compare again
            i--;
        }
    }

    // Mark all elements as green to indicate sorting is complete
    for (let i = 0; i < data.length; i++) {
        svg.select(`#rect${i}`).style("fill", "#00FF00");
    }

    isSorting = false;
    toggleButtons();
}

async function insertionSort() {
    comparisonCount = 0;
    swapCount = 0;
    isSorting = true;

    toggleButtons();

    for (let i = 1; i < data.length && isSorting; i++) {
        let key = data[i];
        let j = i - 1;

        while (j >= 0 && data[j] > key) {
            incrementComparisonCount();

            // Highlight the bars being compared
            svg.select(`#rect${j}`).style("fill", "#9DBDC6");
            svg.select(`#rect${j + 1}`).style("fill", "#9DBDC6");

            await new Promise((resolve) => setTimeout(resolve, delay));

            // Move the element one position to the right
            data[j + 1] = data[j];

            // Animate the move
            await animateBars(j, j + 1);

            svg.select(`#rect${j}`).style("fill", "#CC1616");
            svg.select(`#rect${j + 1}`).style("fill", "#CC1616");

            j--;
        }

        // Place the current value in the correct position
        data[j + 1] = key;
        incrementSwapCount();

        // Update the bar with the final placement
        drawBars();
    }

    // Mark all elements as green to indicate sorting is complete
    for (let i = 0; i < data.length; i++) {
        svg.select(`#rect${i}`).style("fill", "#00FF00");
    }

    isSorting = false;
    toggleButtons();
}