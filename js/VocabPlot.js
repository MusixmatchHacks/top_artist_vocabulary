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
	    drawScale.call(this, [0, 2000, 4000, 6000, 8000]);

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
	      .style('top', function(d) { return d.y + 'px';})
	      .transition().duration(100)
	      .style('left', function(d) {  return (d.x + d.x_offset) + 'px';});
	};


	// Private methods

	/*
	* Funciton : drawScale(array of numbers, each number representing a tick on scale)
	* ---------------------------------------------------------------------------------
	* Draws scale on the plot.
	*/
	function drawScale(scaleDivisions) {

		var that = this;

		// Length of each tick on the scale ( the white line)
		var tickLength = 0.96 * this.width;
		var scaleLeftPadding = 0.04 * this.width;

		// The amount of spearation the text and tick
		var legendTickSeparation = 10;

		// Draw the lines on the scale
		d3.select('#scale')
		  .selectAll('line')
		  .data(scaleDivisions)
		  .enter()
		  .append('line')
		  .attr('x1', scaleLeftPadding)
		  .attr('x2', tickLength)
		  .attr('y1', function(d) { return that.yScale(d);})
		  .attr('y2', function(d) { return that.yScale(d);})
		  .style('stroke', 'rgba(255, 255, 255, 0.5)')
		  .style('stroke-width' , 1);

		// Add legend to the scale
  		d3.select('#scale')
  		  .selectAll('text')
  		  .data(scaleDivisions)
  		  .enter()
	      .append('text')	
	      .attr('x', scaleLeftPadding)
	      .attr('y', function(d) { return (that.yScale(d) - legendTickSeparation);})
	      .text(function(d) { return formatWithCommas(d) + ' words';})
	      .attr('font-family', 'Roboto')
	      .attr('fill', 'white')
	      .attr('font-size', 18);

	}

	// Adds commas to a large number at appropriate places
	function formatWithCommas(x) {
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
	}

	// Function that calculates the left offset for every single artist
	// From left end calculate the amount to translate towards right for each artist 
	// while ensuring that they don't overlap
	function calculateLeftOffset() {
		// Let us start 
		// Create a quadtree not entirely sure what it does though
		return (this.width/2 - 17.5);
	}
		
})();