function runScript(e) {
    if (e.keyCode == 13) {
    current_forcast();
    }
}


function current_forcast(){
	var x = document.getElementById("city").value;
    if (x == null || x == "") {
    alert("City name must be filled out");
    return false;
}
	getWeather();
	forcast();
}

function getWeather() {
  var xhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var city = document.getElementById('city').value;
  var weatherurl = 'http://api.openweathermap.org/data/2.5/weather?q=';
	  var appid = '&units=metric&APPID=26f67521b4bd30359a19b37a865f0c94'
	  var url = weatherurl + city + appid;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var wea_json = JSON.parse(this.responseText);
      var country = wea_json.sys.country;
      var icon = wea_json.weather[0].icon;
      var temp = wea_json.main.temp;
      var weather = wea_json.weather[0].description;
      var time = wea_json.dt;
      var unixTimestamp = new Date(time * 1000);
      var ctime = unixTimestamp.toLocaleString();
      document.getElementById('place_weather').innerHTML = city + ', ' + country;
      document.getElementById('myImage').src = "http://openweathermap.org/img/w/" + icon + ".png";
      document.getElementById('temp').innerHTML = temp + ' °C';
      document.getElementById('weather').innerHTML = weather;
      document.getElementsByClassName('gettime')[0].innerHTML = 'get at ' + ctime;
    }
  };	
  xhttp.open("GET", url, true);
  xhttp.send(); 
}

function forcast(){
	  var xhttp;
	  if (window.XMLHttpRequest) {
	    // code for modern browsers
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  var city = document.getElementById('city').value;
	  var weatherurl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
	  var dayNumber = '&cnt=6';
	  var appid = '&units=metric&APPID=26f67521b4bd30359a19b37a865f0c94'
	  var url = weatherurl + city + dayNumber + appid;
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var wea_json = JSON.parse(this.responseText);
	      var forcastwe = [];
	      var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	      for (var i=0; i < 5; i++){
	      	 forcastwe[i] = {
	      	 	time: wea_json.list[i+1].dt,
	      	 	tempmin: wea_json.list[i+1].temp.min,
	      	 	tempmax: wea_json.list[i+1].temp.max,
	      	 	weather: wea_json.list[i+1].weather[0].main,
	      	 	icon: wea_json.list[i+1].weather[0].icon
	      	 }
          var a = new Date(forcastwe[i].time*1000);		  
		  var dayOfWeek = days[a.getDay()];
		  document.getElementById('weekday'+(i+1)).innerHTML = dayOfWeek;
	      document.getElementById('img'+(i+1)).src = "http://openweathermap.org/img/w/" + forcastwe[i].icon + ".png";
	      document.getElementById('temp'+(i+1)).innerHTML = forcastwe[i].tempmax + ' °C';
	      document.getElementById('tempmin'+(i+1)).innerHTML = forcastwe[i].tempmin + ' °C';
	      document.getElementById('img'+(i+1)).title = forcastwe[i].weather;
	      }

	    }
	  };	
	  xhttp.open("GET", url, true);
	  xhttp.send(); 
}