
var characters = [
    "Homer Simpson",
    "Mr. Burns",
    "Lenny Leonard",
    "Hans Moleman",
    "Groundskeeper Willie"
];

// Function for dumping the JSON content for each button into the div
function displayCharacterInfo() {

    var character = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=5Us7ju1l97BnxwDanvMIv5H6qkmBRz65&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //        $("#characters-view").text(JSON.stringify(response));
        $('#characters-view').html(`
        <p>Rating: ${response.rating}</p>
        <p>Title ${response.title}</p>
        <img src="${response.images.fixed_width}" />
        `);
        renderButtons();

        //create a variable and store the original url property from the returned object
        //      var imageUrl = response.data.url;
        //
        //      $('#characters-view').html(`
        //      <p>Rating: ${response.rating}</p>
        //      <p>Title ${response.title}</p>
        //      <img src="${response.images.fixed_width}" />
        //    `);


        //prepend jquery images to DOM
        //     $("#images").prepend(simpsonsImage);

    });
}

// Function for displaying movie data
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < characters.length; i++) {

        // Then dynamically generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("character");
        // Adding a data-attribute
        a.attr("data-name", characters[i]);
        // Providing the initial button text
        a.text(characters[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add button is clicked
$("#add-character").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var userCharacter = $("#character-input").val().trim();

    // Adding the character from the textbox to our array
    characters.push(userCharacter);
    console.log(characters);

    // Calling renderButtons which handles the processing of our Simpsons array
    renderButtons();
    $("#character-form").trigger('reset');
});

// Function for displaying the info
// Using $(document).on instead of $(".character").on to add event listeners to dynamically generated elements
$(document).on("click", ".character", displayCharacterInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();

// Function for dumping the JSON content for each button into the div
function displayCharacterInfo() {

    var character = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=5Us7ju1l97BnxwDanvMIv5H6qkmBRz65";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#characters-view").text(JSON.stringify(response));
        renderButtons();

        //create a variable and store the original url property from the returned object
        //      var imageUrl = response.data.url;
        //
        //      $('#characters-view').html(`
        //      <p>Rating: ${response.rating}</p>
        //      <p>Title ${response.title}</p>
        //      <img src="${response.images.fixed_width}" />
        //    `);


        //prepend jquery images to DOM
        //     $("#images").prepend(simpsonsImage);

    });
}