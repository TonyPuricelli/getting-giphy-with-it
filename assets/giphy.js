$(document).ready(function() {

// array of shows to display on page
var listOfShows = ['Game of Thrones', 'Jessica Jones', '30 Rock', 'Big Little Lies', 'Breaking Bad', 'The Good Place', 'Insecure', 'Black Mirror', 'Doctor Who'];

// Giphy API key
var apiKey = "a7VISrPf1lDMroEKfB1qFBrBPmTOtrDM";

// create buttons on page load
renderButtons();

//trigger AJAX call on button clicks
$(".showBtn").on("click", function() {
    showMeGIFs();
});

// add button on user submission
$("#submit").on("click", function(event) {
    event.preventDefault();

    if ($("#submitBox")) {
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
        newBtn.addClass("showBtn");
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
        // add code here
      });
};

}); // closes document ready function