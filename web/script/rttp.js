
var RTTP = function() {
  var 
    APISUFFIX = '/api/read/json/?&callback=?',
    fetchTumblrPosts, init, generateReport, 
    setupEventHandlers;
  fetchTumblrPosts = function() {
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
  generateReport = function(d) {
    console.log(d);
    var reportLines = [];
    var postCount = d.posts.length;
    for (var i = 0; i < postCount; i += 1) {
      var p = d.posts[i];
      reportLines.push(HM.a(p['url-with-slug'], p['regular-title']));
    }
    var reportLines = $.map(reportLines, function(s) {
      return HM.tag('li', s);
    });
    var reportOut = reportLines.join('\n');
    $('#rttp-report').html(reportOut);
    var tbopt = {
      'rows': 12,
      'cols': 60
    };
    $('#rttp-textbox').append(HM.tag('textarea', reportOut, tbopt));
  };
  setupEventHandlers = function() {
    $('#fetchtumblr').click(function() {
      fetchTumblrPosts();
    });
  };
  init = function() {
    $('#rttp-textbox').empty();
    setupEventHandlers();
  };
  return {
    init: init
  }
}();

