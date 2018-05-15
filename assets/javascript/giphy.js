var topics = ["Homer Simpson", "Lenny Leonard", "Mr. Burns", "Hans Moleman", "Duff Man"];

// Function for displaying character data //
function renderButtons() {

    $("#topics").empty();

    for (var i = 0; i < topics.length; i++) {
        $("#topics").append('<button class="topic-buttons btn btn-primary">' + topics[i] + '</button>');
    }

}

// Add characters through text box function // 

$(document).on('click', '#addTopic', function (event) {

    event.preventDefault();

    var newTopic = $("#category").val().trim();
    topics.push(newTopic);

    $("#topics").append('<button class="topic-buttons btn btn-primary">' + newTopic + '</button>');

    //clear text box after button is clicked    
    $("#category").val("");

});

// Button function //

$(document).on('click', '.topic-buttons', function (event) {

    // Keeps page from reloading //
    event.preventDefault();

    var type = this.innerText;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + window.encodeURI(type) + "&limit=10&api_key=5Us7ju1l97BnxwDanvMIv5H6qkmBRz65";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var rating = $("<p>").text("Rating: " + response.data[i].rating);
            
            $("#photo").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
            $("#photo").append(rating);
        }
    });

    $("#photo").empty();

});

$('body').on('click', '.gif', function () {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //gif is moving, replace with still
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //still image is displayed, replace with moving gif
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});

renderButtons();
