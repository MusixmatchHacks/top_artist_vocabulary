(function() {
    'use strict';

    // TODO : Make a list of all the absolutely positioned elements and adjust their position on resize

    // Hnadlebar helpers

    // Handlebar helper to increment int by 1
    // Used in displaying ranks starting from 1 instead of 0
    Handlebars.registerHelper("inc", function(value, options) {
        return parseInt(value) + 1;
    });

    // Replaces spaces with underscores in a word
    Handlebars.registerHelper("undy", function(value, options) {
        return (value.split(" ").join("_"));
    });

    // Transform string to uppercase
    Handlebars.registerHelper("upperCase", function(value, options) {
        return (value.toUpperCase());
    });

    Handlebars.registerHelper('index_of', function(context,ndx) {
        return context[ndx];
    });

    // Not Handlebar helpers, everything else 

    vocab_data.forEach(function(artist, index) {
        artist.x = $('#artistCircleContainer').width() / 2; // was supposed to be pulled from plot but circular dependency is a bitch
    });

    // Initialize the plot for the main visulaization
    // We will need a lot more options and stuff here and for changing the scales and stuff like that too 
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
    }, genre_data);

    // Add tooltips to the artists in the AllArtist chart
    $('.letterArtistImage').each(function() {
        var $self = $(this);
        $self.tipsy({
            title: function() {
                return $self.attr('id').split("_").join(" "); // Replaces the underscores in name with spaces
            },
            gravity: 's',
            opacity: 1,
            offset: 0
        });
    });

    expandButton.init({
        button: $('#btn_expandList'),
        target: $('#allArtistsContainer')
    });


    // Data for the polyglots
    var polyglotData = [{
            name: 'Julio_Iglesias',
            languages: ['Spanish', 'German', 'English', 'French', 'Italian', 'Portuguese', 'Russian']
        }, {
            name: 'Andrea_Bocelli',
            languages: ['Spanish', 'English', 'French', 'Italian', 'Portuguese']
        }, {
            name: 'Bz',
            languages: ['Japanese', 'English']
        }, {
            name: 'Gloria_Estefan',
            languages: ['English', 'Spanish', 'French']
        }

    ];


    polyglotArtists.init({
        container: $('#polyglotImages'),
        languageContainer: $('#polyglotLanguages'),
        languagesContainer: $('#polyglotLanguages'),
        template: $('#template-polyglots').html(),
        languagesTemplate: $('#template-polyglots-languages').html(),
        artistContainer: $('.polyglotImage') // TODO :  this thing is not getting exported properly, fix this
    }, polyglotData);


    // Some positional fixes
    // center the last image :D (even Google's homepage uses <center> so what)
    $('.polyglotImage:last-child').wrap('<center></center>');
    $('.polyglotImage').eq(0).css('margin-left', '0');

    GenrePlot.init({
        container: $('#genrePlot'),
        scaleContainerCssId: 'genrePlotScale',
        legendContainerCssId: 'genreLegend',
        namesContainer: $('#genreNames'),
        genreNameTemplate: $('#genre-names-template').html()
    });



})();