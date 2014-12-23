$(document).ready(function() {
  $.getJSON('http://azspot.net/api/read/json/?callback=?', function(d) {
    console.log(d);
    $('#discoveryboard').text(d['posts-total']);    
  });
});
