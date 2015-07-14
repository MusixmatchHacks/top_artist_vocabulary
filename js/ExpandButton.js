(function() {

	// Add contractability to the allArtists chart
	var $window = $(window);

	expandButton = {
		init: function(config) {
			this.button = config.button;
			this.target = config.target;
			// Variables that'll help in maintaining the positions while scrolling
			this.initialButtonPos = this.button.offset();
			this.scrollLimits = this.target.offset();
			// Initialize the click listener
			this.button.on('click', this.expandListToggle);
		},

		expandListToggle: function() {
			var that = expandButton;
			expandButton.target.toggleClass('expanded');
			if (expandButton.target.hasClass('expanded')) { // The list is expanded following block contracts it
				expandButton.target.children('.overlay').remove();
				$(this).text('SHOW LESS');

				// Fix the button at the bottom of the page
				that.attachButtonToBottom($(this));
			} else { // Following block expands the list 
				expandButton.target.prepend($('<div></div>', {
					class: 'overlay'
				}));
				$(this).text('SHOW ALL');

				that.restoreButtonPosition($(this));

				// Scroll to the next article section
				if ($window.scrollTop() > expandButton.getLowerScrollLimit())
					$window.scrollTop(1100);
			}

		},

		attachButtonToBottom: function(button) {
			button.addClass('attachedToBottom')
			button.css({
				top: ($window.height() - 45) + 'px'
			});
		},

		restoreButtonPosition: function(button) {
			var that = this;
			button.removeClass('attachedToBottom');
			console.log(that.target.height(), that.target.width(), that.target.offset().top);
			button.css({
				position: 'absolute',
				top: that.target.offset().top + 164 + 'px'
			});
		},

		getUpperScrollLimit: function() {
			return this.scrollLimits.top;
		},

		getLowerScrollLimit: function() {
			return (this.scrollLimits.top + this.target.height() - this.button.height());
		}


	};


	// Set up the scroll listener on the window to maintain the position of the button
	// Not the best solution but will work for now ...
	// TODO : fix this
	$window.on('scroll', function() {
		var scrollPos = $window.scrollTop();
		if (scrollPos > (expandButton.getLowerScrollLimit() - $window.height() + 100)) {
			if(expandButton.button.hasClass('attachedToBottom')){
				expandButton.button.removeClass('attachedToBottom');
				expandButton.button.css({
					position: 'absolute',
					top: expandButton.getLowerScrollLimit() - 480 + 'px'
				});
			}
		}else if(scrollPos < (expandButton.getLowerScrollLimit() - $window.height() + 100) && $('.overlay').length === 0) {
			expandButton.attachButtonToBottom(expandButton.button);
		}
	});
})();