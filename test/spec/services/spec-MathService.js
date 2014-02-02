'use strict';

describe('Controller: MathService', function () {

  // load the controller's module
  beforeEach(module('hoofdrekenenApp'));

  var MathService,
      table;

  beforeEach(inject(function (Math) {
    MathService = Math;
    table = [];
  }));

  describe('createFullTable', function(){
    it('should make a full table of exercises', function(){
      table = MathService.createFullTable(1, 3, {division: false, multiplication: true});
      expect(table[0].firstNumber).toEqual(1);
      expect(table[0].secondNumber).toEqual(1);
      expect(table[0].operand).toEqual('x');
      expect(table[0].answer).toEqual(1);
      expect(table[0].answerStudent).toBe(undefined);
      expect(table[0].correct).toBe(undefined);
      expect(table[0].tooLate).toEqual(false);

      expect(table[1].firstNumber).toEqual(1);
      expect(table[1].secondNumber).toEqual(2);
      expect(table[1].answer).toEqual(2);

      expect(table.length).toEqual(9);

      table = MathService.createFullTable(1,2, {division: true});
      expect(table[0].firstNumber).toEqual(1);
      expect(table[0].secondNumber).toEqual(1);
      expect(table[0].operand).toEqual(':');
      expect(table[0].answer).toEqual(1);
      expect(table[0].answerStudent).toBe(undefined);
      expect(table[0].tooLate).toEqual(false);

      expect(table[1].firstNumber).toEqual(2);
      expect(table[1].secondNumber).toEqual(2);
      expect(table[1].answer).toEqual(1);

      expect(table[2].firstNumber).toEqual(2);
      expect(table[2].secondNumber).toEqual(1);
      expect(table[2].answer).toEqual(2);

      table = MathService.createFullTable(1, 9, {division: true, multiplication: true});
      expect(table.length).toEqual(162);
    });

    it('should throw an error when receiving a lowestnumber higher than highestnumber', function(){
      expect(function () {
        MathService.createFullTable(9,5,{}); //Wrap in anon function for Jasmine
      }).toThrow();
    });
  });

  describe('createQuestionsTable', function(){
    it('should make a randomized table sized to the parameter', function(){
      // debugger;
      table = MathService.createQuestionsTable(5, {division: true, multiplication: true});
      expect(table.length).toEqual(5);
    });

    it('should throw when asked for too many questions', function(){
      expect(function(){
        MathService.createQuestionsTable(170, {});
      }).toThrow();
    });
    describe('checkAnswer',function(){
      it('should get attached to the array', function(){
        table = MathService.createQuestionsTable(5, {division: true, multiplication: true});
        expect(table.checkAnswer).toNotBe(undefined);
      });
      it('should set true on the correct index if the answer is true', function(){
        table = MathService.createQuestionsTable(5, {division: true, multiplication: true});
        table[0].answerStudent = table[0].answer;
        table.checkAnswer(0);
        expect(table[0].correct).toBe(true);
      });
      it('should set false on the correct index if the answer is false', function(){
        table = MathService.createQuestionsTable(5, {division: true, multiplication: true});
        table[0].answerStudent = table[0].answer + 1;
        table.checkAnswer(0);
        expect(table[0].correct).toBe(false);
      });
    });
  });
});
