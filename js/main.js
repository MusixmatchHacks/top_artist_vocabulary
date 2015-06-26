(function() {

    // Add ranks to the data
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

})();