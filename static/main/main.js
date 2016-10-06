var app = angular.module('WikiApp',[]);
app.controller('MainCtrl', function($scope, $http) {
	$scope.searchTxt = '';
    $scope.search = function () {
    	$scope.results = [];
    	var page = 'https://en.wikipedia.org/?curid=';
    	// var title = $scope.searchTxt;
    	var title = $('input').val();
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0'
        +'&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var cb = '&callback=JSON_CALLBACK';
    	$http.jsonp(api+title+cb).success(function(data) {
             var results = data.query.pages;
             angular.forEach(results, function(v,k) {
             	$scope.results.push({
             		title: v.title,
             		body: v.extract,
             		page: page + v.pageid
             	});
             });      
    	});
    };


});

