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

		// A collection of artist (Artist Objects) on the plot 
		this.artists = [];

	    // Initialize the yScale with domain of (0, max vocabulary) and range (height of plot, 0)
	    this.yScale = d3.scale.linear()
					    .domain([0, d3.max(this.data, function(d) { return d.vocab_len; })])
	    				.range([this.height, 0]);


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
	      .attr('id', function(d) {
	      	return d.name.split(" ").join("_");	
	      })
	      .attr('class', function(d) {
	      	that.artists.push(Artist.newArtist(d.name, d)); // Create and add to collection new Artist object
	      	return 'artistContainer';
	      })
	      .style('top', function(d) {
	      	return that.yScale(d.vocab_len) + "px";	
	      })
	      .transition().duration(100)
	      .style('left', calculateLeftOffset.call(this) + 'px');
	};

	// Function that calculates the left offset for every single artist
	// From left end calculate the amount to translate towards right for each artist 
	// while ensuring that they don't overlap
	function calculateLeftOffset() {
		// Let us start 
		// Create a quadtree not entirely sure what it does though
		console.log(this)
		return (this.width/2 - 30);
	}
		
})();