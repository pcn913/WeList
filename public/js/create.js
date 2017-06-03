// global variable for displaying the user's lists
var listId = "";
var hString = "";
var mString = "";
var personalCats = [];
var cardName = "";
var cardImg = "";
var listAuthor = "";
var listSrc = "";
var footer = "";
var num = 0;
var listdata = [];
var userId = "Kim";

// global variables used for the code that creates a list
var x = 0;
var resultObj = {};
var newList = {};
var lastListId = 0;
var currListId = 0;
var currItemNum = 0;
var currItems = [];
var currName = "";
var currImg = "";
var currCat = "Other";
var currDesc = " ";
var currType = "number";


// find the largest list_id used so far
// we'll use this later when creating the card
$.get("/api/maxid", function(listdata) {

    lastListId = listdata;
    console.log("last list_id: " + lastListId);
    currListId = lastListId + 1;

}); // end maxid get 

// get all of the lists for the current user
$.get("/api/userlists/" + userId, function(listdata) {

  for (var i = 0; i < listdata.length; i++) {

    itemString = '<img src="' + listdata[i].list_photo + '" width="100%">';
    itemString += '<p>' + listdata[i].description + '</p>';
    listId = listdata[i].list_id;

    appendCard(listId, listdata[i].title, itemString);

  } // end for each lists

  makeBinding();

  // now let's build the category button bar 
  // with the categories that relate to the current user
  for (var i = 0; i < listdata.length; i++) {

    // if this category isn't already pushed
    if (personalCats.indexOf(listdata[i].category) === -1) { 

      if (listdata[i].category.length) {

          personalCats.push(listdata[i].category);

       } // end if the category field isn't empty   

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
  } // end if


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


// this sets the click bindings on each displayed list, when it is created
// and it populates and displays the modal when a list is clicked
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
 

// append a card to the screen
// the app uses bootstrap's card columns to arrange the layout
function appendCard(list_id, title, content) {


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


// this code executes when the Continue button is clicked
// it collects the data needed to create a list entry in the Lists table
$("#continue").on("click", function(){

  currName = $("#createName").val();
  currImg = $("#createPhoto").val();

  if ($("#createCat").val().length > 1) {

      currCat = $("#createCat").val();
  }
  
  currDesc = $("#createDesc").val();

  // put the list name and image url into the list items view modal
  $("#itemsName").text(currName);
  $("#itemsImg").attr('src', currImg);


   $("#createModal").modal('toggle');
   $("#itemsModal").modal('toggle');

   $('body').on('keypress', 'input', function(args) {
    if (args.keyCode == 13) {
        $("#add").click();
        return false;
    }
  });

  // make a newList obj containing all of the data needed to create
  // an entry in the Lists table
  newList = {
    userid: userId,
    list_id: currListId,
    list_type: currType,
    title: currName,
    list_photo: currImg,
    category: currCat,
    description: currDesc
  };

    // save the newList to the db, using a conventional ajax post
    // sending the newList object to the route 
    $.post("/api/createlist", newList)
      // on success, run this callback
      .done(function(data) {
      // log the data we found
      console.log(data);
    });


}); // end continue on click function


// this code executes when the Add button is clicked
// it collects the data needed to create each list item corresponding to the list being created
$("#add").on("click", function(){

  currItemNum++;

  // if this is not the first list item
  if ($("#modalItems").length > 0) {

    // change the html to say 'Next Item:'
    $("#first-next").html('Next Item:');

  } // end if

  var nextItem = $("#itemEntry").val();

  $("#modalItems").append('<li>' + nextItem + '</li><br>');
  $("#itemEntry").val("");

// set up list items object for this list item, with the data from the form
// pushing the data for one item to the currItems array, which holds
// all the items for this list
    currItems.push({

      list_id: currListId,
      item: nextItem,
      item_number: currItemNum

    }); // end items push

}); // end add on click function

$("#save").on("click", function(){


    // convert the currItems array into a js object of objects
    // this will be sent to the route for creating multiple list items at once
    Object.keys(currItems).forEach(function(key) {
    resultObj[key] = currItems[key];
    });
 
    // save all of the items for this list to the db
    // by sending them to the route as a single object
    $.post("/api/createitems", resultObj)
      // on success, run this callback
      .done(function(data) {
      // log the data we found
      console.log(data);
    });
 
 
  // empty each input box by replacing the value with an empty string
  $("#createName").val("");
  $("#createPhoto").val("");
  $("#createCat").val("");
  $("#createDesc").val("");
  $("#modalItems").val("");

  window.location.href = "mylists.html";

}); // end save on click function

// if the create process is canceled, return to the mylists.html page
$(".cancel").on("click", function(){

    window.location.href = "mylists.html";

});

// $('#createModal').on('hidden.bs.modal', function () {

//       window.location.href = "mylists.html";

// })

// open the create modal automatically on page load
$("#createModal").modal('toggle');


