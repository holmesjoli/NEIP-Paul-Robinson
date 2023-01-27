// using d3 for convenience, and storing a selected elements
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('#chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');

// define some global vars
var chartWidth;
var chartHeight;

let data = [];
function updateData() {
    data = [];
    for (let i = 0; i < 5; i++) {
        data.push(Math.random() * 800);
    }
}
var svg = chart.append('svg')


const newData = [
    { x: 4, size: 9 },
    { x: 1, size: 8 },
    { x: 2, size: 1 },
    { x: 9, size: 3 },
    { x: 2, size: 2 }
]

// initialize the scrollama
var scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {

    if (window.innerHeight >= 700) {

        // 1. update height of step elements for breathing room between steps
        // changing the multiplier here will define how much white space between steps
        var stepHeight = Math.floor(window.innerHeight * 0.7);
        step.style('height', stepHeight + 'px');

        // 2. update height of graphic element
        var bodyWidth = d3.select('body').node().offsetWidth;
        graphic.style('height', window.innerHeight + 'px');

        // 3. update width of chart by subtracting from text width
        var chartMargin = 32;
        var textWidth = text.node().offsetWidth;

        chartWidth = graphic.node().offsetWidth - textWidth - chartMargin; // left


    } else {
        graphic.style('height', window.innerHeight + 'px');
        chartWidth = graphic.node().offsetWidth;

        chartHeight = Math.floor(window.innerHeight / 2);
    }

    // make the height 1/2 of viewport
    chartHeight = Math.floor(window.innerHeight / 2);

    chart
        .style('width', chartWidth + 'px')
        .style('height', chartHeight + 'px');

    // 4. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    // sticky the graphic
    graphic.classed('is-fixed', true);
    graphic.classed('is-bottom', false);

    // fade in current step
    step.classed('is-active', function (d, i) {
        console.log(i)
        return i === response.index;
    })

    console.log(response.index);

    if (response.index === 2) {
        updateChartStep3()
    } else {
        updateData();
        updateChart();
    }

    // console.log(response)
}

// optional to view precise percent progress on callback
function handleProgress(response) {
    console.log(response)
}

// kick-off code to run once on load
function init() {
    // 1. call a resize on load to update width/height/position of elements
    handleResize();

    // 2. setup the scrollama instance
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            container: '#scroll', // our outermost scrollytelling element
            graphic: '.scroll__graphic', // the graphic
            text: '.scroll__text', // the step container
            step: '.scroll__text .step', // the step elements
            offset: 0.5, // set the trigger to be 1/2 way down screen
            // debug: true, // display the trigger offset for testing
            progress: false
        })
        // .onStepProgress(handleProgress)
        .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener('resize', handleResize);

    updateData();
    initChart();
}

// start it up
init();

/////////////////////////////////
// SOME D3 CODE FOR OUR GRAPHIC //
/////////////////////////////////

function initChart() {
    // define the width/height of SVG
    svg.attr('width', chartWidth).attr('height', chartHeight);

    // draw the circles
    svg.selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cy', 100)
        .attr('r', 40)
        .attr('fill', 'purple')
        .attr('opacity', 0.7)
        .attr('cx', function (d) {
            return d;
        });
}

function updateChart() {
    svg
        .selectAll('circle')
        .data(data)
        .join('circle')
        .transition()
        .duration(2000)
        .ease(d3.easeExpInOut)
        .attr("r", 40)
        .attr('cx', function (d) {
            return d;
        });
}

function updateChartStep3() {
    svg
        .selectAll('circle')
        .data(newData)
        .join('circle')
        .transition()
        .duration(2000)
        .ease(d3.easeExpInOut)
        .attr('r',function (d) {
            return d.size;
        })
        .attr('cx', function (d) {
            return d.x*10;
        });
}
