var BRNL = '<br>\n';

var HM = { 
    a: function(u, l) {
      return '<a href="' + u + '">' + l + '</a>';
    }
};

var TDM = {

  CALLBACKLIT: '?callback=?',
  FETCHCOUNT: 50,
  MAXPOSTFETCH: 200,
  TUMBLRAPISUFFIX: '/api/read/json',

  fetchUrl: '',
  maxposts: 0,
  postcount: 0,
  tagchart: {},
  tagcount: 0,
  tumblr: 'void',

  clear: function() {
    this.tagchart = {};
    this.postcount = 0;
    this.tagcount = 0;
    $('#discoveryboard').empty();
  },

  next: function(startNum) {
    $('#discoveryboard').append('Fetching, startNum=' + startNum + ' ...' + BRNL);
    $.getJSON(TDM.fetchUrl, {
      start: startNum,
      num: TDM.FETCHCOUNT
    }).done(function(d) {
      TDM.tally(d);
      $('#tagreport').html(TDM.report());
      if (TDM.postcount < TDM.maxposts) {
        setTimeout(function() {
          TDM.next(TDM.postcount);
        }, 5000);
      }
    }).fail(function(jqxhr, textstatus, error) {
      $('#discoveryboard').append('Request failed: ' + error + BRNL);
    });
  },

  prime: function() {
    $('#discoveryboard').append('Priming...' + BRNL);
    $('#tagreport').empty();
    TDM.clear();
    var tumblrUrl = $('#tumblrurl').val();
    TDM.tumblr = tumblrUrl;
    TDM.fetchUrl = 'http://' + tumblrUrl + TDM.TUMBLRAPISUFFIX + TDM.CALLBACKLIT;
    $.getJSON(TDM.fetchUrl, { 
      start: '0',
      num: TDM.FETCHCOUNT
    }).done(function(d) {
      //console.log(d);
      TDM.maxposts = Math.min(d['posts-total'], TDM.MAXPOSTFETCH);
      $('#discoveryboard').append(d['posts-total'] + BRNL);    
      TDM.tally(d);
      $('#tagreport').html(TDM.report());
      if (TDM.postcount < TDM.maxposts) {
        setTimeout(function() {
          TDM.next(TDM.postcount);
        }, 5000);
      }
    }).fail(function(jqxhr, textstatus, error) {
      $('#discoveryboard').append('Request failed: ' + error + BRNL);
    });
  },

  report: function() {
    var reportout = '<tr><th class="cell-l">tag</th><th class="cell-r">#</th></tr>';
    var tags = _.keys(TDM.tagchart);
    var sortedtags = _.sortBy(tags, function(t) { return TDM.tagchart[t]; });
    while (sortedtags.length > 0) {
      var t = sortedtags.pop();
      var u = 'http://' + this.tumblr + '/tagged/' + t;
      reportout += '<tr><td class="cell-l">' + HM.a(u, t) + '</td><td class="cell-r">' + TDM.tagchart[t] + '</td></tr>';
    }
    return '<table>' + reportout + '</table>';
  },

  tally: function(td) {
    _.each(td.posts, function(tp) {
      TDM.postcount += 1;
      _.each(tp.tags, function(tt) {
        TDM.tagcount += 1;
        if (_.has(TDM.tagchart, tt)) {
          TDM.tagchart[tt] += 1;
        } else {
          TDM.tagchart[tt] = 1;
        }
      });
    });
  }

};

// MAIN

$(document).ready(function() {
  $('#fetchtumblr').click(function() {
    TDM.prime(); 
  });
});
