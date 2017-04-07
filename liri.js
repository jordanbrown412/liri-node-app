var fs = require("fs");
var Twitter = require('twitter');
var keys = require("./keys.js");
var spotify = require('spotify');
var request = require('request')
var action = process.argv[2];
var value = process.argv.slice(3);
var nodeArgs = process.argv;
var movieName = "";

// Switch case Statement to run our commands
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
                  random();
                  break;
                }

// Tweet function that displays our last 20 min
function tweet(){
                      

                      var client = new Twitter(keys.twitterKeys);
                      

                      // Parameter that show number of tweets to display
                      var params = {DaWoodsFinest88: 'nodejs',
          			                   count: '20'};


        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            
                      if (!error) {
                          // console.log(tweets);
                        for (var i = 0; i < tweets.length; i++) {
                         console.log("Tweet " + [i+1] + ": " + tweets[i].text); 
                        
                        }
                                       
                        }
             
              });
              };


function music(){
  
	     spotify.search({ type: 'track', query: value }, function(err, data) {
                
                         if ( err ) {
                            
                            console.log('Error occurred: ' + err);
                            
                        }else {
    		

                console.log("Album Name: " + data.tracks.items[0].album.name);
            		console.log("Artist: " + data.tracks.items[0].artists[0].name);
            		console.log("Preview URL: " + data.tracks.items[0].preview_url);
            		console.log("Track Name: " + data.tracks.items[0].name);

                var musicArr = ["Album Name: " + data.tracks.items[0].album.name + "\n", "Artist: " + data.tracks.items[0].artists[0].name + "\n", "Preview URL: " + data.tracks.items[0].preview_url + "\n", "Track Name: " + data.tracks.items[0].name + "\n"];
                     
                        }
    

          fs.appendFile("log.txt", musicArr.join(""), function(err) {

                        // If an error was experienced we say it.
                        if (err) {
                        console.log(err);
                         }
                    

              });
              });
              };

function omdb(){
                              var nodeArgs = process.argv;

                              var movieName = "";
                              
            // for loop that gives that creates variable that stores user search input for movie with muliple words
                              
                              for (var i = 3; i < nodeArgs.length; i++) {

                              if (i > 3 && i < nodeArgs.length) {

                                movieName += "+" + nodeArgs[i];
                              
                              }else {

                                movieName += nodeArgs[i];

                              }
                              }

	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
                              if (!error && response.statusCode === 200) {

                               
                                var movieObj = JSON.parse(body);
                                
                               
                                console.log("Movie Title: " + movieObj.Title);
                                console.log("Release Year: " + movieObj.Year);
                                console.log("imdb Rating: " + movieObj.imdbRating);
                                console.log("Country: " + movieObj.Country);
                                console.log("Plot: " + movieObj.Plot);
                                console.log("Actors: " + movieObj.Actors);
                                console.log("Rotten Tomato Rating: " + movieObj.Ratings[1].Source);


    var movieArr =["Movie Title: " + movieObj.Title + "\n", "Release Year: " + movieObj.Year + "\n", "imdb Rating: " + movieObj.imdbRating + "\n", "Country: " + movieObj.Country + "\n", "Plot: " + movieObj.Plot + "\n", "Actors: " + movieObj.Actors + "\n", "Rotten Tomato Rating: " + movieObj.Ratings[1].Source + "\n"];

                                  }


               fs.appendFile("log.txt", movieArr.join(""), function(err) {

  // If an error was experienced we say it.
                                if (err) {
                                console.log(err);
                                 }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                                else {
                                  console.log("Content Added!");
                                }
                });
                });
                };

function random(){
  if (process.argv[2] === "do-what-it-says") {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
    var splitData = data.split(",");
    // console.log(splitData); // Check to see what's split. 
    var inputOne = splitData[0];
    var search = splitData[1];
    if (inputOne === "spotify-this-song") {
        

        spotify.search({ type: 'track', query: search }, function(err, data) {
                
                         if ( err ) {
                            
                            console.log('Error occurred: ' + err);
                            
                        }else {
        

                console.log("Album Name: " + data.tracks.items[0].album.name);
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log("Track Name: " + data.tracks.items[0].name);

                var musicArr2 = ["Album Name: " + data.tracks.items[0].album.name + "\n", "Artist: " + data.tracks.items[0].artists[0].name + "\n", "Preview URL: " + data.tracks.items[0].preview_url + "\n", "Track Name: " + data.tracks.items[0].name + "\n"];
                     
                        }
    

          fs.appendFile("log.txt", musicArr2.join(""), function(err) {

                        // If an error was experienced we say it.
                        if (err) {
                        console.log(err);
                         }
                    

              });
              });
              
    }
});
}
}
