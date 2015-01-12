(function($) {

  $.shuffle = function(l) {
    var i = l.length;
    if (i === 0) { 
      return false;
    }
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = l[i];
      l[i] = l[j];
      l[j] = t;
    }
    return true;
  };

  $.uniqid = function() {
    var d = new Date();
    var p1 = d.getTime().toString(36).substr(-8);
    var p2 = Math.random().toString(36).substr(2, 8);
    return (p1 + '' + p2).toUpperCase();
  };

}(jQuery));
