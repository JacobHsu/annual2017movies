'use strict';

var moviesApp = angular.module('moviesApp', []);
var apikey = '4e1e08f0';
moviesApp.controller('listCtrl', function($scope, $http) {

    var checkApi = function(title) {
		switch(title) {
			case "The Mummy":
			case "Beauty and the Beast":
				return 'https://www.omdbapi.com/?'+'apikey='+apikey+'&t=' + title + '&y=2017&type=movie&tomatoes=true';
		        break;
		    case "Along with the Gods":
				return 'https://www.omdbapi.com/?'+'apikey='+apikey+'&i=tt7160070';
		        break;
		    case "L'outsider":
				return 'https://www.omdbapi.com/?'+'apikey='+apikey+'&i=tt5114984';
		        break;       
		    default:
		        return 'https://www.omdbapi.com/?'+'apikey='+apikey+'&t=' + title + '&type=movie&tomatoes=true';
		}
  	}

  	var checkData = function(oData) {
		oData.Website  = (oData.Website == "N/A") ? 'https://www.google.com.tw/search?q='+oData.Title : oData.Website ;
    	oData.Poster = (oData.Poster == "N/A") ? 'https://images-na.ssl-images-amazon.com/images/M/MV5BN2FjN2Q0ZWQtN2NiOC00MTZjLTg3ZDEtMmVkNzM0ODBkYmU1XkEyXkFqcGdeQXVyNTUxNTI3MzY@._V1_UX182_CR0,0,182,268_AL_.jpg' : oData.Poster ;
    	return oData;
  	}

	$http.get('data/movies.json').success(function(data) {

		$scope.movies = data;
		data.forEach(function(section, id) {
			$scope.movie = [];

			var sApi = checkApi(section.title);

			$http.get(sApi).success(function(oData) {
				oData = checkData(oData);
			    $scope.movie[id] = oData;
			});

			$scope.list = [];

			var list = [];
			section.list.forEach(function(name) {

				var sApi = checkApi(name);

				$http.get(sApi).success(function(oData) {
					oData = checkData(oData);
					list.push(oData);
					$scope.list[id] = list;
				});

			});

		});

	});



});

moviesApp.directive('bgImg', function(){
    return function(scope, element, attrs){
        var url = attrs.bgImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});