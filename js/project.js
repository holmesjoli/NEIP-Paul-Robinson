// using d3 for convenience, and storing a selected elements
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');
var media = document.getElementById('media');

console.log(media)
// initialize the scrollama
var scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {
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
        return i === response.index;
    })

    const backdrops = [
        { 'src': './assets/images/P2740071.JPG',
          'caption': 'Family picture wall at the Robinson house. Paul\'s sister Patricia, niece, and grand-niece are in the center.',
          'alt': 'Family picture wall at the Robinson house. Paul\'s sister Patricia, niece, and grand-niece are in the center.'
        },
        { 'src': './assets/images/P2740099.JPG',
          'caption': 'A front view of the family home where Robinson lives with his nieces and nephews.',
          'alt': 'A front view of the two-story family home where Robinson lives. The house is white with horizontal siding. Red shutters and a red deck give the house a nice accent color.'
        },
        { 'src': './assets/images/P2740091.JPG',
          'caption': 'Paul in his Mini Cooper.',
          'alt': 'Paul in his silver Mini Cooper. His hand is on his knee and he is turned towards the camera with a partial smile.'
        },
        { 'src': './assets/images/P2740085.JPG',
          'caption': 'A side-view of the family home.',
          'alt': 'A side view of the family home. A BBQ can be seen at the end of the porch..'
        },
    ]
    media.src = backdrops[response.index].src;
    media.alt = backdrops[response.index].alt;
}

// optional to view precise percent progress on callback
function handleProgress(response) {
    console.log(response)
}

function setBackdropImage(index) {

    const backdrops = [
        { 'src': './assets/images/P2740099.JPG',
        },
        { 'src': './assets/images/P2740091.JPG',
        },
        { 'src': 'https://cdn.glitch.global/60a947a3-a0d4-473b-a51a-ef7120e2f598/kitten-vs-puppy.jpeg?v=1673897648888',
        },
      ]

    media.src = backdrops[index].src;
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
        .onStepEnter(handleStepEnter)
    
    // setBackdropImage(0);

    // setup resize event
    window.addEventListener('resize', handleResize);
}

// start it up
init();
