document.addEventListener("DOMContentLoaded", () => {
    const visu = document.querySelector("#visualization-area");
    visu.setAttribute("width", "100%");
    visu.setAttribute("height", "370");
    visu.setAttribute("viewBox", `0 0 ${window.innerWidth} 370`);
    newSet();
});

let isSorting = false;
let delay = 200;
const svg = d3.select("#visualization-area");
const width = window.innerWidth;
const height = 370;
let data = [];
let comparisonCount = 0;
let swapCount = 0;

function updateDelay(newDelay) {
    delay = newDelay;
}

function newSet(num = 15) {
    data = Array.from({ length: num }, () => Math.floor(Math.random() * 200) + 1);
    resetVisualization();
    drawBars();
}

function stopSort() {
    isSorting = false;
    toggleButtons();
}

function updateDataFromInput(inputData = "107,46,59,34,39,22,16,44,4,20,55,24,74,94,95") {
    data = inputData.split(",").map(Number);
    if (data.length > 50) {
        data = data.slice(0, 50);
    }
    resetVisualization();
    drawBars();
}

function resetVisualization() {
    svg.selectAll("rect").remove();
    svg.selectAll("text").remove();
    comparisonCount = 0;
    swapCount = 0;
    isSorting = false;
}

function drawBars() {
    const barWidth = Math.floor(width / data.length);
    const maxHeight = Math.max(...data);
    const yScale = d3.scaleLinear().domain([0, maxHeight]).range([0, height - 20]);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", (d) => height - yScale(d))
        .attr("width", barWidth - 5)
        .attr("height", (d) => yScale(d))
        .attr("class", "bar")
        .attr("fill", "#CC1616")
        .attr("id", (d, i) => `rect${i}`);

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * barWidth + (barWidth - 5) / 2)
        .attr("y", (d) => height - yScale(d) - 5)
        .attr("text-anchor", "middle")
        .attr("class", "bar-text")
        .attr("fill", "black")
        .text((d) => d)
        .attr("id", (d, i) => `text${i}`);
}

// Function to animate bars and text and swap their IDs
async function animateBars(i, j) {
    const barWidth = Math.floor(width / data.length);

    let bar1 = svg.select(`#rect${i}`);
    let bar2 = svg.select(`#rect${j}`);
    let text1 = svg.select(`#text${i}`);
    let text2 = svg.select(`#text${j}`);

    // Calculate translation distances
    const calcTransl1 = i * barWidth;
    const calcTransl2 = j * barWidth;

    // Animate bars
    bar1
        .attr("x", calcTransl2)
        .transition()
        .duration(delay);

    bar2
        .attr("x", calcTransl1)
        .transition()
        .duration(delay);

    // Animate text
    text1
        .attr("x", calcTransl2 + barWidth / 2)
        .transition()
        .duration(delay);

    text2
        .attr("x", calcTransl1 + barWidth / 2)
        .transition()
        .duration(delay);

    // Wait for transitions to complete
    await Promise.all([
        bar1.transition().end(),
        bar2.transition().end(),
        text1.transition().end(),
        text2.transition().end(),
    ]);

    // Swap the IDs of the bars and text
    bar1.attr("id", `rect${j}`);
    bar2.attr("id", `rect${i}`);
    text1.attr("id", `text${j}`);
    text2.attr("id", `text${i}`);
}

// Function to increment the comparison count
function incrementComparisonCount() {
    comparisonCount++;
    document.querySelector("#comparison-count").innerHTML = `No. of comparisons: ${comparisonCount}`;
}

// Function to increment the swap count
function incrementSwapCount() {
    swapCount++;
    document.querySelector("#swap-count").innerText = `No. of swaps: ${swapCount}`;
}
// Function to toggle button states
function toggleButtons() {
    document.querySelector("#num-elements").disabled = isSorting;
    document.querySelector("#data-input").disabled = isSorting;
    document.querySelector("#custom-data").disabled = isSorting;
    document.querySelector("#sort-button").disabled = isSorting;
    document.querySelector("#stop-button").disabled = !isSorting;
}
