(function() {
    // Add ranks to the data, data will be already loaded in the browser rest assured
    // data is presorted by the length of vocabulary
    // Some day I won't have to do this, rank will already be in the data #acchedin
    vocab_data.forEach(function(data, index) {
        data.rank = (index + 1);
    });

    // Initialize the plot for the main visulaization
    var plot = VocabPlot.newPlot({
        // Css selectors for the elments on the plot
        cssId: 'vocab_plot',
        scaleCssId: 'vocab_plot_scale',
        searchFieldCssId: 'locateArtist',
        artistCircleCssClass: 'artistContainer',
        data: vocab_data
    });

    // Plot needs to be initialized before initializing this
    // Initializing the list that shows all the artists
    var allArtistsChart = AllArtists.createChart({
        allChartCssId: 'allArtistsContainer'
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

    expandButton.init({
        button: $('#btn_expandList'),
        target: $('#allArtistsContainer')
    });

    // Data for the polyglots
    var polyglots = [
        {
            name : 'Julio Iglesias',
            languages : ['Spanish', 'German', 'English', 'French', 'Italian', 'Portuguese', 'Russian' ]
        },
        {
            name : 'Andrea Bocelli',
            languages : ['Spanish', 'English', 'French', 'Italian', 'Portuguese']
        },
        {
            name : 'Bz',
            languages : ['Japanese', 'English']
        },
        {
            name : 'Gloria Estefan',
            languages : ['English', 'Spanish', 'French']
        }

    ];

    // Set of all the languages, will be used for creating the buttons 
    var polyglotLanguages = new Set();
    polyglots.forEach(function(polyglot) {
        polyglot.languages.forEach(function(language) {
            polyglotLanguages.add(language);
        });
    });

    console.log(polyglotLanguages);


})();