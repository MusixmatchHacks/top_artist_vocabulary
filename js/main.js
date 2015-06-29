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


    // We need to sort the names in this fashion { A : [names starting with A ], B : [], C [] ...}
    // and put them into the sortedNames object
    var names = Object.keys(plot.artists).sort();
    var sortedNames = {};
    var currentLetter = names[0][0]; // A
    names.forEach(function(name) {
        if(name[0] === currentLetter) {
            if(!sortedNames[currentLetter]) sortedNames[currentLetter] = [name];
            else sortedNames[currentLetter].push(name);
        } else {
            currentLetter = name[0];
            if(!sortedNames[currentLetter]) sortedNames[currentLetter] = [name];
        }
    });


    console.log(sortedNames);

})();