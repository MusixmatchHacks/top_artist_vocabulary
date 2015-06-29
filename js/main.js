(function() {

    // Add ranks to the data, data will be already loaded in the browser rest assured
    // data is presorted by the length of vocabulary
    vocab_data.forEach(function(data, index) {
        data.rank = (index + 1);
    });

    var plot = VocabPlot.newPlot({
        // Css selectors of the elments on the plot
        cssId : 'vocab_plot',
        scaleCssId : 'vocab_plot_scale',
        searchFieldCssId : 'locateArtist',
        artistCircleCssClass : 'artistContainer',
        data : vocab_data
    });

    // Plot needs to be initialized before initializing this
    var allArtistsChart = AllArtists.createChart({
        allChartCssId : 'allArtists'
    }, Object.keys(plot.artists));

})();