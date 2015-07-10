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
			expandButton.target.toggleClass('expanded');
			if (expandButton.target.hasClass('expanded')) {
				expandButton.target.children('.overlay').remove();
				$(this).text('Show less');
			} else {
				expandButton.target.prepend($('<div></div>', {
					class: 'overlay'
				}));
				$(this).text('Show all');
				// Scroll to the next article section
				if ($window.scrollTop() > expandButton.getLowerScrollLimit())
					$window.scrollTop(1100);
			}

		},

		getUpperScrollLimit: function() {
			return this.scrollLimits.top;
		},

		getLowerScrollLimit: function() {
			return (this.scrollLimits.top + this.target.height() - this.button.height() - 100);
		}


	};


	// Set up the scroll listener on the window to maintain the position of the button
	// Not the best solution but will work for now ...
	// TODO : fix this
	$window.on('scroll', function() {
		var scrollPos = $window.scrollTop();
		if (scrollPos > expandButton.getUpperScrollLimit() && scrollPos < expandButton.getLowerScrollLimit()) {
			expandButton.button.addClass('buttonFixedScroll');
			expandButton.button.css({
				top: (expandButton.initialButtonPos.top - 532) + 'px',
				left: expandButton.initialButtonPos.left + 'px'
			});
		} else {
			expandButton.button.removeClass('buttonFixedScroll');
			expandButton.button.offset(expandButton.initialButtonPos);
		}
	});
})();
