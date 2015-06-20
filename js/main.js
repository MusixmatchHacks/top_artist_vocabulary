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
}, {
    "total_nr_songs": "186",
    "total_words": "54044",
    "vocab_len": "3206",
    "name": "Beyonc\u00e9 Knowles",
    "sales": "66"
}, {
    "total_nr_songs": "496",
    "total_words": "33944",
    "vocab_len": "3186",
    "name": "Barbra Streisand",
    "sales": "97.1"
}, {
    "total_nr_songs": "220",
    "total_words": "35060",
    "vocab_len": "3168",
    "name": "Robbie Williams",
    "sales": "48.2"
}, {
    "total_nr_songs": "192",
    "total_words": "17621",
    "vocab_len": "3077",
    "name": "Pink Floyd",
    "sales": "116.2"
}, {
    "total_nr_songs": "213",
    "total_words": "31886",
    "vocab_len": "3061",
    "name": "Billy Joel",
    "sales": "99.2"
}, {
    "total_nr_songs": "203",
    "total_words": "50313",
    "vocab_len": "3059",
    "name": "Mariah Carey",
    "sales": "129.1"
}, {
    "total_nr_songs": "306",
    "total_words": "28970",
    "vocab_len": "2974",
    // "name": "R.E.M.",
    "name": "REM",
    "sales": "41.6"
}, {
    "total_nr_songs": "221",
    "total_words": "34048",
    "vocab_len": "2958",
    "name": "Aerosmith",
    "sales": "83"
}, {
    "total_nr_songs": "329",
    "total_words": "24589",
    "vocab_len": "2927",
    "name": "Linda Ronstadt",
    "sales": "32.5"
}, {
    "total_nr_songs": "245",
    "total_words": "46967",
    "vocab_len": "2918",
    "name": "Madonna",
    "sales": "166.6"
}, {
    "total_nr_songs": "419",
    "total_words": "29208",
    "vocab_len": "2891",
    "name": "Johnny Hallyday",
    "sales": "24.3"
}, {
    "total_nr_songs": "430",
    "total_words": "35018",
    "vocab_len": "2865",
    "name": "Elton John",
    "sales": "161.8"
}, {
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
}, {
    "total_nr_songs": "309",
    "total_words": "23916",
    "vocab_len": "2755",
    "name": "Santana",
    "sales": "61.2"
}, {
    "total_nr_songs": "135",
    "total_words": "30071",
    "vocab_len": "2742",
    "name": "ABBA",
    "sales": "57.8"
}, {
    "total_nr_songs": "538",
    "total_words": "23839",
    "vocab_len": "2725",
    "name": "Frank Sinatra",
    "sales": "37.1"
}, {
    "total_nr_songs": "168",
    "total_words": "43792",
    "vocab_len": "2716",
    "name": "Meat Loaf",
    "sales": "39.9"
}, {
    "total_nr_songs": "256",
    "total_words": "29590",
    "vocab_len": "2708",
    "name": "U2",
    "sales": "102.6"
}, {
    "total_nr_songs": "160",
    "total_words": "29071",
    "vocab_len": "2668",
    "name": "Queen",
    "sales": "103.9"
}, {
    "total_nr_songs": "208",
    "total_words": "27507",
    "vocab_len": "2535",
    "name": "Green Day",
    "sales": "46.3"
}, {
    "total_nr_songs": "461",
    "total_words": "28488",
    "vocab_len": "2531",
    "name": "Elvis Presley",
    "sales": "208.4"
}, {
    "total_nr_songs": "212",
    "total_words": "28628",
    "vocab_len": "2530",
    "name": "Van Halen",
    "sales": "63.8"
}, {
    "total_nr_songs": "105",
    "total_words": "37028",
    "vocab_len": "2524",
    "name": "Taylor Swift",
    "sales": "130.4"
}, {
    "total_nr_songs": "89",
    "total_words": "27478",
    "vocab_len": "2519",
    "name": "Katy Perry",
    "sales": "106.9"
}, {
    "total_nr_songs": "311",
    "total_words": "51517",
    "vocab_len": "2503",
    "name": "Michael Jackson",
    "sales": "175.4"
}, {
    "total_nr_songs": "96",
    "total_words": "37288",
    "vocab_len": "2498",
    "name": "Lady Gaga",
    "sales": "74.4"
}, {
    "total_nr_songs": "179",
    "total_words": "47881",
    "vocab_len": "2483",
    "name": "Janet Jackson",
    "sales": "51"
}, {
    "total_nr_songs": "113",
    "total_words": "29844",
    "vocab_len": "2469",
    // "name": "Guns N' Roses",
    "name": "Guns N Roses",
    "sales": "69.2"
}, {
    "total_nr_songs": "378",
    "total_words": "30019",
    "vocab_len": "2451",
    "name": "Barry Manilow",
    "sales": "36.5"
}, {
    "total_nr_songs": "300",
    "total_words": "27622",
    "vocab_len": "2433",
    "name": "Kenny Rogers",
    "sales": "58.8"
}, {
    "total_nr_songs": "244",
    "total_words": "28099",
    "vocab_len": "2432",
    "name": "Alabama",
    "sales": "47.5"
}, {
    "total_nr_songs": "137",
    "total_words": "46836",
    "vocab_len": "2400",
    "name": "Rihanna",
    "sales": "126.1"
}, {
    "total_nr_songs": "153",
    "total_words": "24346",
    "vocab_len": "2343",
    "name": "M\u00f6tley Cr\u00fce",
    "sales": "27.6"
}, {
    "total_nr_songs": "255",
    "total_words": "37276",
    "vocab_len": "2318",
    "name": "Bon Jovi",
    "sales": "80.5"
}, {
    "total_nr_songs": "325",
    "total_words": "26094",
    "vocab_len": "2280",
    "name": "Tina Turner",
    "sales": "32.1"
}, {
    "total_nr_songs": "300",
    "total_words": "27023",
    "vocab_len": "2250",
    "name": "George Strait",
    "sales": "72.8"
}, {
    "total_nr_songs": "105",
    "total_words": "21625",
    "vocab_len": "2201",
    "name": "Eagles",
    "sales": "127.9"
}, {
    "total_nr_songs": "393",
    "total_words": "29685",
    "vocab_len": "2193",
    "name": "Neil Diamond",
    "sales": "67.1"
}, {
    "total_nr_songs": "298",
    "total_words": "29462",
    "vocab_len": "2178",
    "name": "Reba McEntire",
    "sales": "42.2"
}, {
    "total_nr_songs": "289",
    "total_words": "30633",
    "vocab_len": "2163",
    "name": "Cher",
    "sales": "40.4"
}, {
    "total_nr_songs": "176",
    "total_words": "44028",
    "vocab_len": "2141",
    "name": "Britney Spears",
    "sales": "77.1"
}, {
    "total_nr_songs": "327",
    "total_words": "30642",
    "vocab_len": "2114",
    // "name": "Earth Wind & Fire",
    "name": "Earth Wind Fire",
    "sales": "34.9"
}, {
    "total_nr_songs": "63",
    "total_words": "14797",
    "vocab_len": "2108",
    "name": "Dire Straits",
    "sales": "42.9"
}, {
    "total_nr_songs": "169",
    "total_words": "23779",
    "vocab_len": "2077",
    "name": "Led Zeppelin",
    "sales": "138.5"
}, {
    "total_nr_songs": "190",
    "total_words": "28806",
    "vocab_len": "2055",
    "name": "Bryan Adams",
    "sales": "43.1"
}, {
    "total_nr_songs": "276",
    "total_words": "32826",
    "vocab_len": "2037",
    "name": "Aretha Franklin",
    "sales": "24.5"
}, {
    "total_nr_songs": "286",
    "total_words": "27203",
    "vocab_len": "2015",
    "name": "Olivia Newton-John",
    "sales": "34.7"
}, {
    "total_nr_songs": "210",
    "total_words": "30920",
    "vocab_len": "1999",
    "name": "Donna Summer",
    "sales": "30.8"
}, {
    "total_nr_songs": "99",
    "total_words": "27838",
    "vocab_len": "1975",
    "name": "George Michael",
    "sales": "43.5"
}, {
    "total_nr_songs": "233",
    "total_words": "28840",
    "vocab_len": "1954",
    "name": "Scorpions",
    "sales": "18.9"
}, {
    "total_nr_songs": "238",
    "total_words": "32094",
    "vocab_len": "1921",
    "name": "Kiss",
    "sales": "26.8"
}, {
    "total_nr_songs": "604",
    "total_words": "24232",
    "vocab_len": "1903",
    "name": "Paul McCartney",
    "sales": "57.9"
}, {
    "total_nr_songs": "191",
    "total_words": "36323",
    "vocab_len": "1890",
    "name": "Whitney Houston",
    "sales": "111.3"
}, {
    "total_nr_songs": "193",
    "total_words": "22354",
    "vocab_len": "1884",
    "name": "Depeche Mode",
    "sales": "26.3"
}, {
    "total_nr_songs": "370",
    "total_words": "35502",
    "vocab_len": "1882",
    "name": "Bee Gees",
    "sales": "67.3"
}, {
    "total_nr_songs": "273",
    "total_words": "26437",
    "vocab_len": "1872",
    "name": "The Beatles",
    "sales": "264.9"
}, {
    "total_nr_songs": "174",
    "total_words": "13371",
    "vocab_len": "1869",
    "name": "Enya",
    "sales": "48.7"
}, {
    "total_nr_songs": "173",
    "total_words": "26525",
    "vocab_len": "1867",
    "name": "Bob Marley",
    "sales": "36"
}, {
    "total_nr_songs": "338",
    "total_words": "18897",
    "vocab_len": "1863",
    "name": "Stevie Wonder",
    "sales": "33.8"
}, {
    "total_nr_songs": "149",
    "total_words": "39135",
    "vocab_len": "1855",
    "name": "Backstreet Boys",
    "sales": "70.9"
}, {
    "total_nr_songs": "332",
    "total_words": "27629",
    "vocab_len": "1850",
    "name": "Fleetwood Mac",
    "sales": "73.7"
}, {
    "total_nr_songs": "247",
    "total_words": "31022",
    "vocab_len": "1848",
    "name": "Phil Collins",
    "sales": "85.5"
}, {
    "total_nr_songs": "143",
    "total_words": "21265",
    "vocab_len": "1835",
    "name": "Nirvana",
    "sales": "43.9"
}, {
    "total_nr_songs": "86",
    "total_words": "27619",
    "vocab_len": "1802",
    "name": "New Kids on the Block",
    "sales": "30.2"
}, {
    "total_nr_songs": "101",
    "total_words": "22823",
    "vocab_len": "1801",
    "name": "Shania Twain",
    "sales": "72.6"
}, {
    "total_nr_songs": "283",
    "total_words": "17821",
    "vocab_len": "1794",
    "name": "The Who",
    "sales": "25.3"
}, {
    "total_nr_songs": "184",
    "total_words": "15531",
    "vocab_len": "1788",
    // "name": "AC/DC",
    "name": "ACDC",
    "sales": "111.5"
}, {
    "total_nr_songs": "250",
    "total_words": "23277",
    "vocab_len": "1731",
    "name": "Barry White",
    "sales": "21.7"
}, {
    "total_nr_songs": "120",
    "total_words": "29610",
    "vocab_len": "1723",
    "name": "Foreigner",
    "sales": "49.1"
}, {
    "total_nr_songs": "70",
    "total_words": "15354",
    "vocab_len": "1712",
    "name": "The Police",
    "sales": "38.2"
}, {
    "total_nr_songs": "167",
    "total_words": "32746",
    "vocab_len": "1699",
    "name": "Lionel Richie",
    "sales": "40"
}, {
    "total_nr_songs": "18",
    "total_words": "7543",
    "vocab_len": "1639",
    "name": "Tupac Shakur",
    "sales": "46.2"
}, {
    "total_nr_songs": "55",
    "total_words": "24949",
    "vocab_len": "1497",
    "name": "Spice Girls",
    "sales": "41.1"
}, {
    "total_nr_songs": "56",
    "total_words": "18621",
    "vocab_len": "1489",
    "name": "Bruno Mars",
    "sales": "72.1"
}, {
    "total_nr_songs": "32",
    "total_words": "4061",
    "vocab_len": "832",
    "name": "The Carpenters",
    "sales": "45.9"
}, {
    "total_nr_songs": "89",
    "total_words": "4941",
    "vocab_len": "826",
    "name": "Tom Petty",
    "sales": "34.4"
}, {
    "total_nr_songs": "232",
    "total_words": "5016",
    "vocab_len": "809",
    "name": "Kenny G",
    "sales": "52"
}, 
// {
//     "total_nr_songs": "285",
//     "total_words": "3018",
//     "vocab_len": "704",
//     "name": "Chicago",
//     "sales": "48.1"
// }, {
//     "total_nr_songs": "232",
//     "total_words": "372",
//     "vocab_len": "148",
//     "name": "The Doors",
//     "sales": "46.6"
// }, {
//     "total_nr_songs": "339",
//     "total_words": "0",
//     "vocab_len": "0",
//     "name": "Bruce Springsteen",
//     "sales": "98.6"
// }, {
//     "total_nr_songs": "180",
//     "total_words": "0",
//     "vocab_len": "0",
//     "name": "Def Leppard",
//     "sales": "41.4"
// }, {
//     "total_nr_songs": "371",
//     "total_words": "0",
//     "vocab_len": "0",
//     "name": "The Beach Boys",
//     "sales": "29.7"
// }, {
//     "total_nr_songs": "178",
//     "total_words": "0",
//     "vocab_len": "0",
//     "name": "Journey",
//     "sales": "60.8"
// }
];

    var average = {
        "name": "Average",
        "sales": "",
        "total_nr_songs": "238.5656565657",
        "total_words": "29610.1515151515",
        "vocab_len": "2445.2727272727"
    };

    // Add x and y position data to each one of them
    var x_offset = $('#plot').width() / 2 - 17.5;

    // Let us do something brute force here 
    testData.forEach(function(data) { 
        data.x = x_offset;
        data.y = 0;
        console.log(data);
    });

    // TODO : Dynamically divide the plot into equal fragments based on the lower and upper value of 
    // data, like 0 - 1000, 1000 - 2000, 2000 - 3000 and so on
    // Style those section by adding elements 

	var plot = VocabPlot.newPlot('plot', testData);


})();