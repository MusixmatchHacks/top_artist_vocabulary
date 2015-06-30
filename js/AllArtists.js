(function() {
	// Export the module
	window.AllArtists = {};
	window.AllArtists.createChart = function(config, artistNames) {
		return new AllArtists(config, artistNames);
	};

	function AllArtists(config, artistNames) {
		// sortedNames stores artist's names in the following configuraiton
		/*
			[
				{startingLetter : 'A', names : [names of artists starting with A ]},
				{startingLetter : 'B', names : [names of artists starting with B ]}...
				...
			]
		*/
		this.sortedNames = this.sortNames(artistNames);

		this.$chart = $('#' + config.allChartCssId);

		this.addArtistsToChart();

	}

	AllArtists.prototype = {
		// Sorts and returns the names(array) of artists in the mentioned configuration in constructor
		sortNames: function(names) {
			names.sort(); // [all the names sorted in ascending order]
			var sortedNames = [];
			var currentLetter = names[0][0]; // A
			var currentIndex = 0;
			names.forEach(function(name) {
				if (name[0] === currentLetter) {
					if (sortedNames.length === 0) sortedNames.push({ startingLetter : currentLetter, names : [add_(name)]});
					else sortedNames[currentIndex].names.push(add_(name));
				} else {
					currentLetter = name[0];
					currentIndex++;
					sortedNames[currentIndex] = { startingLetter : currentLetter, names : [add_(name)]};
				}
			});

			return sortedNames;
		},


		// and that is how this is supposed to be done
		addArtistsToChart: function() {
			var template = Handlebars.compile(this.$chart.find('#template-allArtists').html());
			this.$chart.find('#allArtistsContainer').append(template(this.sortedNames));
		}
	};


	// Private methods 
	// Converts 'A word' to 'A_word'
	function add_(word) {
		return word.split(" ").join("_");
	}

})();