(function() {

    // Add required positioning data to each artist
    vocab_data.forEach(function(data, index) {
        data.rank = (index + 1);
    });

    var plot = VocabPlot.newPlot('plot', vocab_data);

})();