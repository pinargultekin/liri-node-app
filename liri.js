require("dotenv").config();

var fs = require('fs');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

const axios = require('axios');

var moment = require('moment');
moment().format();

var cmd = process.argv[2];
var input = function () {
    var name = [];
    for (var i = 3; i < process.argv.length; i++) {
        name.push(process.argv[i]);
    }
    return name.join(" ");
}();

switch (cmd) {
    case "concert-this":
        concert(input);
        break;
    case "spotify-this-song":
        spotifyThis(input);
        break;
    case "movie-this":
        movie(input);
        break;
    case "do-what-it-says":
        doThis(input);
        break;
    default: console.log("\nPlease check your statement.");
};

//Functions


//Concert-this
function concert(input) {
    var url = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(url)
        .then(function (response) {

            var Data = response.data;
            var results;

            for (var i = 0; i < Data.length; i++) {

                var results = Data[i];

                console.log("\nResults for " + input + "\nVenue name: " + results.venue.name + "\nVenue location: " + results.venue.city + ", " + results.venue.region +" " +results.venue.country+ "\nEvent date: " + moment(results.datetime).format("MM-DD-YYYY") + "\n\n---------------------------\n");
                // results.push("\nResults for "+ input + "\nVenue name: " + results.venue.name + "\nVenue location: " + results.venue.city + ", " + results.venue.region + "\nEvent date: "+ moment(results.datetime).format("MM-DD-YYYY")+"\n\n---------------------------\n");
            }

            // fs.appendFile("log.txt", results.join(""), function(err, results){
            //     if (err) throw err;
            // })
        });
};


//Spotify-this-song
function spotifyThis(input) {
    var spotify = new Spotify(keys.spotify);

    if (input === "") {
        input = "runs the world (girls)";
        spotify.search({ type: 'track', query: input }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var Data = data.tracks.items;

            for (var i = 0; i < Data.length; i++) {
                var results = Data[i];
                console.log("\nRESULTS \nArtist name: " + results.artists[0].name + "\nSong name: " + results.name + "\nLink: " + results.preview_url + "\nAlbum: " + results.album.name + "\n\n---------------------------\n");
                // results.push(`-----Spotify Results-----\nArtist Name: ${Data[i].artists[0].name} \nSong: ${Data[i].name} \nAlbum: ${Data[i].album.name} \nSong Preview Link: ${Data[i].external_urls.spotify} \n--------------------------`);
            }

            // fs.appendFile("log.txt", results.join(''), function(err, results) {
            //    if (err) throw err;
            // })

        });
    } else {
        spotify.search({ type: 'track', query: input }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var Data = data.tracks.items;

            for (var i = 0; i < Data.length; i++) {

                var results = Data[i];
                console.log("\nRESULTS \nArtist name: " + results.artists[0].name + "\nSong name: " + results.name + "\nLink: " + results.preview_url + "\nAlbum: " + results.album.name + "\n\n---------------------------\n");
                //  results.push(`-----Spotify Results-----\nArtist Name: ${Data[i].artists[0].name} \nSong: ${Data[i].name} \nAlbum: ${Data[i].album.name} \nSong Preview Link: ${Data[i].external_urls.spotify} \n--------------------------`);
            }

            //  fs.appendFile("log.txt",results.join(""), function(err, Data) {
            //     if (err) throw err;

            // });

        });
    }
};


//Movie-this
function movie(input) {
    if (input === "") {

        var url = "http://www.omdbapi.com/?t=fight+club&apikey=18d5856f";

        axios.get(url).then(
            function (response) {
                var Data = response.data;

                console.log("\nTitle: " + Data.Title + "\nYear: " + Data.Year + "\nIMDB Rating: " + Data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + Data.Ratings[1].Value
                    + "\nCountry: " + Data.Country + "\nLanguage: " + Data.Language + "\nPlot: " + Data.Plot + "\nActors: " + Data.Actors + "\nAwards: " + Data.Awards + "\n\n---------------------------\n");

            });
    } else {
        var url = "http://www.omdbapi.com/?t=" + input + "&apikey=18d5856f";

        axios.get(url).then(
            function (response) {
                var Data = response.data;

                console.log("\nTitle: " + Data.Title + "\nYear: " + Data.Year + "\nIMDB Rating: " + Data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + Data.Ratings[1].Value
                    + "\nCountry: " + Data.Country + "\nLanguage: " + Data.Language + "\nPlot: " + Data.Plot + "\nActors: " + Data.Actors + "\nAwards: " + Data.Awards + "\n\n---------------------------\n");

            });
    }
};


//Do-what-it-says

function doThis(input) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        var Data = data.split(",")
        cmd = Data[0];
        input = Data[1].trim();
        spotifyThis(input);

    });
}

