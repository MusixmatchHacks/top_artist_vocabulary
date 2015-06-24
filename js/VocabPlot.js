(function() {

	// Export the module 
	window.VocabPlot = {};
	// Export this function for use in Artist.js file
	window.VocabPlot.formatWithCommas = formatWithCommas;
	window.VocabPlot.newPlot = function(cssId, plotData) {
		return new VocabPlot(cssId, plotData);
	};

	function VocabPlot(plotCssId, plotData) {
		this.cssId = plotCssId; // CSS ID of the div that is holding the plot
		this.data = plotData;

		// jQuery object holding the plot
		this.$plot = $('#' + this.cssId);
		// jQuery object holding the scale
		this.scale = d3.select('#scale');
		// Font family for the text that is showon on the graph
		this.fontFamily = 'Source Sans Pro';

		// Height and width of the plot
		this.width = this.$plot.width();
		this.height = this.$plot.height();

		// A collection of artist (Artist Objects) on the plot 
		this.artists = {};

	    // Initialize the yScale with domain of (0, max vocabulary) and range (height of plot, 0)
	    this.yScale = d3.scale.linear()
						.domain([0, 10000])
						.range([0.95*this.height, 0]);


	    // Draw the sacle on the plot 
	    drawScale.call(this, [0, 2000, 4000, 6000, 8000],2445);

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
	      .classed('artistContainer', true)
	      .each(function(d) {
	      	that.artists[d.name] = Artist.newArtist(d.name, d);
	      })
	      .style('top', function(d) { return d.y + 'px';})
	      .transition().duration(100)
	      // .style('left', function(d) {  return (d.x + d.x_offset - 17.5) + 'px';});
	      .style('left', function(d, i) {
	      	return 180 + (i * ((that.width - 220) / 93)) + 'px';
	      });
	};


	// Private methods

	/*
	* Funciton : drawScale(array of numbers, each number representing a tick on scale)
	* ---------------------------------------------------------------------------------
	* Draws scale on the plot.
	*/
	function drawScale(scaleDivisions, average) {

		var that = this;

		// Color of general numbers and lines
		var scaleColor = "#FFFFFF";
		// Length of each tick on the scale ( the white line)
		var scaleLeftPadding = 25;
		var tickLength = 0.98 * this.width;

		// The amount of spearation the text and tick
		var legendTickSeparation = 12;

		// Draw the lines on the scale
		this.scale
			.selectAll('line').data(scaleDivisions).enter().append('line')
			.attr('x1', scaleLeftPadding)
			.attr('x2', tickLength)
			.attr('y1', function(d) { return that.yScale(d);})
			.attr('y2', function(d) { return that.yScale(d);})
			// .attr('stroke-dasharray', '1, 5')
			.style('stroke', 'rgba(255, 255, 255, 0.4)')
			.style('stroke-width' , 1);

		// Add legend to the scale
		this.scale
	  		.selectAll('text')
	  		.data(scaleDivisions).enter().append('text')
		    .attr('x', scaleLeftPadding)
		    .attr('y', function(d) { return (that.yScale(d) - legendTickSeparation);})
		    .text(function(d) {
		    	return (formatWithCommas(d) + ' words');
		    })
		    .attr('font-family', that.fontFamily)
		    .attr('fill', 'white')
		    .attr('font-size', 18);

		if(average) {
			// Draw line for average line and other text
			this.scale
	      		.append('line')
		      	.attr('x1', scaleLeftPadding)
		      	.attr('x2', tickLength)
		      	.attr('y1', this.yScale(average))
		      	.attr('y2', this.yScale(average))
		      	.style('stroke', "#007CFF")
		      	.style('stroke-width', 1);


		    this.scale
		    	.append('text')
		    	.text(formatWithCommas(average) + ' words')
		    	.attr('fill', '#007CFF')
	      		.attr('font-family', that.fontFamily)
		    	.attr('font-size', 16)
		    	.attr('x', scaleLeftPadding)
		    	.attr('y', that.yScale(average) - (legendTickSeparation - 5));
		    	
		    this.scale
		    	.append('text')
		    	.text('Average')
		    	.attr('fill', '#007CFF')
	      		.attr('font-family', 'roboto')
		    	.attr('font-size', 16)
		    	.attr('x', scaleLeftPadding)
		    	.attr('y', that.yScale(average) - (2.1*legendTickSeparation));
		}
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