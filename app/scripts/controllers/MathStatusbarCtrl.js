'use strict';

angular.module('hoofdrekenenApp')
.controller('MathStatusbarCtrl', function ($scope) {
	$scope.toggleOptions = function(){
		$scope.visuals.hideOptions = !$scope.visuals.hideOptions;
	};
	$scope.toggleScoreboard = function(){
		$scope.visuals.hideScoreboard = !$scope.visuals.hideScoreboard;
	};
});