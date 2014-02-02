'use strict';

angular.module('hoofdrekenenApp')
.factory('Math', function () {
	var service = {};
	var fisherYates = function ( myArray ) {
		//Array Randomizer
		var i = myArray.length, j, tempi, tempj;
		if ( i === 0 ) {return false;}
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			tempi = myArray[i];
			tempj = myArray[j];
			myArray[i] = tempj;
			myArray[j] = tempi;
		}
	};

	var createFullTable = function (lowestnumber, highestnumber, operands) {
		/* maakt volledige tabel met alle waarden tussen laagste en hoogste nummer en met meegeleverde operands */
		var firstNumber;
		var secondNumber;
		var exercises = [];
		var exercise;

		if (lowestnumber > highestnumber) {
			throw new Error('lowest number can\'t be higher than highestnumber');
		}
		if (!operands || operands === {}){
			return [];
		}

		for (firstNumber = lowestnumber; firstNumber <= highestnumber; firstNumber++) {
			for (secondNumber = lowestnumber; secondNumber <= highestnumber; secondNumber++) {
				if (operands.multiplication){
					exercise = initExercise('x');
					exercise.firstNumber = firstNumber;
					exercise.secondNumber = secondNumber;
					exercise.answer = firstNumber*secondNumber;
					exercises.push(exercise);
				}
				if (operands.division){
					exercise = initExercise(':');
					exercise.firstNumber = firstNumber*secondNumber;
					exercise.secondNumber = secondNumber;
					exercise.answer = firstNumber;
					exercises.push(exercise);
				}
			}
		}
		return exercises;
	};

	var attachFunctions = function (array) {
		array.checkAnswer = function (index) {
			array[index].correct = (array[index].answer === array[index].answerStudent );
		};
	};
	var initExercise = function (operand) {
		return {
			'answerStudent': undefined,
			'correct': undefined,
			'tooLate': false,
			'operand': operand
		};
	};

	service.createQuestionsTable = function (numberOfQuestions, operands) {
		/* Maakt gerandomzide table met nummers van 1 tot 9, meegeleverde operands en aantal = numberOfQuestions */
		if (numberOfQuestions > 162) {
			throw new Error('maximum of 162 questions');
		}
		var fullTable = createFullTable(1,9,operands);
		fisherYates(fullTable);
		var table = fullTable.slice(0, numberOfQuestions);
		attachFunctions(table);
		return table;
	};

	service.createFullTable = createFullTable; /*Added so I can test it */
	return service;
});
