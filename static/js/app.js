// url set as constant
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// create bar chart
function createBarChart(sample) {
    
    // read in JSON data
    d3.json(url).then((data) => {
        
        // get all the samples
        let sampleData = data.samples;

        // filter by value
        let value = sampleData.filter(result => result.id == sample);

        let filteredData = value[0];

        // assign variables for individual data points
        let otuIds = filteredData.otu_ids;
        let otuLables = filteredData.otu_labels;
        let sampleValues = filteredData.sample_values;

        // log the data
        console.log(otuIds, otuLables, sampleValues);

        // set graph data and format in descending order
        let xData = sampleValues.slice(0, 10).reverse();
        let yData = otuIds.slice(0, 10).map((otuIds) => `OTU ${otuIds}`).reverse();

        // create the bar graph
        let trace1 = [{
            x: xData,
            y: yData,
            text: otuLables.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h',
            marker: {
                color: "#17becf"
                }
            }];

        let layout = {
            title: "Top 10 OTUs"
        };

        // plot the bar graph
        Plotly.newPlot("bar", trace1, layout)
    });

};


function createBubbleChart(sample) {
    // read in JSON data
    d3.json(url).then((data) => {
        
        // get all the samples
        let sampleData = data.samples;

        // filter by value
        let value = sampleData.filter(result => result.id == sample);

        let filteredData = value[0];

        // assign variables for individual data points
        let otuIds = filteredData.otu_ids;
        let otuLables = filteredData.otu_labels;
        let sampleValues = filteredData.sample_values;

        // log the data
        console.log(otuIds, otuLables, sampleValues);
        
        // create the bubble chart
        let trace2 = [{
            x: otuIds,
            y: sampleValues,
            text: otuLables,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: 'Earth'
            }
        }];

        let layout = {
            xaxis: {title: 'OTU ID'}
        };

        // plot the bubble chart
        Plotly.newPlot('bubble', trace2, layout)
    });

};

function createMetaData(sample) {
    // read in JSON data
    d3.json(url).then((data) => {
        
        let metaData = data.metadata;

        // filter by value
        let value = metaData.filter(result => result.id == sample);

        // log the data
        console.log(value)

        // get first object
        let result = value[0];

        d3.select('#sample-metadata').html("");

        // iterrate through an object array to append key/value pairs
        let entryArray = Object.entries(result);

        entryArray.forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`);
        });

    });
};

// creating the option changed function
function optionChanged(sample) {
    createMetaData(sample);
    createBarChart(sample);
    createBubbleChart(sample)
};

// creating the init function
function init() {
    let dropDown = d3.select("#selDataset");
    d3.json(url).then((data) => {
        let names = data.names;
        //iterate through names array and append to dropDown
        names.forEach((name) => {
            dropDown.append("option").text(name).property("value", name);
        });
        let sampleName = names[0];

        createMetaData(sampleName);
        createBarChart(sampleName);
        createBubbleChart(sampleName);

    });
}

init();

