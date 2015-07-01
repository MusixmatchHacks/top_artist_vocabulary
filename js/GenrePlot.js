(function() {

	window.GenrePlot = {
		init: function(config) {
			this.data = genre_data;

			// Sort the data in descending order by the avg_vocab for a clean visualization
			this.data.sort(descBy('avg_vocab'));

			this.container = config.container;
			this.scaleContainer = d3.select('#' + config.scaleContainerCssId);

			console.log($('#' + config.scaleContainerCssId).width());
			this.xScale = d3.scale.linear()
				.domain([0, d3.max(this.data, function(d) {
					return d.avg_vocab;
				})])
				.range([0, $('#' + config.scaleContainerCssId).width()]);
				// .range([0, 510]);


			// Adding all the names of the genres to the plot using templating
			config.namesContainer.append(Handlebars.compile(config.genreNameTemplate)(this.data));

			// To make the scale take up the whole height of the plot 
			this.scaleContainer.style('height', this.container.height() + 'px');

			// Because of d3 quirks we will have to create a separate svg container to hold the 
			// scale lengends sigh!

			this.drawScale([500, 2000, 3500, 5000]);
			this.drawBars();


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

				this.drawScaleLegend(divisions);
		},

		drawScaleLegend: function(divisions) {
			var that = this;
			var legendRectWidth = 50;
			var legendRectHeight = 30;
			var legendFill = '#303030';
			var leftPadding = 5;

			this.scaleContainer
				.selectAll('text').data(divisions).enter().append('text')
				.attr('x', function(d) {
					return (that.xScale(d) + leftPadding);
				})
				.attr('y', 20)
				.text(function(d) {
					return (d + ' words');
				})
				.attr('fill', '#303030');
		},

		drawBars: function() {
			var that = this;
			var spacing = 15;
			var barHeight = 30;
			var marginTop = 85;
			var barColor = '#FF6633';

			this.scaleContainer
				.selectAll('rect').data(this.data).enter().append('rect')
				.attr('x', 0)
				.attr('y', function(d, i) {
					return (i * (barHeight + spacing) + marginTop);
				})
				.attr('width', function(d) {
					return that.xScale(d.avg_vocab);
				})
				.attr('height', barHeight)
				.style('fill', barColor);
		}


	};
	/*
	 * Function : descBy(one of the property name of objects present in an array)
	 * Usage    : arrayHoldingNames.sort(descBy(firstName));
	 * ----------------------------------------------------------------------
	 * Used to sort any array of objects in descending order by a property name 
	 * of the obejcts inside that array.
	 */
	function descBy(propertyName) {
		return function(m, n) {
			if (typeof m === 'object' && typeof n === 'object') {
				var propertyValueM = m[propertyName];
				var propertyValueN = n[propertyName];

				if (propertyValueM === propertyValueN) return 0;
				if (typeof propetyValueM === typeof propertyVaueN) {
					return (propertyValueM < propertyValueN ? 1 : -1);
				} else {
					return (typeof propertyValueM < propertyValueN ? 1 : -1);
				}

			} else {
				throw {
					type: 'Error',
					message: 'Expected objects got something else'
				};
			}
		};
	}

})();