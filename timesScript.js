
var searchInput = null
var searchSelect = null
var searchSYear = null
var searchEYear = null
var authKey = "PvPJbxb0P1623tBymBX2KRlk4T8GS7N3";
var queryURL = null


    
$("#searchInput").keyup(function(){

if($("#searchInput").val()){
    $("#searchBtn").prop("disabled", false)
}else{
    $("#searchBtn").prop("disabled", true)
}})

$("#searchBtn").on("click", function(e){
    e.preventDefault()
    searchInput = $("#searchInput").val();
    searchSelect = $("#mainSelect").val();
    searchSYear = $("#searchSYear").val();
    searchEYear = $("#searchEYear").val();

    if(searchSYear || searchEYear){
        if(searchSYear && !searchEYear){
            queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchInput + "&begin_date=" + searchSYear + "0101" 
        }else if(searchEYear && !searchSYear){
            queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchInput + "&end_date=" + searchEYear + "0101";
        }else{
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchInput + "&begin_date=" + searchSYear + "0101" + "&end_date=" + searchEYear + "0101";
        }
    }else{
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchInput
    }
    console.log(searchSelect)
    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(NYTData) {
          if(NYTData.response.docs.length === 0){
            $("#searchResult").prepend(`<div class="well text-center">This item does not exist</div>`)
          }
          for(var i = 0; i < parseInt(searchSelect); i++ ){
            console.log(NYTData.response.docs[i].headline)
            $("#searchResult").prepend(`<div class="well"><a target="_blank" href="${NYTData.response.docs[i].web_url}"><strong style="font-size: 20px">${NYTData.response.docs[i].headline.main}</strong></a><p>${NYTData.response.docs[i].lead_paragraph}</p></div>`)
          }
      })
    
    console.log(queryURL)
})

$("#ClearBtn").on("click", function(){
    $("#searchResult").html(null)
})

