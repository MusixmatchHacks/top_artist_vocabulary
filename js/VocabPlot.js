(function() {

	// Export the module 
	window.VocabPlot = {};
	window.VocabPlot.newPlot = function(width, height, cssClass) {
		return new VocabPlot(width, height, cssClass);
	};

	function VocabPlot(plotWidth, plotHeight, cssClass) {
		// Width and height for the plot
		this.width = plotWidth;
		this.height = plotHeight;
		this.plotCssClass = cssClass; // CSS Class to be applied to the svg for positioning in the document

		// Initialize the plot's svg
		this.plot = d3.select('body')
					 .append('svg')
					 .attr('height', this.plotHeight)
					 .attr('width', this.plotWidth)
					 .attr('class', this.plotCssClass);
	}	

	// Method to add new artist to the plot 
	VocabPlot.prototype.add = function(artistImageUrl, artistVocab) {
		// add the artist to the plot 		
	};
		
})();