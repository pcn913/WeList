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
 
}); /* END document ready */