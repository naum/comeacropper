var CALLBACKLIT = '?callback=?';
var TUMBLRAPISUFFIX = '/api/read/json';

$(document).ready(function() {
  $('#fetchtumblr').click(function() {
    var tumblrUrl = $('#tumblrurl').val();
    var fetchUrl = 'http://' + tumblrUrl + TUMBLRAPISUFFIX + CALLBACKLIT;
    $.getJSON(fetchUrl, function(d) {
      $('#discoveryboard').text(d['posts-total']);    
    });
  });
});
