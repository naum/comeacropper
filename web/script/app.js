var HM = { 

    a: function(u, l) {
      return '<a href="' + u + '">' + l + '</a>';
    }

};

var TDM = {

  CALLBACKLIT: '?callback=?',
  TUMBLRAPISUFFIX: '/api/read/json',

  tagchart: {},
  tumblr: 'void',

  clear: function() {
    this.tagchart = {};
  },

  report: function() {
    var reportout = '<tr><th>tag</th><th>#</th></tr>';
    var tags = _.keys(TDM.tagchart);
    var sortedtags = _.sortBy(tags, function(t) { return TDM.tagchart[t]; });
    while (sortedtags.length > 0) {
      var t = sortedtags.pop();
      var u = 'http://' + this.tumblr + '/tagged/' + t;
      reportout += '<tr><td>' + HM.a(u, t) + '</td><td>' + TDM.tagchart[t] + '</td></tr>';
    }
    return '<table>' + reportout + '</table>';
  },

  tally: function(td) {
    _.each(td.posts, function(tp) {
      _.each(tp.tags, function(tt) {
        if (_.has(TDM.tagchart, tt)) {
          TDM.tagchart[tt] += 1;
        } else {
          TDM.tagchart[tt] = 1;
        }
      });
    });
  }

};

$(document).ready(function() {
  $('#fetchtumblr').click(function() {
    $('#discoveryboard').text('Working...');
    $('#tagreport').empty();
    TDM.clear();
    var tumblrUrl = $('#tumblrurl').val();
    TDM.tumblr = tumblrUrl;
    var fetchUrl = 'http://' + tumblrUrl + TDM.TUMBLRAPISUFFIX + TDM.CALLBACKLIT;
    $.getJSON(fetchUrl, { 
      start: '0',
      num: '50'
    }).done(function(d) {
      //console.log(d);
      $('#discoveryboard').text(d['posts-total']);    
      TDM.tally(d);
      $('#tagreport').html(TDM.report());
    }).fail(function(jqxhr, textstatus, error) {
      $('#discoveryboard').text('Request failed: ' + error);
    });
  });
});
