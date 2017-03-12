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
        document.getElementById("title").innerHTML = myObj.items[0].snippet.title;
        var id = myObj.items[0].snippet.channelId;
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
        //END SubsCount
      }
    }
  };
  for (i = 0; i < 5; i++) {
    xmlhttp1.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + $_GET['uid'] + "&key=AIzaSyCEm6mS_IlWaKokdUGk1R1ZVapxFsj64qM", true);
    xmlhttp1.send();
  }
}
else {}
