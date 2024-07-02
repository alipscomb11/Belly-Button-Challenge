// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field


    // Filter the metadata for the object with the desired sample number
    let metadata = data.metadata.filter(obj => obj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`

    let panel = d3.select("#sample-metadata");
   

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    Object.entries(metadata).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}

    // tags for each key-value in the filtered metadata.

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const data = {
        samples: [
            { id: 1, name: 'Sample 1' },
            { id: 2, name: 'Sample 2' },
            { id: 3, name: 'Sample 3' }
    ]
};

// Access the samples field from the data object
const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleData = data.samples.filter(obj => obj.id == sample)[0];
      
    // Get the otu_ids, otu_labels, and sample_values
    let bubbleData = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids
      }
    };

    // Build a Bubble Chart
    Plotly.newPlot("bubble", [bubbleData]);
      });
}


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let barData = [{
      x: sampleValues,
      y: otuIds,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    }];



    // Build a Bar Chart
  

    // Don't forget to slice and reverse the input data appropriately

    let sortedData = searchResults.sort((a, b) => b.greekSearchResults - a.greekSearchResults); // Sort in descending order

    let slicedData = sortedData.slice(0, 10); // Slice the first 10 elements

    let reversedData = slicedData.reverse(); // Reverse the sliced data

    // Render the Bar Chart
    Plotly.newPlot("bar", barData);
      });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      dropdown.append("option").text(name).property("value", name);
    });


    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);

  });
}

    // Function for event listener
    function optionChanged(newSample) {
  
    // Build charts and metadata panel each time a new sample is selected
    buildMetadata(newSample);


// Initialize the dashboard
init();
