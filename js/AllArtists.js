(function() {
	// Export the module
	window.AllArtists = {};
	window.AllArtists.createChart = function(config, artistNames) {
		return new AllArtists(config, artistNames);
	};

	function AllArtists(config, artistNames) {
		// Stores artist's names in the following configuraiton
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
					if (sortedNames.length === 0) sortedNames.push({ startingLetter : currentLetter, names : [name]});
					else sortedNames[currentIndex].names.push(name);
				} else {
					currentLetter = name[0];
					currentIndex++;
					sortedNames[currentIndex] = { startingLetter : currentLetter, names : [name]};
				}
			});

			return sortedNames;
		},


		// and that is how this is supposed to be done
		addArtistsToChart: function() {
			var template = Handlebars.compile(this.$chart.children('#template-allArtists').html());
			var temp = template(this.sortedNames);
			this.$chart.append(temp);
		}
	};

	// This thing is not a part of the prototype 
	function addNames(names) {
		// now all that we have to do here is take the current collection of names 
		//and the add it to the DOM in some sort of div alright
		// it looks like we're gonna need a template here right ?  yes 
	}

})();