var $_GET = {};
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string (thanks, @vrijdenker)
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       $_GET[aux[0]] = aux[1];
    }
}
if ($_GET['uid']) {
  //Showing Channel name
  document.getElementById("title").innerHTML = "Loading...";
  var xmlhttp1 = new XMLHttpRequest();
  xmlhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      if (myObj.pageInfo.totalResults == 0) {
        document.getElementById("title").innerHTML = "No results. Please, try again.";
      }
      else {
        document.getElementById("title").innerHTML = myObj.items[0].snippet.channelTitle;
        var id = myObj.items[0].snippet.channelId;
        var img = myObj.items[0].snippet.thumbnails.default.url;
        document.getElementById("subs").style.background = "url('" + img + "') center bottom no-repeat";
        //START SubsCount
        document.getElementById("subs").innerHTML = "Loading...";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            var n = myObj.items[0].statistics.subscriberCount;
            n = parseInt(n);
            document.getElementById("subs").innerHTML = n.toLocaleString('en-US');
          }
        };
        function getApi() {
          xmlhttp.open("GET", "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + id + "&key=AIzaSyCEm6mS_IlWaKokdUGk1R1ZVapxFsj64qM", true);
          xmlhttp.send();
        }
        var r = setInterval(getApi, 1000);
        document.getElementById("embed").innerHTML = "<a href=\"#\" onclick=\"toggle()\">embed</a><br><input type=\"text\" id=\"embedInput\" size=\"40\" value=\"https://creeperman007.github.io/projects/subscounter/embed/?uid=" + $_GET['uid'] + "&color=000000\" readonly=\"readonly\">"
        //END SubsCount
      }
    }
  };
  for (i = 0; i < 5; i++) {
    xmlhttp1.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + $_GET['uid'] + "&type=channel&key=AIzaSyCEm6mS_IlWaKokdUGk1R1ZVapxFsj64qM", true);
    xmlhttp1.send();
  }
}
else {}
