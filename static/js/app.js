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
        console.log(otuIDs, otuLables, sampleValues);

        // set graph data and format in descending order
        let xData = sampleValues.slice(0, 10).reverse();
        let yData = otuIds.slice(0, 10).map((otuIds) => `OTU ${otuIds}`).reverse();

        // create the bar graph
        let trace = [{
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
        Plotly.newPlot("bar", trace, layout)
        });



    };






