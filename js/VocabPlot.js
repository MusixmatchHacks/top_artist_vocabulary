(function() {

	// Export the module 
	window.VocabPlot = {};
	window.VocabPlot.newPlot = function(width, height, cssId, plotData) {
		return new VocabPlot(width, height, cssId, plotData);
	};

	function VocabPlot(plotWidth, plotHeight, plotCssId, plotData) {
		// Width and height for the plot
		this.width = plotWidth;
		this.height = plotHeight;
		this.cssId = plotCssId; // CSS ID to be applied to the svg for positioning in the document
								// and other styles
		this.data = plotData;

		// Initialize the plot's svg
	    this.plot = d3.select('body')
	      			  .append('svg')
	      			  .attr('width', this.width)
	      			  .attr('height', this.height)
	      			  .attr('id', this.cssId);

	    // Initialize the yScale
	    this.yScale = d3.scale.linear()
							  .domain([0, d3.max(function(d) { return d.vocab;})])
	    					  .range([0, this.height]);

	    // Add the artists to the plot 
	    this.addAritstsToPlot();

	}	

	// Method to add new artist to the plot 
	VocabPlot.prototype.addAritstsToPlot = function() {
	    this.plot.selectAll('circle')
	    		 .data(this.data)
	    		 .enter()
	    		 .append('circle');
	};
		
})();