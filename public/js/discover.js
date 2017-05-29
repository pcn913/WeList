var listId = "";
var hString = "";
var cardName = "";
var cardImg = "";
var listAuthor = "";
var listSrc = "";
var footer = ""

$.get("/api/cards", function(listdata) {

  for (var i = 0; i < listdata.length; i++) {

    itemString = '<img src="' + listdata[i].list_photo + '" width="100%">';
    itemString += '<p>' + listdata[i].description + '</p>';
    listId = listdata[i].list_id;

    appendCard(listId, listdata[i].title, itemString);

  } // end for each lists

  makeBinding();

}); // end cards get 

function makeBinding () {
$(".myList").click(function(){

  hString = "";
  cardName = "";
  cardImg = "";
  listAuthor = "";
  listSrc = "";

  listId = $(this).attr("id");

  console.log("\nlist_id: " + listId);

  $.get("/api/list/" + listId, function(carddata) {

        cardName = carddata[0].title;
        cardImg = carddata[0].list_photo; 
        listAuthor = carddata[0].userid;
        listSrc = carddata[0].source_url;

        console.log("list_id: " + listId);

      }).then($.get("/api/lists/" + listId, function(itemdata) {

        hString = '<ol>';      
    
        for (var i = 0; i < itemdata.length; i++) {

          hString += '<li>' + itemdata[i].item;

          } // end for each list_item

        hString += '</ol>';

        console.log("list_id: " + listId);

        footer = 'Created by: &nbsp; <a href="' + listSrc + '" target="_blank"> ' + listAuthor + '</a> &nbsp; <button type="button" id="reset" class="btn btn-default" data-dismiss="modal">Close</button>';

      }).then(function(itemdata) {

        $("#listName").text(cardName);
        $("#listImg").attr('src', cardImg);
        $("#listItems").html(hString);
        $("#cardFooter").html(footer);
        // Show the list modal
        $("#listModal").modal('toggle');

      })); // end chained ajax calls

  });   // end click event 
} // end function makeBinding
 


function appendCard(list_id, title, content) {

    console.log("in appendCard");

    var h = '<div class="card myList" id="' + listId + '">';
    h += '<div class="card-header">' + title + '</div>';
    h += '<div class="card-block">'
    h += '<div class="card-text">';
    h += '<div class="panel-body">';
    h += content;
    h += '</div>';
    h += '</div>';
    h += '</div>';
    $("#lists").append(h);
            
} // end function appendCard

$(".item").click(function(){

      $("#lists").html("");

    console.log($(this).attr("id"));

  $.get("/api/discover/" + $(this).attr("id"), function(listdata) {

    for (var i = 0; i < listdata.length; i++) {

      itemString = '<img src="' + listdata[i].list_photo + '" width="100%">';
      itemString += '<p>' + listdata[i].description + '</p>';
      listId = listdata[i].list_id;

      appendCard(listId, listdata[i].title, itemString);

    } // end for each lists

    makeBinding();

  });
}); // end .item click function
