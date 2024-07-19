// Build the metadata panel
function buildMetadata(sample) {
  console.log(`buildMetadata called with sample: ${sample}`);
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
      .then((data) => {
          console.log("Metadata loaded:", data.metadata);

          // get the metadata field
          let metadata = data.metadata;

          // Filter the metadata for the object with the desired sample number
          let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
          let result = resultArray[0];

          // Use d3 to select the panel with id of `#sample-metadata`
          let panel = d3.select("#sample-metadata");

          // Use `.html("") to clear any existing metadata
          panel.html("");

          // Append tags for each key-value in the filtered metadata
          Object.entries(result).forEach(([key, value]) => {
              panel.append('h6').text(`${key}: ${value}`);
          });
      })
      .catch(error => console.error("Error loading metadata:", error));
}

// Function to build both charts
function buildCharts(sample) {
  console.log(`buildCharts called with sample: ${sample}`);
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
      .then((data) => {
          console.log("Samples loaded:", data.samples);

          // Get the samples field
          let samples = data.samples;

          // Filter the samples for the object with the desired sample number
          let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
          let result = resultArray[0];

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

          // Slice and reverse the top 10 OTUs for the Bar Chart
          let topOtu_ids = otuIds.slice(0, 10).reverse();
          let topOtu_labels = otuLabels.slice(0, 10).reverse();
          let topSample_values = sampleValues.slice(0, 10).reverse();

          // Map the otu_ids to a list of strings for your yticks
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

          // Render the Bar Chart
          Plotly.newPlot("bar", [barData], barLayout);
      })
      .catch(error => console.error("Error loading samples:", error));
}

// Function to run on page load
function init() {
  console.log("Initializing dashboard");
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
      .then((data) => {
          console.log("Data loaded for init:", data);

          // Get the names field
          let selector = d3.select("#selDataset");
          let sampleNames = data.names;

          // Use the list of sample names to populate the select options
          sampleNames.forEach((sample) => {
              selector.append("option").text(sample).property("value", sample);
          });

          // Get the first sample from the list
          let firstSample = sampleNames[0];

          // Build charts and metadata panel with the first sample
          buildCharts(firstSample);
          buildMetadata(firstSample);
      })
      .catch(error => console.error("Error initializing dashboard:", error));
}

// Function for event listener
function optionChanged(newSample) {
  console.log(`optionChanged called with newSample: ${newSample}`);
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();