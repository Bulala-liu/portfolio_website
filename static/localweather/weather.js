var app = angular.module('weather', []);
app.factory('weatherapi', function($http) {
    var obj = {};
    obj.getCurrent = function(city) {
        var weatherurl = 'http://api.openweathermap.org/data/2.5/weather?q=';
        var appid = '&units=metric&APPID=26f67521b4bd30359a19b37a865f0c94&callback=JSON_CALLBACK';
        return $http.jsonp(weatherurl + city + appid);
    };
    obj.getForcast = function(city) {
        var weatherurl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
        var dayNumber = '&cnt=6';
        var appid = '&units=metric&APPID=26f67521b4bd30359a19b37a865f0c94&callback=JSON_CALLBACK';
        return $http.jsonp(weatherurl + city + dayNumber + appid);
    };
    obj.iconFunc = function(iconn) {
        srcico = "http://openweathermap.org/img/w/" + iconn + ".png";
        return srcico;
    };
    return obj;
});
app.controller('weatherCrl', function($scope, weatherapi) {
    $scope.city = 'Beijing';
    $scope.Data = {};
    $scope.Data1 = {};
    $scope.Data2 = {};
    $scope.Data3 = {};
    $scope.Data4 = {};
    $scope.Data5 = {};
    $scope.getData = function() {
        weatherapi.getCurrent($scope.city).success(function(data) {
            $scope.Data.weather = data.weather[0].description;
            $scope.Data.temp = data.main.temp;
            $scope.Data.icon = data.weather[0].icon;
            $scope.Data.iconsrc = weatherapi.iconFunc($scope.Data.icon);
            $scope.Data.time = data.dt;
            var unixTimestamp = new Date($scope.Data.time * 1000);
            $scope.Data.ctime = unixTimestamp.toLocaleString();
            $scope.Data.country = data.sys.country;
        });
        weatherapi.getForcast($scope.city).success(function(data) {
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (var i = 1; i < 6; i++) {
                // var fea_name = 'Data'+i;
                $scope["Data" + i].time = data.list[i].dt;// .property and ["property"] difference
                var a = new Date($scope["Data" + i].time * 1000);
                $scope["Data" + i].weekday = days[a.getDay()];
                $scope["Data" + i].tempmin = data.list[i].temp.min;
                $scope["Data" + i].tempmax = data.list[i].temp.max;
                $scope["Data" + i].weather = data.list[i].weather[0].main;
                $scope["Data" + i].icon = data.list[i].weather[0].icon;
                $scope["Data" + i].iconsrc = weatherapi.iconFunc($scope["Data" + i].icon);
            }
        }); //sucess
    }; //getData
    $scope.getData();// initial when the page has laoded.
});
// }