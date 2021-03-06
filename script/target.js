var Target;
(function($, init) {
var 
    $target = $(
      '<div class="target">'+
        '<img class="outer" src="img/outerTarget.png" />'+
        '<img class="inner" src="img/innerTarget.png" />'+
        '<p></p>'+
      '</div>'
    )
  , vh = _vh
  , $scene = $('#scene')
  ;
  
init.list.push($target);

$target.bind('init', function() {
  var css = {
      borderWidth: vh(2)
    , fontSize: vh(4)
  };
  css[$.browser.mozilla? 'MozBorderRadius' : 'borderRadius'] = vh(1);
  $target.css({
      width: vh(8)
    , height: vh(8)
  }).children('p').css(css);
});

$scene.delegate('.target', jQuery.browser.mozilla? 'MozTouchDown' : 'click', function( e ) {
  var self = this;
  e.preventDefault();
  $(this)
    .children(':first').fadeOut().queue(function() {
      $(this).nextAll('p').andSelf().fadeIn();
      $(this).dequeue();
    });
// Prevent image dragging
}).mousedown(function( e ) { e.preventDefault(); });

function target( y, speed, text ) {
  if ( typeof speed === 'string' ) {
    text = speed;
    speed = false;
  }
  this.y = y;
  this.speed = speed || 10000;
  this.text = text;
}
  
target.prototype.display = function() {
  return $target.clone().css({
      top: vh(this.y)
  
  }).children('p').html(this.text.split(' ').join('&nbsp;')).end()
  
  .appendTo($scene).animate({
    left: '-20%'
  }, this.speed).queue(function() {
    $(this).remove().dequeue();
  });
}

Target = target;
  
})(jQuery, init);
