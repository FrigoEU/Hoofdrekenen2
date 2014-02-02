'use strict';

angular.module('hoofdrekenenApp')
.filter('answers', function(){
	return function (exercise, showAnswers) {
		if (exercise.correct === undefined){
			return false;
		}
		if (exercise.correct && showAnswers.correct){
			return true;
		}
		if (!exercise.correct && showAnswers.wrong){
			return true;
		}
		return false;
	};
});
