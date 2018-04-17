//All Require lines
//Request
var request = require("request");
//Dotenv
var dotenv = require("dotenv").config();
//Spotify api
var Spotify = require('node-spotify-api');
//Twitter
var Twitter = require('twitter');
//Keys
var key = require('./key.js');
//Read
var fs = require("fs");

//assign keys to variables
var spotify = new Spotify(key.spotify);
var client = new Twitter(key.twitter);

//Takes in command line arg
var inputString = process.argv;
//Takes input and assings it to variable
var input = inputString [2];
var param = inputString [3];


//Spotify
if(input === "spotify-this-song"){
  if(param === undefined){
    spotify
    .search({ type: 'track', query: "The Sign Ace Of Base", limit: 1 })
    .then(function(response) {
      console.log("Artist:"+JSON.stringify(response.tracks.items[0].album.artists[0].name),
      "\nSong name:"+ JSON.stringify(response.tracks.items[0].name), 
      "\nLink of song from Spotify: "+ JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify),
      "\nName of album: " + JSON.stringify(response.tracks.items[0].album.name));
    })
    .catch(function(err) {
      console.log(err);
    })
  }
  else{
  //Artist(s)The song's name A preview link of the song from Spotify The album that the song is from
  spotify
  .search({ type: 'track', query: param, limit: 1 })
  .then(function(response) {
    console.log("Artist:"+JSON.stringify(response.tracks.items[0].album.artists[0].name),
    "\nSong name:"+ JSON.stringify(response.tracks.items[0].name), 
    "\nLink of song from Spotify: "+ JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify),
    "\nName of album: " + JSON.stringify(response.tracks.items[0].album.name));
  })
  .catch(function(err) {
    console.log(err);
  })
}
};
//Twitter
if(input === "my-tweets"){
  //show last 20 tweets and when created
  var profile = {screen_name: '@toneygunk1'};
  client.get('statuses/home_timeline', profile, function(error, tweet, response) {
  if (!error) {
    console.log("Only 6 Tweets were found","\nTweet:" + JSON.stringify(tweet[0].text), "Created On: " + JSON.stringify(tweet[0].created_at),
      "\nTweet:" + JSON.stringify(tweet[1].text), "Created On: " + JSON.stringify(tweet[1].created_at),
        "\nTweet:" + JSON.stringify(tweet[2].text), "Created On: " + JSON.stringify(tweet[2].created_at),
        "\nTweet:" + JSON.stringify(tweet[3].text), "Created On: " + JSON.stringify(tweet[3].created_at),
          "\nTweet:" + JSON.stringify(tweet[4].text), "Created On: " + JSON.stringify(tweet[4].created_at),
          "\nTweet:" + JSON.stringify(tweet[5].text), "Created On: " + JSON.stringify(tweet[5].created_at));
  }
})
};
//OMDB
if(input === "movie-this"){
//Show Mr. Nobdy if no movie listed
  if(param === undefined){
  var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Release Year: " + JSON.parse(body).Year, "\nTitle: " + JSON.parse(body).Title, "\nimdb rating: " + JSON.parse(body).imdbRating,
      "\nCountry where produced: "+ JSON.parse(body).Country, "\nLanguage of the movie: "+ JSON.parse(body).Language,
      "\nPlot of the movie: "+ JSON.parse(body).Plot, "\nActors in the movie: "+ JSON.parse(body).Actors);
    }
  })
  }
  //If Movie is listed show movie
  else{
  var queryUrl = "http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Release Year: " + JSON.parse(body).Year, "\nTitle: " + JSON.parse(body).Title, "\nimdb rating: " + JSON.parse(body).imdbRating,
      "\nCountry where produced: "+ JSON.parse(body).Country, "\nLanguage of the movie: "+ JSON.parse(body).Language,
      "\nPlot of the movie: "+ JSON.parse(body).Plot, "\nActors in the movie: "+ JSON.parse(body).Actors);
    }
  })
}
};
//Read text file 
if(input === 'do-what-it-says'){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    spotify
  .search({ type: 'track', query: dataArr[1], limit: 1 })
  .then(function(response) {
    console.log("Artist:"+JSON.stringify(response.tracks.items[0].album.artists[0].name),
    "\nSong name:"+ JSON.stringify(response.tracks.items[0].name), 
    "\nLink of song from Spotify: "+ JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify),
    "\nName of album: " + JSON.stringify(response.tracks.items[0].album.name));
  })
  .catch(function(err) {
    console.log(err);
  })
  });
};



