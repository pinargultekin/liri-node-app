require("dotenv").config();

var fs = require("fs");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
moment().format();

var userCommand = process.argv[2];
var userInput = function () {
    var name = [];
    for (var i = 3; i < process.argv.length; i++) {
        name.push(process.argv[i]);
    }
    return name.join(" ");
}

switch (userCommand) {
    case "concert-this":
        concertThis(userInput);
        break;
    case "spotify-this-song":
        spotifyThisSong(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays(userInput);
        break;
}
