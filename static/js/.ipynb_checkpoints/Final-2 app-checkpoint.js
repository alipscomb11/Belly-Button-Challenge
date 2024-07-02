// Build the metadata panel
  function buildMetadata(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
      // get the metadata field
      let metadata = data.metadata;
  
      // Filter the metadata for the object with the desired sample number
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
  
      // Use d3 to select the panel with id of `#sample-metadata`
      let panel = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      panel.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        panel.append('h6').text(`${key}: ${value}`)
      });
    });
  }
    
      // tags for each key-value in the filtered metadata.
  
  // function to build both charts
function buildCharts(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
      // Get the samples field
      let samples = data.samples;
      let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
  
  // Access the samples field from the data object
  
  
      // Filter the samples for the object with the desired sample number
  
        
      // Get the otu_ids, otu_labels, and sample_values
      let otuIds = result.otu_ids;
      let otuLabels = result.otu_labels;
      let sampleValues = result.sample_values;
  
      // Build a Bubble Chart
      let bubbleData = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: "Earth"
        }
      };
  
      let bubbleLayout = {
        title: 'OTU ID vs. Sample Values',
        margin: { t: 30 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' }
      };
  
      // Render the Bubble Chart
      Plotly.newPlot('bubble', [bubbleData], bubbleLayout);
 
      // Slice and reverse the top 10 OTUs
      let topOtu_ids = otuIds.slice(0, 10).reverse();
      let topOtu_labels = otuLabels.slice(0, 10).reverse();
      let topSample_values = sampleValues.slice(0, 10).reverse();
  
      // For the Bar Chart, map the otu_ids to a list of strings for your yticks
      let yticks = topOtu_ids.map(otuID => `OTU ${otuID}`);
   
  
      // Build a Bar Chart
      let barData = {
              y: yticks,
              x: topSample_values,
              text: topOtu_labels,
              type: "bar",
              orientation: "h"
      };
      let barLayout = {
              title: "Top 10 OTUs Found",
              margin: { t: 30, l: 150 }
       };
         
  
      // Don't forget to slice and reverse the input data appropriately
  
  
      // Render the Bar Chart
      Plotly.newPlot("bar", [barData], barLayout);
    });
}
  
  // Function to run on page load
function init() {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

        let selector = d3.select("#selDataset")
  
        let sampleNames = data.names
  
        sampleNames.forEach((sample) => {
            selector.append("option").text(sample).property("value", sample);
        });
  
        let firstSample = sampleNames[0];
  
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
  }
      // Get the names field
      
  
      // Use d3 to select the dropdown with id of `#selDataset`
    
  
      // Use the list of sample names to populate the select options
      // Hint: Inside a loop, you will need to use d3 to append a new
      // option for each sample name.
    
  
  
      // Get the first sample from the list
      
  
      // Build charts and metadata panel with the first sample
  
  
      // Function for event listener
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}
    
      // Build charts and metadata panel each time a new sample is selected
     
  
  // Initialize the dashboard
init();
