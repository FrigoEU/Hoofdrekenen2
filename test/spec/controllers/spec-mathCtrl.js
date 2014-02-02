'use strict';

describe('Controller: MathCtrl', function () {

	// load the controller's module
	beforeEach(module('hoofdrekenenApp'));

	var MathCtrl,
	scope,
	ngInterval,
	ngTimeout;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, $interval, $timeout) {
		scope = $rootScope.$new();
		ngInterval = $interval;
		ngTimeout = $timeout;
		MathCtrl = $controller('MathCtrl', {
			$scope: scope
		});
	}));

	it('should initialize some objects on the scope correctly', function(){
		expect(scope.visuals).toNotBe(undefined);
		expect(scope.options).toNotBe(undefined);
		expect(scope.options.operands).toNotBe(undefined);
		expect(scope.visuals.progressbarStyle).toNotBe(undefined);
	});

	describe('startExercises', function(){
		it('should make a new exercisetable when there is none', function(){
			expect(scope.exercises.exerciseTable).toBeFalsy();
			scope.startExercises();
			expect(scope.exercises.exerciseTable.length).toNotBe(undefined);
		});
		it('should hide the options', function(){
			scope.visuals.hideOptions = false;
			scope.startExercises();
			expect(scope.visuals.hideOptions).toBe(true);
		});
		it('should start at the first exercise, unless it was pauzed', function(){
			scope.options.numberOfSeconds = 3;
			scope.startExercises();
			expect(scope.exercises.counter).toBe(0);
			ngInterval.flush(3500);
			expect(scope.exercises.counter).toBe(1);
			scope.pauseExercises();
			ngInterval.flush(3500);
			scope.startExercises();
			expect(scope.exercises.counter).toBe(1);
		});
		it('should set a new exercise every few seconds, and save+check the student\'s answer', function(){
			//start
			scope.options.numberOfSeconds = 3;
			scope.startExercises();
			//answer
			scope.answer.answer = 5;
			//next
			ngInterval.flush(3000);
			expect(scope.exercises.counter).toBe(1);
			expect(scope.exercises.exerciseTable[0].answerStudent).toBe(5);
			expect(scope.exercises.exerciseTable[0].correct).toNotBe(undefined);
			expect(scope.answer.answer).toBe(undefined);
			//next
			ngInterval.flush(3000);
			expect(scope.exercises.counter).toBe(2);
			expect(scope.exercises.exerciseTable[1].answerStudent).toNotBe(undefined);
		});
		it('should stop it\'s timer when it\'s finished with the exercise array', function(){
			scope.options.numberOfQuestions = 3;
			scope.options.numberOfSeconds = 5;
			scope.startExercises();
			// debugger;
			expect(MathCtrl.getTimer()).toNotBe(undefined);
			ngInterval.flush(16000);
			expect(MathCtrl.getTimer()).toBe(undefined);
		});
		it('should not do anything when a timer is already running', function(){
			scope.options.numberOfSeconds = 3;
			scope.startExercises();
			expect(scope.exercises.counter).toBe(0);
			ngInterval.flush(10);
			scope.startExercises();
			//If a second timer would be started, the counter would go up twice as fast now
			ngInterval.flush(3500);
			expect(scope.exercises.counter).toBe(1);
		});
		describe('the animation', function(){
			it('should start when the exercises start', function(){
				scope.options.numberOfSeconds = 3;
				scope.startExercises();
				ngTimeout.flush(1);
				expect(scope.visuals.progressbarStyle.width).toBe('100%');
				expect(scope.visuals.progressbarStyle.transition).toMatch(/3s/);
			});
		});
	});

	describe('resetExercises', function(){
		it('should empty the exercise table, and reset the counter', function(){
			scope.exercises.exerciseTable = [];
			scope.exercises.counter = 7;
			expect(scope.exercises.exerciseTable).toNotBe(undefined);
			scope.resetExercises();
			expect(scope.exercises.exerciseTable).toBe(undefined);
			expect(scope.exercises.counter).toBe(undefined);
		});
		it('should stop the animation', function(){
			scope.visuals.progressbarStyle.width = '100%';
			scope.resetExercises();
			ngTimeout.flush(1);
			expect(scope.visuals.progressbarStyle.width).toBe('0%');
		});
	});


	describe('pauseExercises', function(){
		it('should stop the timer but save the counter', function(){
			scope.options.numberOfSeconds = 3;
			scope.startExercises();
			ngInterval.flush(4500);
			scope.pauseExercises();
			expect(MathCtrl.getTimer()).toBe(undefined);
			expect(scope.exercises.counter).toBe(1);
		});
		it('should stop the animation', function(){
			scope.visuals.progressbarStyle.width = '100%';
			scope.resetExercises();
			ngTimeout.flush(1);
			expect(scope.visuals.progressbarStyle.width).toBe('0%');
		});
	});
});
