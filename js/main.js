(function() {

    // Add required positioning data to each artist
    vocab_data.forEach(function(data, index) {
        data.rank = (index + 1);
    });

    var plot = VocabPlot.newPlot({
        // Css selectors of the elments on the plot
        cssId : 'plot',
        scaleCssId : 'scale',
        searchFieldCssId : 'locateArtist',
        artistCircleCssClass : 'artistContainer',
        data : vocab_data
    });

})();