(function() {
	// Export the module
	window.AllArtists = {};
	window.AllArtists.createChart = function(config, data) {
		return new AllArtists(config, data);
	};

	function AllArtists(config, data) {

		/*
			Data holds the data about genre, here is a sample genre data 
			{
			    "genre_name": "Punk Rock",
			    "artists": ["Green Day"],
			    "avg_vocab": 2535.0,
			    "num_artists": 1,
			    "total_vocab_len": 2535
			}
		*/
		this.data = data;

		// Data should sorted in descending order by the number of artists in that genre 
		data.sort(descBy('num_artists'));

		this.$chart = $('#' + config.allChartCssId);

		this.addArtistsToChart();

	}

	AllArtists.prototype = {
		// Sorts and returns the param(array) names of artists in the mentioned configuration in constructor
		sortNames: function(names) {
			names.sort(); // [all the names sorted in ascending order]
			var sortedNames = [];
			var currentLetter = names[0][0]; // A
			var currentIndex = 0;
			names.forEach(function(name) {
				if (name[0] === currentLetter) {
					if (sortedNames.length === 0) sortedNames.push({
						startingLetter: currentLetter,
						names: [add_(name)]
					});
					else sortedNames[currentIndex].names.push(add_(name));
				} else {
					currentLetter = name[0];
					currentIndex++;
					sortedNames[currentIndex] = {
						startingLetter: currentLetter,
						names: [add_(name)]
					};
				}
			});

			return sortedNames;
		},


		// and that is how this is supposed to be done
		addArtistsToChart: function() {
			var template = Handlebars.compile(this.$chart.children('#template-allArtists').html());
			this.$chart.append(template(this.data));
		}
	};


	// Private methods 
	// Converts 'A word' to 'A_word'
	function add_(word) {
		return word.split(" ").join("_");
	}

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