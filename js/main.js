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
        init: function(config) {
            this.button = config.button;
            this.target = config.target;
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
                if($window.scrollTop() > expandButton.getLowerScrollLimit())
                    $window.scrollTop(950);
            }

        },

        getUpperScrollLimit: function() {
            return this.scrollLimits.top;
        },

        getLowerScrollLimit: function() {
            return (this.scrollLimits.top + this.target.height() - this.button.height() - 100);
        }


    };

    expandButton.init({
       button: $('#btn_expandList'),
       target: $('#allArtistsContainer')
    });

    // Set up the scroll listener on the window to maintain the position of the button
    // Not the best solution but will work for now ...
    $window.on('scroll', function() {
        var scrollPos = $window.scrollTop();
        if (scrollPos > expandButton.getUpperScrollLimit() && scrollPos < expandButton.getLowerScrollLimit()) {
            expandButton.button.addClass('buttonFixedScroll');
            expandButton.button.css({
                top : (expandButton.initialButtonPos.top - 490) + 'px',
                left : expandButton.initialButtonPos.left + 'px'
            });
        } else {
            expandButton.button.removeClass('buttonFixedScroll');
            expandButton.button.offset(expandButton.initialButtonPos);
        }
    });


})();