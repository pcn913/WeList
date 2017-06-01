var listId = "";
var hString = "";
var mString = "";
var personalCats = [];
var itemIds = [];
var cardName = "";
var cardImg = "";
var listAuthor = "";
var listSrc = "";
var footer = "";
var num = 0;
var listdata = [];
var userid = "Kim";


$.get("/api/userlists/" + userid, function(listdata) {

  // if this isn't your first list
  if (listdata.length > 0) {

        $("#lists").html("");
        
  } // end if


  for (var i = 0; i < listdata.length; i++) {

    itemString = '<img src="' + listdata[i].list_photo + '" width="100%">';
    itemString += '<p>' + listdata[i].description + '</p>';
    listId = listdata[i].list_id;

    appendCard(listId, listdata[i].title, itemString);

  } // end for each lists

  makeBinding();

  // now let's build the category button bar
  for (var i = 0; i < listdata.length; i++) {

    // if this category isn't already pushed
    if (personalCats.indexOf(listdata[i].category) === -1) { 

      personalCats.push(listdata[i].category);

    } // end if this category isn't already pushed

  } // end for each of the user's lists

 
  mString = '<li class="item num2" id="All">All My Lists</li>';
  // for each personal category
  for (var i = 0; i < personalCats.length; i++) {

      num = i + 1;
      if (num > 7) {

        num = num % 7;

      } // set button color via num correspondance in css

      mString += '<li class="item num' +  num + '" id="' + personalCats[i] + '">' + personalCats[i] + '</li>';

  } // end for each personal category


  // put the category menu entries into the ul
  $(".menu").html(mString);

   // if there are too few menu items to span the screen, then adjust the css
  var itemsLength = $('.item').length;
  var itemSize = $('.item').outerWidth(true);
  var menuSize =  itemsLength * itemSize;
 
 
  if (menuSize < $('.menu-wrapper').outerWidth()) {
      $("#wrapper").css("width", menuSize + 'px');
      $(".paddle").css("visibility", "hidden");
  }



  // set the click binding for the category menu entries
  $(".item").click(function(){

    $("#lists").html("");

      for (var i = 0; i < listdata.length; i++) {

      if ($(this).attr("id") === "All") {

        itemString = '<img src="' + listdata[i].list_photo + '" width="100%">';
        itemString += '<p>' + listdata[i].description + '</p>';
        listId = listdata[i].list_id;

        appendCard(listId, listdata[i].title, itemString);

    } else {

      if (listdata[i].category === $(this).attr("id")) {

        itemString = '<img src="' + listdata[i].list_photo + '" width="100%">';
        itemString += '<p>' + listdata[i].description + '</p>';
        listId = listdata[i].list_id;

        appendCard(listId, listdata[i].title, itemString);

      } // if this list in the selected categotry

    } // end else

    } // end for each lists

      makeBinding();

  }); // end .item click function


}); // end cards get 


function makeBinding () {
$(".myList").click(function(){

  hString = "";
  cardName = "";
  cardImg = "";
  listAuthor = "";
  listSrc = "";

  listId = $(this).attr("id");


  $.get("/api/list/" + listId, function(carddata) {

        cardName = carddata[0].title;
        cardImg = carddata[0].list_photo; 
        listAuthor = carddata[0].userid;
        listSrc = carddata[0].source_url;


      }).then($.get("/api/lists/" + listId, function(itemdata) {

        hString = '<ol>';      
    
        for (var i = 0; i < itemdata.length; i++) {

          hString += '<li>' + itemdata[i].item;

          } // end for each list_item

        hString += '</ol>';

        footer = 'Created by: &nbsp; <a href="' + listSrc + '" target="_blank"> ' + listAuthor + '</a> &nbsp; <button type="button" id="deleter" class="btn btn-default" data-dismiss="modal">Delete List</button>';

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

    //console.log("in appendCard");

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

$("#firstList").on("click", function(){

    window.location.href = "create.html";

});

$("#deleter").on("click", function(){

  console.log(listId + " selected");

      var badList = $("#deleterName").val();

        $.get("/api/deletelist/" + badList, function(listdata) {

        });

        $("#listModal").modal('toggle');

        alert("List " + badList + " deleted");
        window.location.href = "mylists.html";

        $.get("/api/lists/" + listId, function(itemdata) {

          for (var i = 0; i < itemdata.length; i++) {

              itemIds.push(itemdata[i].id);

          } // end for each list_item
            console.log(itemIds);

          for (x = 0; x < itemIds.length; x++) {
           
          $.get("/api/deletelistitem/" + itemIds[x], function(listdata) {
            
           
          });
        } // end for loop  
      });  

}); // end function deletelist

$("#cancel").on("click", function(){

    window.location.href = "mylists.html";

});


$("#editModal").modal('toggle');
   





