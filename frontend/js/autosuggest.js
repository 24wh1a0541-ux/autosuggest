
var API_URL="https://autosuggest-backend.onrender.com/api/autosuggest"

var searchbar=document.getElementById("search-bar");
var searchsuggestions=document.getElementById("search-suggestions");

//get user typed data
//use iser typed data in the query in the API call
//API call
//append to all the search suggestions to div tag in UI

searchbar.addEventListener("input",function(){
    var query=searchbar.value.trim();
    //console.log(query);
    fetchsuggestions(query);
});

function fetchsuggestions(query){
    var fullAPI=API_URL+ "?q=" +query + "&weighted=true&algorithm=trie&limit=8";
    fetch(fullAPI)
       .then(function(res){
        return res.json();
       })

       .then(function(data){
         showsuggestions(data);
         return;
       })

       .catch(function(err) {
            console.log("Error:", err);
        });
}

function showsuggestions(data){
    var values=data.results;
    if(data.count ===0){
        searchsuggestions.innerHTML= "<div>No matching results founds.</div>";
    }
    else{
        var htmlString = "";
        for(var i=0;i<values.length;i++){
            htmlString +=
    "<div>" +
    "<span class='suggestion-item'>" + values[i].text + "</span>" +
    "<span class='suggestion-data'>" + values[i].data + "</span>" +
    "</div>";
        }
        searchsuggestions.innerHTML=htmlString;
    }
}