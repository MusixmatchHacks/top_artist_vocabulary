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
	    				.range([0.95*this.height, 0]);


	    // Draw the sacle on the plot 
	    drawScales.call(this);

	    // Add all the artists to the plot 
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


	// Private methods

	// Draw all the scales on the plot
	function drawScales() {

		// Length of each tick on the scale ( the white line)
		var tickLength = 0.96 * this.width;
		var scaleLeftPadding = 0.04 * this.width;

		var scaleData = [
			{x1 : scaleLeftPadding, x2 : tickLength, y1 : 80, y2 : 80},
			{x1 : scaleLeftPadding, x2 : tickLength, y1 : 80, y2 : 80},
			{x1 : scaleLeftPadding, x2 : tickLength, y1 : 80, y2 : 80},
			{x1 : scaleLeftPadding, x2 : tickLength, y1 : 80, y2 : 80},
			{x1 : scaleLeftPadding, x2 : tickLength, y1 : 80, y2 : 80},
			{x1 : scaleLeftPadding, x2 : tickLength, y1 : 80, y2 : 80},
			{x1 : scaleLeftPadding, x2 : tickLength, y1 : 80, y2 : 80}
		];
		d3.select('#scale')
		  .selectAll('line')
		  .data(scaleData)
		  .enter()
		  .append('line')
		  .attr('x1', function(d) { return d.x1;})
		  .attr('x2', function(d) { return d.x2;})
		  .attr('y1', function(d, i) { return (i + 1) * d.y1;})
		  .attr('y2', function(d, i) { return (i + 1) * d.y2;})
		  .style('stroke', 'rgba(255, 255, 255, 0.5)')
		  .style('stroke-width' , 2);

		// Now let us add some dummy text to the scale
		d3.select('#scale')
	      .append('text')	
	      .attr('x', scaleLeftPadding)
	      .attr('y', 70)
	      .text('6000')
	      .attr('font-family', 'Roboto')
	      .attr('fill', 'white')
	      .attr('font-size', 24);
	}

	// Function that calculates the left offset for every single artist
	// From left end calculate the amount to translate towards right for each artist 
	// while ensuring that they don't overlap
	function calculateLeftOffset() {
		// Let us start 
		// Create a quadtree not entirely sure what it does though
		return (this.width/2 - 30);
	}
		
})();