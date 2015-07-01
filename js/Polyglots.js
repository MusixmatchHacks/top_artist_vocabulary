(function() {

	// Augment the array prototype to accept only unique strings
	Array.prototype.pushUniqueString = function(string) {
		if (this.indexOf(string) > -1) return;
		else this.push(string);
	};

	polyglotArtists = {
		init: function(config, data) {

			this.uniqueLanguages = this.getUniqueLanguages(data);
			this.config = config;

			// Add the artists to the div 
			var polyglotTemplate = Handlebars.compile(config.template.html());
			config.container.append(polyglotTemplate(data));

			// Add the languages
			var languageTemplate = Handlebars.compile(config.languagesTemplate.html());
			config.languagesContainer.append(languageTemplate(this.uniqueLanguages));


			// We will have to find a way so that you know the artists we hover on highlights the relevant languages 
			$('.polyglotImage').each(function() {
				$(this).on('mouseover', function() {
					var id = $(this).attr('id');
					data.forEach(function(polyglot) {
						var name = 'polyglot_' + polyglot.name;
						if (id === name) {
							polyglotArtists.highlightLanguages(polyglot.languages);
						}
					});
				});
			});

			$('.polyglotImage').on('mouseout', function() {
				$('.polyglotLanguage').each(function() {
					$(this).removeClass('languageHighlight');
				});
			});


		},

		getUniqueLanguages: function(data) {
			var polyglotLanguages = [];
			data.forEach(function(polyglot) {
				polyglot.languages.forEach(function(language) {
					polyglotLanguages.pushUniqueString(language);
				});
			});
			return polyglotLanguages;
		},

		highlightLanguages: function(languageNames) {
			languageNames.forEach(function(language) {
				polyglotArtists.config.languagesContainer.children('#' + language).addClass('languageHighlight');
			});
		}
	};

})();