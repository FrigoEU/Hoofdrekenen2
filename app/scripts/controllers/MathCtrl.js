'use strict';

angular.module('hoofdrekenenApp')
.controller('MathCtrl', function ($scope, $interval, Math, $timeout) {
	var timer, timing;
	$scope.visuals = {
		hideScoreboard: true,
		hideOptions: false
	};
	$scope.visuals.progressbarStyle = {};
	$scope.visuals.showAnswers = {
		correct:false,
		wrong:true
	}
	$scope.options = {
		numberOfQuestions: 100,
		numberOfSeconds: 7,
		operands: {
			multiplication: true,
			division: true
		}
	};
	$scope.exercises = {
		counter: undefined //Undefined = we haven't started the exercise yet
	};
	$scope.answer = {};

	//Hides the options menu, starts the animation the first time and creates an exercise table if none was created before
	$scope.startExercises = function () {
		//If a timer is already running, don't do anything.
		if (timer){
			return;
		}

		//Make a new exercisetable
		if (!$scope.exercises.exerciseTable){
			$scope.exercises.exerciseTable = Math.createQuestionsTable($scope.options.numberOfQuestions, $scope.options.operands);
		}

		//Set the exercise counter to the first exercise
		if (!$scope.exercises.counter){
			$scope.exercises.counter = 0;
		}

		$scope.visuals.hideOptions = true;
		startAnimation();

		timing = ($scope.options.numberOfSeconds || 5)*1000;
		timer = $interval(function timerTick () {
			//The timer resets the animation, ups the exercise counter, and saves + checks the answer
			startAnimation();
			$scope.exercises.exerciseTable[$scope.exercises.counter].answerStudent = ($scope.answer.answer || null);
			$scope.exercises.exerciseTable.checkAnswer($scope.exercises.counter);
			$scope.answer.answer = undefined;

			$scope.exercises.counter = $scope.exercises.counter + 1;

			if ($scope.exercises.counter >= $scope.exercises.exerciseTable.length){
				$scope.pauseExercises();
				$scope.exercises.counter = undefined;
			}
		}, timing);
	};
	$scope.pauseExercises = function () {
		//Stop the timer and stop the animation
		if(timer){
			$interval.cancel(timer);
			timer = undefined;
		}
		stopAnimation();
	};
	$scope.resetExercises = function(){
		//Empty the exercisetable, and set the exercise counter to undefined
		$scope.exercises.exerciseTable = undefined;
		$scope.exercises.counter = undefined;
		$scope.pauseExercises();
	};

	var startAnimation = function(){
		//Reset width to jumpstart progressbar animation
		setProgressbarTransitionTiming($scope.visuals, 0);
		setProgressbarWidth($scope.visuals,'0%');
		$timeout(function(){
			setProgressbarTransitionTiming($scope.visuals, $scope.options.numberOfSeconds);
			setProgressbarWidth($scope.visuals,'100%');
		},0);
	};
	var stopAnimation = function(){
		//Stop progressbar animation
		$timeout(function(){
			setProgressbarTransitionTiming($scope.visuals, 0);
			setProgressbarWidth($scope.visuals, '0%');
		},0);
	};
	var setProgressbarTransitionTiming = function(visuals, seconds) {
		visuals.progressbarStyle.transition = seconds + 's linear all';
		visuals.progressbarStyle['-webkit-transition'] = seconds + 's linear all';
	};
	var setProgressbarWidth = function(visuals, string){
		visuals.progressbarStyle.width = string;
	};

	this.getTimer = function getTimer () {
		//Testing purposes
		return timer;
	};
});
