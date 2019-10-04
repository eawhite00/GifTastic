# GifTastic
This is an assignment to prove I can connect to an API -  specifically Giphy! I lightly themed mine based off of reaction gifs, because tha'ts most of what I use giphy for in my real life and I kinda just wanted to get to coding. ¯\_(ツ)_/¯)

# Notes on my implementation
This assignment is all about API calls and button handlers. I liberally added classes to the new elements I generated so that I could style them / set up global click events to handle them. I specifically broke my API key into different pieces - the delcaration of a search query, the api key, the topic to be searched for, and the number of gifs to return. I didn't wind up expanding on this, but setting it up this way would make it easy to revise the query to search more specifically or for a different number of gifs or what you will.

# Areas for improvement

My styling here was pretty barebones because I wanted to focus on getting all of my funcionality together. I think the first thing I'd do to imrove the assignment is to move away from the default bootstraps style and set up something a little more aesthetically appealing.

The next thing I'd do is put in a field to toggle how many gifs to return, and modify the query to take that number instead of just always returning 10.

There was a suggesting in the instructions that you could give the user the option to 'save' favorite gifs after each search, and I think that'd be interesting to implement- generating a 'fave' button along with each gif, and setiting up a new HTML element to hold all of the data for gifs that have been favorited.