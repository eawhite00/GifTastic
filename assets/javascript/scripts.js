// set up our variables / constants
var topics = ["Really?", "Oh no", "Why?", "help me", "awwww", "Please stop"];

const queryStart ="https://api.giphy.com/v1/gifs/search?q=";
const key = "&api_key=H13eBYJpEFJTsmDsRoVtn5p1HkYVXcP9";

//Here we make our buttons- one for each item in the 'topics' array
function displayButtons(){
    $("#buttonBox").empty();

    for (i = 0; i < topics.length; i++){
        //make the button
        var newButton = $("<button>")
    
        //give the button its necessary attributes and classes
        newButton.attr("type", "button");
        newButton.addClass("topic btn btn-dark");
        newButton.attr("topic-data", topics[i]);
        newButton.text(topics[i]);

        //add it to the box with the others
        $("#buttonBox").append(newButton);
    }

}   

//Here's where we handle clicking the button to add a new topic. 
$("#newTopicButton").on("click", function(event){
    event.preventDefault();

    //grab the user inputted text
    var newTopic = $("#userText").val().trim();

    //stick it into the array
    topics.push(newTopic);

    //rebuild our buttons based off of the new topic list
    displayButtons();

});

//Here's our function for calling Giphy and display our gifts
function displayGifs(){

    //grab our search term out of the button's data
    var searchTerm = $(this).attr("topic-data");

    //update the title setion where we'll display our gifts
    $("#currentTopic").text("You searched for: " + searchTerm);

    //build our query URL with the topic
    var queryURL = queryStart + searchTerm + key + "&limit=10";

    //Here's our API call
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){
        var results = response.data;

        //clear out any existing gifs
        $("#imageBox").empty();

        //Loop through the responses
        for (i = 0; i < results.length; i++){

            //make the new container the gif and its rating to go in
            var gifDiv = $("<div>");

            //giving the container the result class for styling it easily
            gifDiv.addClass("result")

            //grab the rating out and set up its text in a new p
            var rating = results[i].rating;
            var ratingText = $("<p>").text("Rating: " + rating);

            //make the image and give it its various classes / attributes
            var newImage = $("<img>");
            newImage.attr("image-still", results[i].images.fixed_height_still.url);
            newImage.attr("image-moving", results[i].images.fixed_height.url);
            newImage.attr("image-state", "still");
            newImage.attr("src", results[i].images.fixed_height_still.url); //defaults to still
            newImage.addClass("gif");

            //add the image and text into its div
            gifDiv.prepend(newImage);
            gifDiv.prepend(ratingText);

            //add the whole div to the box of image divs
            $("#imageBox").prepend(gifDiv);

        }

    });

}

//If an image is still, set it to move. If it's moving, set it to still.
function toggleMovement(){
    var state = $(this).attr("image-state");

    if (state === "still")
    {
      $(this).attr("src", $(this).attr("image-moving"));
      $(this).attr("image-state", "animate");
    }else{
      $(this).attr("src", $(this).attr("image-still"));
      $(this).attr("image-state", "still");  
    }
}

//This handles clicking a topic button
$(document).on("click", ".topic", displayGifs);

//this handles clicking a gif to pause/unpause it.
$(document).on("click", ".gif", toggleMovement);

//initial call to set up buttons
displayButtons();