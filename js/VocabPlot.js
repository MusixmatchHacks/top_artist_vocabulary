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

		this.$plot = $('#' + this.cssId);
		this.scale = d3.select('#scale');
		// Font family for the text that is showon on the graph
		this.fontFamily = 'Source Sans Pro';

		this.width = this.$plot.width();
		this.height = this.$plot.height();

		// A collection of artist (Artist Objects) on the plot 
		this.artists = {};

	    this.yScale = d3.scale.linear().domain([0, 10000]).range([0.95*this.height, 0]);
	    drawScale.call(this, [0, 2000, 4000, 6000, 8000],2445);


	    this.addAritstsToPlot();
	    // Iniitalize the searchField
	    this.search.init(this);

	}	

	VocabPlot.prototype = {

		// Method to add new artist to the plot 
		addAritstsToPlot : function() {
		    var that = this; // VocabPlot
		    d3.select(this.$plot.selector)
		      .selectAll('.artistContainer')
		      .data(this.data)
		      .enter()
		      .append('div')
		      .attr('id', function(d) {return d.name.split(" ").join("_");})
		      .classed('artistContainer', true)
		      .style('top', function(d) { return ((that.yScale(d.vocab_len)) - 9) + 'px';}) // 9 is the height of the cricles will be made dynamic later
		      .each(function(d) {that.artists[d.name] = Artist.newArtist(d.name, d);})
		      .style('left', function(d, i) {
		      	// Computed through trial and error for the position
		      	return 180 + (i * ((that.width - 220) / that.data.length)) + 'px';
		      })
		      // to avoid stutter on load 
		      .transition().duration(300)
		      .style('opacity', 1);
		},

		// Operations styles of the artist circles on the plot 
		dimAllArtists : function() {
	        for(var artistName in this.artists) 
				this.artists[artistName].dim();
		},

        undimAllArtists : function() {
	        for(var artistName in this.artists) {
	            this.artists[artistName].undim();
	            this.artists[artistName].unhighlight();
	        }
	    },

	    unhighlightAllArtists : function() {
	        for(var artistName in this.artists) {
				this.artists[artistName].unhighlight();
	        }
	    },

	    // Argument is an array of artist names, this function highlight those artists on the plot
	    highlightArtists : function(artistNames) {
	    	var that = this; // VocabPlot
			artistNames.forEach(function(artistName) {
				that.artists[artistName].highlight();
	        }); 
	    }

	};


	// Handles the implementation and working of the search field on the plot
	VocabPlot.prototype.search = {
		searchField : $('#locateArtist'),
		init : function(plot) {
			this.plot = plot; // Cache the plot on which this search field is located
			this.artistNames = Object.keys(this.plot.artists);
			this.searchField.autocomplete({source : [this.artistNames], highlight : false, limit : 8});

			this.searchField.focus(function() {
				plot.dimAllArtists();		
			});

			this.searchField.blur(function() {
				plot.undimAllArtists();
				$(this).val('');
			});

			var that = this; // search oject
			this.searchField.keyup(function(event) {
		        // Detect the esc. key
		        if(event.keyCode === 27) {
					that.searchField.blur();
		            return;
		        } 
				that.highlightMatchingArtists();
		    });
		},

		highlightMatchingArtists : function() {
			var that = this;
	        var matchingArtists = this.artistNames.filter(function(name) {
	            if(that.searchField.val())
	                return (name.toUpperCase().indexOf(that.searchField.val().toUpperCase()) === 0);
	            return false;
	        }).slice(0, 8);

	        this.plot.unhighlightAllArtists();
	        this.plot.highlightArtists(matchingArtists);
		}

	};




	// Private methods

	/*
	* Funciton : drawScale(array of numbers, each number representing a tick on scale, average value)
	* ------------------------------------------------------------------------------------------------
	*/
	function drawScale(scaleDivisions, average) {

		var that = this;

		// Color of general numbers and lines
		var scaleColor = "#FFFFFF";
		var averageColor = "#B1D300";
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

		// Drawing the average text and ticks
		if(average) {
			this.scale
	      		.append('line')
		      	.attr('x1', scaleLeftPadding)
		      	.attr('x2', tickLength)
		      	.attr('y1', this.yScale(average))
		      	.attr('y2', this.yScale(average))
		      	.style('stroke', averageColor)
		      	.style('stroke-width', 1);

		    this.scale
		    	.append('text')
		    	.text(formatWithCommas(average) + ' words')
		    	.attr('fill', averageColor)
	      		.attr('font-family', that.fontFamily)
		    	.attr('font-size', 16)
		    	.attr('x', scaleLeftPadding)
		    	.attr('y', that.yScale(average) - (legendTickSeparation - 5));
		    	
		    this.scale
		    	.append('text')
		    	.text('Average')
		    	.attr('fill', averageColor)
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
		
})();