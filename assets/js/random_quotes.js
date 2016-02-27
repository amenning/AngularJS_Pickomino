function loadjscssfile(filename) {
  var fileref = document.createElement('script')
  fileref.setAttribute("type", "text/javascript")
  fileref.setAttribute("src", filename)
  if (typeof fileref != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref)
  }
}

function parseQuote(response) {
  document.getElementById("Quote_Box").innerHTML = "\"" + response.quoteText + "\"";
  document.getElementById("Author_Box").innerHTML = "- " + response.quoteAuthor;
}

$(document).ready(function() {
  loadjscssfile("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=parseQuote");

  $(".quoteButton").click(function() {
    loadjscssfile("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=parseQuote");
  })
})