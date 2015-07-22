(function() {

	// Exporting the module
	window.Artist = {};
	window.Artist.newArtist = function(artistName, artistData) {
		return new Artist(artistName, artistData);
	};

	// This module acts like an artist object
	// that will handle events on each artist object on the plot
	function Artist(artistName, artistData) {
		this.name = artistName;
		this.data = artistData;


		// Selector is simply name of the artist with whitespace replaced by _ , e.g.
		// Red Hot Chilli Peppers becomes Red_Hot_Chilli_Peppers
		this.selector = artistName.split(" ").join("_");
		// Points to the DOM element that holds the current artist
		this.$artist = $('#' + this.selector);

		// Track preview url
		// this.previewUrl = densest_tracks_data[this.selector] || "none";
		this.previewUrl = this.data.preview_mp3;


		// Set the background of the artist circle
		this.$artist.css('background-image', 'url(img/artist_images_40px/' + this.selector + '.jpg)');

		// Template that renders the content inside the tooltip
		this.tooltipTemplate = $.trim($('#tooltipTemplate').html());

		// The total number of artists the data has
		this.numArtists = 93; // currently hard coded

		// Enum that holds the state of the tooltip
		this.tooltipStates = {
			COMPACT: 1,
			EXPANDED: 2
		};

		// Variables that hold the configuration of the tooltip that is used
		// when interating with the artist like clicking it
		this.currentTooltipState= this.tooltipStates.COMPACT;

		this.tooltipOriginalContent = $('#tooltipTemplate').html()
			.replace(/{{rank}}/i, this.data.rank_vocab)
			.replace(/{{artistName}}/i, (this.data.name === "The Black Eyed Peas") ? "T.B.E.P" : this.data.name)
			.replace(/{{vocab}}/i, window.VocabPlot.formatWithCommas(this.data.vocab_len))
			.replace(/{{total}}/i, this.numArtists);

		this.tooltipExpandedContent = $('#tooltipTemplateExpanded').html()
			.replace(/{{rank}}/i, this.data.rank_vocab)
			.replace(/{{artistName}}/i, (this.data.name === "The Black Eyed Peas") ? "T.B.E.P" : this.data.name)
			.replace(/{{vocab}}/i, window.VocabPlot.formatWithCommas(this.data.vocab_len))
			.replace(/{{total}}/i, this.numArtists)
			.replace(/{{sales}}/i, this.data.certified_sales)
			.replace(/{{rank_sales}}/i, this.data.rank_sales)
			.replace(/{{learning_rate}}/i, Math.floor(this.data.learning_rate));


		// Initialize events
		this.events.hover.call(this);
		this.events.click.call(this);
	}

	Artist.prototype = {
		// Dims the artist on the plot by decreasing opacity
		dim: function() {
			this.$artist.removeClass('normalArtist');
			this.$artist.addClass('dimArtist');
		},

		// Undims the artist
		undim: function() {
			this.$artist.removeClass('dimArtist');
			this.$artist.addClass('normalArtist');
		},

		// Highlights the artist on the plot by adding a colored border
		// and showing its tooltip
		highlight: function() {
			if (!this.$artist.hasClass('highlightedArtist')) {
				this.$artist.addClass('highlightedArtist');
				this.$artist.tipsy('show');
			}
		},

		//  Removes highlight from the artist
		unhighlight: function() {
			if (this.$artist.hasClass('highlightedArtist')) {
				this.$artist.removeClass('highlightedArtist');
				this.$artist.tipsy('hide');
			}
		}
	};

	// Event handler on artist object
	Artist.prototype.events = {

		click: function() {
			var that = this;
			// This is a quick and dirty fix 
			// Stores in a global variable whether any kind of music is playing or not 
			window.someMusicPlaying = false; 
			this.$artist.on('click', function() {
				if(window.someMusicPlaying) { // if there is no music playing already
					var musicAlreadyPlaying = $(this).children('#embed_player').length >= 1;
					Artist.prototype.events.stopAllMusic();
					// Start playing the music if it isn't already playing otherwise get rid of it 
					if(musicAlreadyPlaying){ // stop the music
						$(this).children('#embed_player').remove();
						if($(this).children('playIconOverlay').length === 0)
							$(this).append('<div class = "playIconOverlay"><span class="audio_control_icon"><img src="img/icons/icon_play.png" alt="Play" /> </span> <span class="audio_control_icon" style="display: none;"> <img src="img/icons/icon_stop.png" alt="Stop" /> </span> </div> ');
						window.someMusicPlaying = false;
					}else{
						$(this).append('<embed id="embed_player" src="' + that.previewUrl + '" autostart="true" hidden="true"></embed>');				
						if($(this).children('playIconOverlay').length === 0)
							$(this).append('<div class = "playIconOverlay"><span class="audio_control_icon"><img src="img/icons/icon_play.png" alt="Play" /> </span> <span class="audio_control_icon" style="display: none;"> <img src="img/icons/icon_stop.png" alt="Stop" /> </span> </div> ');
						$(this).children('.playIconOverlay').children('.audio_control_icon').toggle();
						window.someMusicPlaying = true;
					}
				} else {  // Some other artist is already playing some sort of music 
					var musicAlreadyPlaying = $(this).children('#embed_player').length >= 1;
					// Start playing the music if it isn't already playing otherwise get rid of it 
					if(musicAlreadyPlaying){ // stop the music
						$(this).children('#embed_player').remove();
						$(this).children('.playIconOverlay').children('.audio_control_icon').toggle();
						window.someMusicPlaying = false;
					}else{
						$(this).append('<embed id="embed_player" src="' + that.previewUrl + '" autostart="true" hidden="true"></embed>');				
						$(this).children('.playIconOverlay').children('.audio_control_icon').toggle();
						window.someMusicPlaying = true;
					}
				}
			});
		},

		// Helper methods for the click function 
		stopAllMusic: function() {
			$('#embed_player').remove();
			$('.playIconOverlay').remove();
			window.someMusicPlaying = false;
		},

		// Show a tooltip on hover
		hover: function() {
			var that = this;
			this.$artist.tipsy({
				gravity: (that.data.name === 'Eminem') ? 'n' : 's',
				html: true,
				opacity: 1,
				offset: 3,
				title: function() {
					return that.tooltipExpandedContent;
				}
			});

			// We will add a play button as an overlay over the artist image on hover 
			this.$artist.on('mouseenter', function() {
				var isSinging = $(this).children('#embed_player').length >= 1;
				if(!isSinging) {
					$(this).append('<div class = "playIconOverlay"><span class="audio_control_icon"><img src="img/icons/icon_play.png" alt="Play" /> </span> <span class="audio_control_icon" style="display: none;"> <img src="img/icons/icon_stop.png" alt="Stop" /> </span> </div> ');
				}
			});

			this.$artist.on('mouseleave', function() {
				// If the current artist is singing something then don't remove the icon 
				var isSinging = $(this).children('#embed_player').length >= 1;
				if(!isSinging) {
					$(this).children('.playIconOverlay').remove();
				}
			});
		}

	};

})();
