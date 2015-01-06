
var HM = function() { 
  var ro = {};
  ro.BRNL = '<br>\n';
  ro.a = function(u, l) {
    return '<a href="' + u + '">' + l + '</a>';
  };
  return ro;
}();

var RTTP = function() {
  var ro = {};
  var APISUFFIX = '/api/read/json/?&callback=?';
  var fetchTumblrPosts = function() {
    var tumblrUrl = $('#tumblrurl').val();
    var fetchUrl = tumblrUrl + APISUFFIX;
    if (! fetchUrl.match('/^http/')) {
      fetchUrl = 'http://' + fetchUrl;
    }
    $('#rttp-message').html('Fetching...');
    $.getJSON(fetchUrl, {
      start: 0,
      type: 'text',
      num: 50
    }).done(function(d) {
      $('#rttp-message').html('Successful fetch!');
      generateReport(d);
    }).fail(function(jqxhr, textstatus, error) {
      $('#rttp-message').html('Request failed: ' + error + BRNL);
    });
  };
  var generateReport = function(d) {
    console.log(d);
    var reportLines = [];
    var postCount = d.posts.length;
    for (var i = 0; i < postCount; i += 1) {
      var p = d.posts[i];
      reportLines.push(HM.a(p['url-with-slug'], p['regular-title']));
    }
    var reportOut = reportLines.join(HM.BRNL);
    $('#rttp-report').html(reportOut);
  };
  var setupEventHandlers = function() {
    $('#fetchtumblr').click(function() {
      fetchTumblrPosts();
    });
  };
  ro.init = function() {
    setupEventHandlers();
  };
  return ro;
}();

// MAIN

$(document).ready(function() {
  RTTP.init();
});
