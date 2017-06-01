$(window).load(function() {
     // + any other carousel related stuff that has to wait for the images to complete loading
 $('.carousel').carousel({
    interval: 7000, //changes the speed
    pause: "none",
})
})
$(document).ready(function() {
  
$(".carousel").swiperight(function() {
    $(this).carousel('prev');
});
$(".carousel").swipeleft(function() {  
    $(this).carousel('next');
});

// duration of scroll animation
var scrollDuration = 300;
// paddles
var leftPaddle = document.getElementsByClassName('left-paddle');
var rightPaddle = document.getElementsByClassName('right-paddle');
// get items dimensions
var itemsLength = $('.item').length;
//console.log(".item length: " + itemsLength);
var itemSize = $('.item').outerWidth(true);
//console.log(".item size: " + itemSize);

//console.log("itemsize: " + itemSize);
// get some relevant size for the paddle triggering point
var paddleMargin = 20;

//console.log("menuWrapperSize: " + $('.menu-wrapper').outerWidth());

// get wrapper width
var getMenuWrapperSize = function() {
  return $('.menu-wrapper').outerWidth();
}
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function() {
  menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size 
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function() {
  return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize = menuSize - menuWrapperSize;

// get how much have we scrolled to the left
var getMenuPosition = function() {
  return $('.menu').scrollLeft();
};

//console.log("menusize: " + menuSize);
//console.log("menuwrappersize: " + menuWrapperSize);

// finally, what happens when we are actually scrolling the menu
$('.menu').on('scroll', function() {

  // get how much of menu is invisible
  menuInvisibleSize = menuSize - menuWrapperSize;
  // get how much have we scrolled so far
  var menuPosition = getMenuPosition();

  var menuEndOffset = menuInvisibleSize - paddleMargin;

  // show & hide the paddles 
  // depending on scroll position
  if (menuPosition <= paddleMargin) {
    $(leftPaddle).addClass('hidden');
    $(rightPaddle).removeClass('hidden');
  } else if (menuPosition < menuEndOffset) {
    // show both paddles in the middle
    $(leftPaddle).removeClass('hidden');
    $(rightPaddle).removeClass('hidden');
  } else if (menuPosition >= menuEndOffset) {
    $(leftPaddle).removeClass('hidden');
    $(rightPaddle).addClass('hidden');
}

  // print important values
  $('#print-wrapper-size span').text(menuWrapperSize);
  $('#print-menu-size span').text(menuSize);
  $('#print-menu-invisible-size span').text(menuInvisibleSize);
  $('#print-menu-position span').text(menuPosition);

});

// scroll to left
$(rightPaddle).on('click', function() {
  $('.menu').animate( { scrollLeft: menuInvisibleSize}, scrollDuration);
});

// scroll to right
$(leftPaddle).on('click', function() {
  $('.menu').animate( { scrollLeft: '0' }, scrollDuration);
});
 
}); /* END document ready */