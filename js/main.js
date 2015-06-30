(function() {

    // Set up the data and the charts

    // Add ranks to the data, data will be already loaded in the browser rest assured
    // data is presorted by the length of vocabulary
    vocab_data.forEach(function(data, index) {
        data.rank = (index + 1);
    });

    // Initialize the plot for the main visulaization
    var plot = VocabPlot.newPlot({
        // Css selectors of the elments on the plot
        cssId: 'vocab_plot',
        scaleCssId: 'vocab_plot_scale',
        searchFieldCssId: 'locateArtist',
        artistCircleCssClass: 'artistContainer',
        data: vocab_data
    });

    // Plot needs to be initialized before initializing this
    var allArtistsChart = AllArtists.createChart({
        allChartCssId: 'allArtists'
    }, Object.keys(plot.artists));

    // Add tooltips to the artists in the AllArtist chart
    $('.letterArtistImage').each(function() {
        var $self = $(this);
        $self.tipsy({
            title: function() {
                return $self.attr('id').split("_").join(" "); // Replaces the underscores in name with spaces
            },
            gravity: 's',
            opacity: 1,
            offset: 2
        });
    });

    var $window = $(window);
    // Add contractability to the all artists div
    var expandButton = {
        button: $('#btn_expandList'),
        target: $('#allArtists'),

        init: function() {
            // Variables that'll help in maintaining the positions while scrolling
            this.initialButtonPos = this.button.offset();
            this.scrollLimits = this.target.offset();

            // Initialize the click listener 
            this.button.on('click', this.expandList);
        },

        expandList: function() {
            expandButton.target.toggleClass('expanded');
            if (expandButton.target.hasClass('expanded')) {
                expandButton.target.children('.overlay').remove();
                $(this).text('SHOW LESS');
            } else {
                expandButton.target.prepend($('<div></div>', {
                    class: 'overlay'
                }));
                $(this).text('SHOW ALL');
                // Scroll to the next article section
                $window.scrollTop(950);
            }

        },

        // Returns the new position for when the window is scrolled
        getPositionTop: function() {
            // so you will need the initial and the current position of the button
            return ($window.scrollTop() - this.scrollLimits.top) + 'px';
        },

        getPositionLeft: function() {
            return this.initialButtonPos.left + 'px';
        },

        getUpperScrollLimit: function() {
            return this.scrollLimits.top;
        },

        getLowerScrollLimit: function() {
            return (this.scrollLimits.top + this.target.height() - this.button.height() - 20);
        }


    };

    expandButton.init();

    // Set up the scroll listener on the window to maintain the position of the button
    var timeout;
    $window.on('scroll', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            var scrollPos = $window.scrollTop();
            if (scrollPos > expandButton.getUpperScrollLimit() && scrollPos < expandButton.getLowerScrollLimit()) {
                expandButton.button.addClass('buttonFixedScroll');
            } else {
                expandButton.button.removeClass('buttonFixedScroll');
            }
        }, 0);

    });


})();