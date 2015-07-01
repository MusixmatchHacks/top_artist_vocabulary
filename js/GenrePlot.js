(function() {

	window.GenrePlot = {
		init: function(config) {
			this.data = genre_data;

			this.container = config.container;
			this.scaleContainer = d3.select('#' + config.scaleContainerCssId);

			this.xScale = d3.scale.linear()
				.domain([0, d3.max(this.data, function(d) {
					return d.avg_vocab;
				})])
				.range([0, $('#' + config.scaleContainerCssId).width()]);


			// Adding all the names of the genres to the plot using templating
			config.namesContainer.append(Handlebars.compile(config.genreNameTemplate)(this.data));

			// To make the scale take up the whole height of the plot 
			this.scaleContainer.style('height', this.container.height() + 'px');

			this.drawScale([500, 2000, 3500, 5000, 6500]);

			this.drawPlots();


		},

		drawScale: function(divisions) {
			// let us fucking put the divisions in 
			var that = this;

			this.scaleContainer
				.selectAll('line').data(divisions).enter().append('line')
				.attr('x1', function(d) {
					return that.xScale(d);
				})
				.attr('x2', function(d) {
					return that.xScale(d);
				})
				.attr('y1', 0)
				.attr('y2', this.container.height())
				.style('stroke', '#303030')
				.style('stroke-width', 1);
		},

		drawPlots: function() {
			var that = this;
			var marginBetween = 10;
			this.scaleContainer
				.selectAll('rect').data(this.data).enter().append('rect')
				.attr('x', 0)
				.attr('y', function(d, i) { return i * (50 + marginBetween);})
				.attr('width', function(d) { return that.xScale(d.avg_vocab);})
				.attr('height', 50)
				.style('fill', '#000000');
		}


	};

})();