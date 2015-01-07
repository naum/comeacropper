var HM = function() {
  var 
    BRNL = '<br>\n',
    SP = ' ',
    a, parseOpt, tag;
  a = function(u, l) {
    return '<a href="' + u + '">' + l + '</a>';
  };
  parseOpt = function(o) {
    var optList = [];
    $.each(o, function(k, v) {
      optList.push(k + '=' + '"' + v + '"');
    });
    return optList.join(' ');
  };
  tag = function(t, c, o) {
    if (o) {
      return '<' + t + ' ' + parseOpt(o) + '>' + c + '</' + t + '>';
    } else {
      return '<' + t + '>' + c + '</' + t + '>';
    }
  };
  return {
    BRNL: BRNL,
    SP: SP,
    a: a,
    tag: tag
  }
}();
