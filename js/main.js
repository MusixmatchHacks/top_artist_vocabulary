(function() {


	var testData = [
    {
	    "total_nr_songs": "284",
	    "total_words": "101848",
	    "vocab_len": "8818",
	    "name": "Eminem",
	    "sales": "116"
	}, 
    {
        "total_nr_songs": "238",
        "total_words": "82042",
        "vocab_len": "6899",
        "name": "Jay Z",
        "sales": "79.8"
    }, 
    {
        "total_nr_songs": "149",
        "total_words": "57806",
        "vocab_len": "5069",
        "name": "Kanye West",
        "sales": "94.1"
    }, 
    {
        "total_nr_songs": "371",
        "total_words": "44625",
        "vocab_len": "4883",
        "name": "Bob Dylan",
        "sales": "43.6"
    }, 
    {
        "total_nr_songs": "129",
        "total_words": "61531",
        "vocab_len": "4539",
        "name": "The Black Eyed Peas",
        "sales": "54"
    },
    {
        "total_nr_songs": "423",
        "total_words": "28848",
        "vocab_len": "4323",
        "name": "Julio Iglesias",
        "sales": "51"
    }, 
    {
        "total_nr_songs": "261",
        "total_words": "24610",
        "vocab_len": "4306",
        "name": "Andrea Bocelli",
        "sales": "37.4"
    }];
    
    // TODO : Dynamically divide the plot into equal fragments based on the lower and upper value of 
    // data, like 0 - 1000, 1000 - 2000, 2000 - 3000 and so on
    // Style those section by adding elements 

	var plot = VocabPlot.newPlot('plot', testData);


})();