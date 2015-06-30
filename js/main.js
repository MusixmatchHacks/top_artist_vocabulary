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

    // Add contractability to the all artists div
    var $allArtistContainer = $('#allArtists');
    $('#btn_expandList').on('click', function() {
        $allArtistContainer.toggleClass('expanded');
        if ($allArtistContainer.hasClass('expanded')) {
            $allArtistContainer.children('.overlay').remove();
            $(this).text('SHOW LESS');
        } else {
            $allArtistContainer.prepend($('<div></div>', {
                class: 'overlay'
            }));
            $(this).text('SHOW ALL');
        }
    });



})();