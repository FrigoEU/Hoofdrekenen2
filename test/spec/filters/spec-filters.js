'use strict';

describe('Filter', function(){
	var filter,
		exercise,
		params;

	beforeEach(function () {
		module('hoofdrekenenApp');
	});

	describe('answers', function(){
		beforeEach(inject(function(answersFilter){
			filter = answersFilter;
		}));

		it('should always return true if we want to show both correct and wrong answers', function(){
			params = {correct: true, wrong: true};
			exercise = {correct: false};
			expect(filter(exercise, params)).toBe(true);
			exercise = {correct: true};
			expect(filter(exercise, params)).toBe(true);
		});
		it('should return true when answer is correct and we want to show correct answers', function () {
			params = {correct: true};
			exercise = {correct: true}
			expect(filter(exercise, params)).toBe(true);
		});
		it('should return false when answer is correct but we dont want to show correct answers', function () {
			params = {correct: false};
			exercise = {correct: true}
			expect(filter(exercise, params)).toBe(false);
		});
		it('should return true when answer is wrong and we want to show wrong answers', function () {
			params = {wrong: true};
			exercise = {correct: false}
			expect(filter(exercise, params)).toBe(true);
		});
		it('should return false when answer is correct but we dont want to show correct answers', function () {
			params = {wrong: false};
			exercise = {correct: false}
			expect(filter(exercise, params)).toBe(false);
		});
		it('should return false when correct is still undefined', function(){
			params = {};
			exercise = {correct: undefined}
			expect(filter(exercise, params)).toBe(false);
		});

	});
});