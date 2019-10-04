

var topics = ["Really?", "Oh no", "Why?", "help me", "awwww", "Please stop"];

const queryStart ="https://api.giphy.com/v1/gifs/search?q=";
const key = "&api_key=H13eBYJpEFJTsmDsRoVtn5p1HkYVXcP9";


function displayButtons(){
    $("#buttonBox").empty();

    for (i = 0; i < topics.length; i++){
        var newButton = $("<button>")


        newButton.attr("type", "button");
        newButton.addClass("topic btn btn-dark");
        newButton.attr("topic-data", topics[i]);
        newButton.text(topics[i]);

        $("#buttonBox").append(newButton);
    }

}   

$("#newTopicButton").on("click", function(event){
    event.preventDefault();

    var newTopic = $("#userText").val().trim();

    topics.push(newTopic);

    displayButtons();

});

function displayGifs(){
    console.log("click");   
    var searchTerm = $(this).attr("topic-data");
    var queryURL = queryStart + searchTerm + key + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){
        var results = response.data;

        $("#imageBox").empty();

        for (i = 0; i < results.length; i++){

            var gifDiv = $("<div>");
            var rating = results[i].rating;

            var ratingText = $("<p>").text("Rating: " + rating);

            var newImage = $("<img>");
            newImage.attr("image-still", results[i].images.fixed_height_still.url);
            newImage.attr("image-moving", results[i].images.fixed_height.url);
            newImage.attr("image-state", "still");
            newImage.attr("src", results[i].images.fixed_height_still.url);
            newImage.addClass("gif");

            gifDiv.prepend(ratingText);
            gifDiv.prepend(newImage);

            $("#imageBox").prepend(gifDiv);

        }

    });

}

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


$(document).on("click", ".topic", displayGifs);


$(document).on("click", ".gif", toggleMovement);


displayButtons();