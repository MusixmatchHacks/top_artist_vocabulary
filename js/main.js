(function() {


	var testData = [{
    "total_nr_songs": "284",
    "total_words": "101848",
    "vocab_len": "8818",
    "name": "Eminem",
    "sales": "116"
}, {
    "total_nr_songs": "238",
    "total_words": "82042",
    "vocab_len": "6899",
    "name": "Jay Z",
    "sales": "79.8"
}, {
    "total_nr_songs": "149",
    "total_words": "57806",
    "vocab_len": "5069",
    "name": "Kanye West",
    "sales": "94.1"
}, {
    "total_nr_songs": "371",
    "total_words": "44625",
    "vocab_len": "4883",
    "name": "Bob Dylan",
    "sales": "43.6"
}, {
    "total_nr_songs": "129",
    "total_words": "61531",
    "vocab_len": "4539",
    "name": "The Black Eyed Peas",
    "sales": "54"
}, {
    "total_nr_songs": "423",
    "total_words": "28848",
    "vocab_len": "4323",
    "name": "Julio Iglesias",
    "sales": "51"
}, {
    "total_nr_songs": "261",
    "total_words": "24610",
    "vocab_len": "4306",
    "name": "Andrea Bocelli",
    "sales": "37.4"
}, {
    "total_nr_songs": "327",
    "total_words": "17090",
    "vocab_len": "3959",
    "name": "Bz",
    "sales": "72.8"
}, {
    "total_nr_songs": "335",
    "total_words": "41977",
    "vocab_len": "3954",
    "name": "Celine Dion",
    "sales": "122"
}, {
    "total_nr_songs": "592",
    "total_words": "57771",
    "vocab_len": "3906",
    "name": "Prince",
    "sales": "61.9"
}, {
    "total_nr_songs": "226",
    "total_words": "36166",
    "vocab_len": "3636",
    "name": "Red Hot Chili Peppers",
    "sales": "52.3"
}, {
    "total_nr_songs": "215",
    "total_words": "35652",
    "vocab_len": "3497",
    "name": "Genesis",
    "sales": "39.5"
}, {
    "total_nr_songs": "239",
    "total_words": "40053",
    "vocab_len": "3419",
    "name": "Gloria Estefan",
    "sales": "35.4"
},{
    "total_nr_songs": "222",
    "total_words": "28405",
    "vocab_len": "2829",
    "name": "Garth Brooks",
    "sales": "142.8"
}, {
    "total_nr_songs": "352",
    "total_words": "35450",
    "vocab_len": "2808",
    "name": "Rod Stewart",
    "sales": "76.1"
}, {
    "total_nr_songs": "157",
    "total_words": "31141",
    "vocab_len": "2797",
    "name": "Metallica",
    "sales": "90.2"
}, {
    "total_nr_songs": "339",
    "total_words": "32297",
    "vocab_len": "2794",
    "name": "The Rolling Stones",
    "sales": "94.7"
}];
    
    // TODO : Dynamically divide the plot into equal fragments based on the lower and upper value of 
    // data, like 0 - 1000, 1000 - 2000, 2000 - 3000 and so on
    // Style those section by adding elements 

	var plot = VocabPlot.newPlot('plot', vocab_data);


})();