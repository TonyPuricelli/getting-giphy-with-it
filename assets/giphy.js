$(document).ready(function() {

// array of shows to display on page
var listOfShows = ['Game of Thrones', 'Jessica Jones', '30 Rock', 'Big Little Lies', 'Breaking Bad', 'The Good Place', 'Insecure', 'Black Mirror', 'Doctor Who'];

// Giphy API key
var apiKey = "a7VISrPf1lDMroEKfB1qFBrBPmTOtrDM";

// create buttons on page load
renderButtons();

//trigger AJAX call on button clicks
$(".showBtn").on("click", function() {
    showMeGIFs($(this).attr("data-name"));
});

// add button on user submission
$("#submit").on("click", function(event) {
    event.preventDefault();

    if ($("#submitBox").val()) {
    // variable to store show from button
    var show = $("#submitBox").val().trim();
    console.log(show);

    // push to array and re-render buttons
    listOfShows.push(show);
    renderButtons();

    // call function to display GIF results of query
    showMeGIFs(show);

    };
});

function renderButtons() {
    // clear out existing buttons
    $("#buttons").empty();

    for (var i = 0; i < listOfShows.length; i++) {
        // create new buttons with common class and unique data type
        var newBtn = $("<button>");
        newBtn.addClass("showBtn btn btn-secondary");
        newBtn.attr("data-name", listOfShows[i]);
        newBtn.text(listOfShows[i]);
        // appends to buttons div
        $("#buttons").append(newBtn);
    };
};

function showMeGIFs(show) {
    // clear whatever is currently in display
    $("#display").empty();

    // queryURL for Giphy API -- adds in selected show
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=" + apiKey + "&limit=10";

    // AJAX call to display
    $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {
        console.log(response);

        // store results of ajax call
        var results = response.data;

        // loop through each item
        for (var i = 0; i < results.length; i++) {
            // creating image tag
            var newImage = $("<img>");

            // create variables for still and animated images
            var loopingImg = results[i].images.fixed_height.url;
            var stillImg = results[i].images.fixed_height_still.url;
            console.log(loopingImg);
            console.log(stillImg);

            // add still image as source and as an alt attribute
            newImage.attr("src", stillImg);
            newImage.attr("data-still", stillImg);

            // add video as alt for swap later
            newImage.attr("data-animate", loopingImg);

            // set data state for image
            newImage.attr("data-state", "still");

            // add common class to image tags
            newImage.addClass("gif");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // append rating to image
            newImage.append(p);

            // append img tag to display div
            $("#display").append(newImage);
        
        };  
      });

      // click event to pause or animate images
      $(document).on("click", ".gif", function(event) {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
      });
};

}); // closes document ready function