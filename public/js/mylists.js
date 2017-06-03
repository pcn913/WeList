var listId = "";
var hString = "";
var mString = "";
var personalCats = [];
var cardName = "";
var cardImg = "";
var listAuthor = "";
var listSrc = "";
var footer = "";
var preclickColor = "";
var preclickThis = "";
var clickedThis = "";
var num = 0;
var listdata = [];
var userid = "Kim";
//var searchQuery = "";
var preclickColor = "";
var preclickThis = "";
var clickedThis = "";
var itemText = "";
var edititemId = "";
var activeId = 0;
var itemClicked = "";


$.get("/api/userlists/" + userid, function(listdata) {

  // if this isn't your first list
  if (listdata.length > 0) {

        $("#lists").html("");
        
  } // end if


  for (var i = 0; i < listdata.length; i++) {

    cardImg = listdata[i].list_photo;

      if (cardImg) {

          console.log("image exists");

      } else {

        cardImg = "img/todo-nottodo.jpg";

  } // end if no list image provided

    itemString = '<img src="' + cardImg + '" width="100%">';
    itemString += '<p>' + listdata[i].description + '</p>';
    listId = listdata[i].list_id;

    appendCard(listId, listdata[i].title, itemString);

  } // end for each lists

  makeBinding();

  // now let's build the category button bar
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
  }



  // set the click binding for the category menu entries
  $(".item").click(function(){

    if (preclickThis) {

         $(preclickThis).css('background-color', preclickColor);

    }




    clickedThis = this;
    preclickThis = clickedThis;
    preclickColor = $(clickedThis).css('background-color');

    var clickedId = $(clickedThis).attr("id");
  
    $(clickedThis).css('background-color', '#d9534f');

    $("#lists").html("");

      for (var i = 0; i < listdata.length; i++) {

      cardImg = listdata[i].list_photo;

      if (cardImg) {

          console.log("image exists");

      } else {

        cardImg = "img/todo-nottodo.jpg";

      } // end if no list image provided


      if ($(this).attr("id") === "All") {

        itemString = '<img src="' + cardImg + '" width="100%">';
        itemString += '<p>' + listdata[i].description + '</p>';
        listId = listdata[i].list_id;

        appendCard(listId, listdata[i].title, itemString);

    } else {

      if (listdata[i].category === $(this).attr("id")) {

        itemString = '<img src="' + cardImg + '" width="100%">';
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

  console.log("list_id: " + listId);


  $.get("/api/list/" + listId, function(carddata) {

        cardName = carddata[0].title;
        cardImg = carddata[0].list_photo; 
        listAuthor = carddata[0].userid;
        listSrc = carddata[0].source_url;


      if (cardImg) {

          console.log("image exists");

       } else {cardImg = "img/todo-nottodo.jpg";

      } // end if no list image provided



      }).then($.get("/api/lists/" + listId, function(itemdata) {

        itemdata.sort(function(a, b) {
            return parseFloat(a.item_number) - parseFloat(b.item_number);
        });

        hString = '<ol>';      
    
        for (var i = 0; i < itemdata.length; i++) {

          hString += '<li class="l-item" id=' + itemdata[i].id + '>' + itemdata[i].item;

          } // end for each list_item

        hString += '</ol>';


        footer = ' Created by: &nbsp; <a href="' + listSrc + '" target="_blank"> ' + listAuthor + '</a> &nbsp; <button type="button" id="reset" class="btn btn-default" data-dismiss="modal">Close</button>';

      }).then(function(itemdata) {

        $("#listName").text(cardName);
        //$("#listName").attr('id', listId);
        $("#listImg").attr('src', cardImg);
        $("#listItems").html(hString);
        $("#cardFooter").html(footer);
        // Show the list modal
        $("#listModal").modal('toggle');

      $(".l-item").on("click", function(){

          itemText = $(this).text();


          if (activeId === 0) {

            activeId = $(this).attr('id')

            edititemId = $(this).attr('id');


            //console.log("\npost-click item id: " + edititemId);

            itemClicked = this;

            //$(this).unbind("click");

            $(this).html('<form id="itemupdate" action="/api/itemupdate/?_method=PUT" method="POST"><input type="text" size="45" name="item" value="' + itemText + '"><input type="hidden" name="id" value="' + edititemId + '"><button id="itemSubmit" type="submit">Ok</button></form>'); 

          } // end if an item's been already selected for editing


$("#itemupdate").submit(function(event){

        //prevent Default functionality
        event.preventDefault();

        //get the action-url of the form
        var actionurl = event.currentTarget.action;

      $.ajax({
        url: actionurl,
        type: 'post',
        data: $("#itemupdate").serialize(),
        error: function(errdata) {console.log("ajax error:" + JSON.stringify(errdata));},
        success: function(data) {

          //console.log(itemClicked);

          activeId = 0;

          $(itemClicked).html(data);

        } // end success function

      });
}); // end submit function



        }); // end l-item on click function


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









