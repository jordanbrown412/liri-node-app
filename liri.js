var fs = require("fs");
var Twitter = require('twitter');
var keys = require("./keys.js");
var spotify = require('spotify');
var request = require('request')
var action = process.argv[2];
var value = process.argv.slice(3);
var nodeArgs = process.argv;
var movieName = "";


switch (action) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    music();
    break;

  case "movie-this":
    omdb();
    break;

  case "do-what-it-says":
    lotto();
    break;
}


function tweet(){
var client = new Twitter(keys.twitterKeys);
 
var params = {DaWoodsFinest88: 'nodejs',
			count: '1'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
  }
});
};


function music(){
  
	spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        
    }else {
    		console.log(data.tracks.items[0].album.name);
    		console.log(data.tracks.items[0].artists[0].name);
    		console.log(data.tracks.items[0].preview_url);
    		console.log(data.tracks.items[0].name);
    }
	});
	};

function omdb(){
  var nodeArgs = process.argv;
  var movieName = "";
  for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName += "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    var movieObj = JSON.parse(body);
    // console.log(JSON.parse(body));
    console.log(movieObj);
    console.log(movieObj.Title);
    console.log(movieObj.Year);
    console.log(movieObj.imdbRating);
    console.log(movieObj.Country);
    console.log(movieObj.Plot);
    console.log(movieObj.Actors);
    console.log(movieObj.Ratings[1].Value);
    console.log(movieObj.Ratings[1].Source);
    // console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
};

