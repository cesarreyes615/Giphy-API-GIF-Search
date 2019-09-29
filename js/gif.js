var searchBarInput;
var searchBarText;
var giphyTrending = $.get(
  "https://api.giphy.com/v1/gifs/trending?api_key=K6njTdQT89YOSYh0hr7AoZZAlaMYw61M&limit=5"
);
giphyTrending.done(function(response) {
  console.log("success got data", response);
  var gifs = response.data;

  var i;
  var displayGifs = document.querySelector(".trending-gifs");
  for (i = 0; i < gifs.length; i++) {
    var url = gifs[i].images.fixed_height.url;
    displayGifs.innerHTML += `<img src = '${url}'/>`;
  }
});

document.getElementById("search").addEventListener("click", function(e) {
  searchBarInput = document.getElementById("search-gifs");
  searchBarText = searchBarInput.elements[0].value;
  searchBarText = searchBarText.trim();
  var giphySearch = $.get(
    `https://api.giphy.com/v1/gifs/search?api_key=K6njTdQT89YOSYh0hr7AoZZAlaMYw61M&q=${searchBarText}&limit=10&rating=g`
  );
  giphySearch.done(function(response) {
    console.log("success got data", response);
    var giphySearchedData = response.data;
    var searchedGifsContainer = document.querySelector(".searched-gifs");
    searchedGifsContainer.innerHTML = "";
    var i;
    for (i = 0; i < giphySearchedData.length; i++) {
      url = giphySearchedData[i].images.original.url;
      searchedGifsContainer.innerHTML += `<img src = '${url}'/>`;
    }
  });
  document.querySelector("#load-more").style.display = "inline";
  e.preventDefault();
});

document.getElementById("load-more").addEventListener("click", () => {
  var giphySearch = $.get(
    `https://api.giphy.com/v1/gifs/search?api_key=K6njTdQT89YOSYh0hr7AoZZAlaMYw61M&q=${searchBarText}&limit=15&offset=10&rating=g`
  );
  giphySearch.done(function(response) {
    console.log("success got data", response);
    var giphySearchedData = response.data;
    var searchedGifsContainer = document.querySelector(".searched-gifs");
    var i;
    for (i = 0; i < giphySearchedData.length; i++) {
      url = giphySearchedData[i].images.original.url;
      searchedGifsContainer.innerHTML += `<img src = '${url}'/>`;
    }
  });
  document.querySelector("#load-more").style.display = "none";
});
