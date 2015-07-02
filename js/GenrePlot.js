(function() {

	window.GenrePlot = {
		init: function(config) {
			this.data = genre_data;

			// Sort the data in descending order by the avg_vocab for a clean visualization
			this.data.sort(descBy('avg_vocab'));

			this.container = config.container;
			this.scaleContainer = d3.select('#' + config.scaleContainerCssId);
			// If I am not wrong the scale legend is the numbers written around ticks 
			// like |200   |300 e.t.c may be I am wrong who knows?
			this.legendContainer = d3.select('#' + config.legendContainerCssId);

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

			this.drawPlot([500, 2000, 3500, 5000]);

			// Very hacky solution for making the legend sticky, will integrate with the expand button
			// TODO : fix this
			var $window = $(window);
			var $legendHolder = $('#' + config.legendContainerCssId);
			var pos = $legendHolder.offset();
			var containerPos = this.container.offset();
			var upperLimit = containerPos.top;
			var lowerLimit = upperLimit + this.container.height() - 30;
			$window.on('scroll', function() {
				var scrollPos = $window.scrollTop();
				if (scrollPos > upperLimit && scrollPos < lowerLimit) { 
					$legendHolder.css({
						position: 'fixed',
						top: '30px',
						left: pos.left
					});
				} else {

					$legendHolder.css({
						position: 'absolute',
						top : pos.top - 320
					});
				}

			});
		},

		drawPlot: function(divisions) {
			this.drawBars();
			this.drawScale(divisions);
			this.drawSeparators();
			this.drawScaleLegend(divisions);
		},

		drawScale: function(divisions) {
			// let us fucking put the divisions in 
			var that = this;
			var scaleColor = '#303030';

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
				.style('stroke', scaleColor)
				.style('stroke-width', 1);

			// this.drawScaleLegend(divisions);
		},

		drawScaleLegend: function(divisions) {
			var that = this;
			var legendRectWidth = 100;
			var legendRectHeight = 30;
			var legendFill = '#303030';
			var legendTextFill = '#FFFFFF';
			var leftPadding = 8;

			this.legendContainer
				.selectAll('rect').data(divisions).enter().append('rect')
				.attr('x', function(d) {
					// The original x position is adjusted for aesthetic purposed using trial and error	
					return that.xScale(d) - 0.5;
				})
				.attr('y', 0)
				.attr('width', legendRectWidth)
				.attr('height', legendRectHeight)
				.style('fill', legendFill);

			this.legendContainer
				.selectAll('text').data(divisions).enter().append('text')
				.attr('x', function(d) {
					return (that.xScale(d) + leftPadding);
				})
				.attr('y', 21)
				.text(function(d) {
					return (d + ' WORDS');
				})
				.attr('fill', legendTextFill)
				.style('font-family', 'Oswald');
		},

		drawBars: function() {
			var that = this;
			var spacing = 25;
			var barHeight = 30;
			var marginTop = 13;
			var barColor = '#D6C06D';

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
		},

		drawSeparators: function() {
			var that = this;

			// D3 doesn't like same svg shapes drawn on the same container
			// through different loops, so when we come to this method after 
			// drawing the scales (which are lines too) we're 4(in curent situation) short of data,
			// that is the index for us will not go from 0 - data.length but from 4 - data.length
			// we won't be able to draw required number of separators in that condition.
			// Since we're not using anything inside the data here, we will create a sample data
			// holding required number of virtual elements
			// the -1 is because we don't want the last separator as our container already has 
			// a border-bottom
			// NOTE: If you change the number of scale lines in drawScale(), you might have 
			// to make adjustments here too via Trial and Error.
			var sampleData = new Array(this.data.length + 4 - 1);

			var separatorColor = '#BABABA';
			var marginTop = 54.5;
			var spacing = 55;

			this.scaleContainer
				.selectAll('line').data(sampleData).enter().append('line')
				.attr('y1', function(d, i) {
					return ((i - 4) * spacing) + marginTop;
				})
				.attr('y2', function(d, i) {
					return ((i - 4) * spacing) + marginTop;
				})
				.attr('x1', 0)
				.attr('x2', function(d) {
					return that.xScale(6500);
				})
				.style('stroke', separatorColor)
				.style('stroke-width', 1);


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