(function() {

	// Export the module
	window.VocabPlot = {};
	// Export this function for use in Artist.js file
	window.VocabPlot.formatWithCommas = formatWithCommas;
	window.VocabPlot.newPlot = function(config) {
		return new VocabPlot(config);
	};

	function VocabPlot(config) {
		this.config = config;

		// Data for the plot
		this.data = this.config.data;

		this.$plot = $('#' + this.config.cssId);
		this.scale = d3.select('#' + this.config.scaleCssId);
		// Font family for the text that is show on on the graph
		this.fontFamily = 'Oswald';

		this.width = this.$plot.width();
		this.height = this.$plot.height();

		// A collection of artist (Artist Objects) on the plot
		this.artists = {};

		this.yScale = d3.scale.linear().domain([0, 10000]).range([0.95 * this.height, 0]);
		drawScale.call(this, [809, 2000, 4000, 6000, 8000], 2677);


		this.addArtistsToPlot();
		// Initialize the searchField
		this.search.init(this, this.config.searchFieldCssId);

	}

	VocabPlot.prototype = {

		// Method to add new artist to the plot
		addArtistsToPlot: function() {
			var that = this; // VocabPlot
			d3.select('#artistCircleContainer')
				.selectAll(this.config.artistCircleCssClass)
				.data(this.data)
				.enter()
				.append('div')
				.attr('id', function(d) {
					return d.name.split(" ").join("_");
				})
				.classed(this.config.artistCircleCssClass, true)
				.style('top', function(d) {
					return ((that.yScale(d.vocab_len)) - 20) + 'px';
				}) // 9 is the height of the cricles will be made dynamic later
				.each(function(d) {
					that.artists[d.name] = Artist.newArtist(d.name, d);
				})
				// .style('left', function(d, i) {
				// 	// Computed through trial and error for the position
				// 	return 180 + (i * ((that.width - 220) / that.data.length)) + 'px';
				// })
				.style('left', function(d) {
					return (d.x + d.x_offset - 17.5) + 'px';
				})
			// to avoid stutter on load
			.transition().duration(300)
				.style('opacity', 1);
		},

		// Operations styles of the artist circles on the plot
		dimAllArtists: function() {
			for (var artistName in this.artists)
				this.artists[artistName].dim();
		},

		undimAllArtists: function() {
			for (var artistName in this.artists) {
				this.artists[artistName].undim();
				this.artists[artistName].unhighlight();
			}
		},

		unhighlightAllArtists: function() {
			for (var artistName in this.artists) {
				this.artists[artistName].unhighlight();
			}
		},

		// Highlights the artists whose names are supplied in the artistNames(argument) array
		highlightArtists: function(artistNames) {
			var that = this; // VocabPlot
			artistNames.forEach(function(artistName) {
				that.artists[artistName].highlight();
			});
		}

	};


	// Handles the implementation and working of the search field on the plot
	VocabPlot.prototype.search = {
		init: function(plot, searchFieldCssId) {
			// Caching
			this.searchField = $('#' + searchFieldCssId);
			this.plot = plot; // Cache the plot on which this search field is located
			this.artistNames = Object.keys(this.plot.artists);

			this.searchField.autocomplete({
				source: [this.artistNames],
				highlight: false,
				limit: 8
			});

			this.searchField.focus(function() {
				plot.dimAllArtists();

				// Scroll the visualization into view
				var offset = plot.$plot.offset();
				$('html, body').animate({
					scrollTop: offset.top,
				}, 200);
			});

			this.searchField.blur(function() {
				plot.undimAllArtists();
				$(this).val('');
			});

			var that = this; // search oject
			// Debounced the following function for efficiency
			var timeout;
			this.searchField.keyup(function(event) {
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					// Detect the esc. key
					if (event.keyCode === 27) {
						that.searchField.blur();
						return;
					}
					that.highlightMatchingArtists();
				}, 250);
			});
		},

		// TODO : debounce the following function
		highlightMatchingArtists: function() {
			var that = this;
			var matchingArtists = this.artistNames.filter(function(name) {
				var searchFieldValue = that.searchField.val();
				// If the search is a number then highlight the artist by rank
				if (searchFieldValue) {
					if ($.isNumeric(searchFieldValue)) {
						return (that.plot.artists[name].data.rank === Number(searchFieldValue));
					} else {
						return (name.toUpperCase().indexOf(searchFieldValue.toUpperCase()) === 0);
					}
					return false;
				}
			}).slice(0, 8);

			this.plot.unhighlightAllArtists();
			this.plot.highlightArtists(matchingArtists);
		}
	};

	// Funciton : drawScale(array of numbers, each number representing a tick on scale, average value)
	function drawScale(scaleDivisions, average) {

		var that = this;
		// Color of general numbers and lines
		var scaleColor = "#FFFFFF";
		var averageColor = "#303030";
		// Length of each tick on the scale ( the white line)
		var scaleLeftPadding = 25;
		var tickLength = 0.98 * this.width;

		// The amount of separation the text and tick
		var legendTickSeparation = 12;

		// Draw the lines on the scale
		this.scale
			.selectAll('line').data(scaleDivisions).enter().append('line')
			.attr('x1', scaleLeftPadding)
			.attr('x2', tickLength)
			.attr('y1', function(d) {
				return that.yScale(d);
			})
			.attr('y2', function(d) {
				return that.yScale(d);
			})
			// .attr('stroke-dasharray', '1, 5')
			.style('stroke', scaleColor)
			// .style('stroke', 'rgba(255, 255, 255, 0.4)')
			.style('stroke-width', 1);

		// Add legend to the scale
		this.scale
			.selectAll('text')
			.data(scaleDivisions).enter().append('text')
			.attr('x', scaleLeftPadding)
			.attr('y', function(d) {
				return (that.yScale(d) - legendTickSeparation);
			})
			.text(function(d) {
				return (formatWithCommas(d) + ' words');
			})
			.attr('fill', scaleColor)
			.attr('font-size', 18);

		// Drawing the average text and ticks
		if (average) {
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
				.attr('font-size', 16)
				.attr('x', scaleLeftPadding)
				.attr('y', that.yScale(average) - (legendTickSeparation - 5));

			this.scale
				.append('text')
				.text('Average')
				.attr('fill', averageColor)
				.attr('font-size', 16)
				.attr('x', scaleLeftPadding)
				.attr('y', that.yScale(average) - (2.1 * legendTickSeparation));
		}
	}


	// Adds commas to a large number at appropriate places
	function formatWithCommas(x) {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}

})();