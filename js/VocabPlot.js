(function() {

	// Export the module 
	window.VocabPlot = {};
	window.VocabPlot.newPlot = function(cssId, plotData) {
		return new VocabPlot(cssId, plotData);
	};

	function VocabPlot(plotCssId, plotData) {
		this.cssId = plotCssId; // CSS ID of the div that is holding the plot
		this.data = plotData;

		// jQuery object holding the plot
		this.$plot = $('#' + this.cssId);

		// Height and width of the plot
		this.width = this.$plot.width();
		this.height = this.$plot.height();

	    // Initialize the yScale
	    this.yScale = d3.scale.linear()
							  .domain([0, d3.max(this.data, function(d) { return d.vocab_len; })])
	    					  .range([0, this.height]);

	    // Add the artists to the plot 
	    this.addAritstsToPlot();

	}	

	// Method to add new artist to the plot 
	VocabPlot.prototype.addAritstsToPlot = function() {
	    var that = this;
	    d3.select(this.$plot.selector)
	      .selectAll('div')
	      .data(this.data)
	      .enter()
	      .append('div')
	      .classed('artistContainer', true)
	      .style('top', function(d) {
	      	return that.yScale(d.vocab_len) + "px";	
	      });
	};
		
})();