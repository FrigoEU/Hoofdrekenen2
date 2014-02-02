
// describe('angularjs homepage', function() {
//   it('should greet the named user', function() {
//     browser.get('http://www.angularjs.org');

//     element(by.model('yourName')).sendKeys('Julie');

//     var greeting = element(by.binding('yourName'));

//     expect(greeting.getText()).toEqual('Hello Julie!');
//   });

//   describe('todo list', function() {
//     var todoList;

//     beforeEach(function() {
//       browser.get('http://www.angularjs.org');

//       todoList = element.all(by.repeater('todo in todos'));
//     });

//     it('should list todos', function() {
//       expect(todoList.count()).toEqual(2);
//       expect(todoList.get(1).getText()).toEqual('build an angular app');
//     });

//     it('should add a todo', function() {
//       var addTodo = element(by.model('todoText'));
//       var addButton = element(by.css('[value="add"]'));

//       addTodo.sendKeys('write a protractor test');
//       addButton.click();

//       expect(todoList.count()).toEqual(3);
//       expect(todoList.get(2).getText()).toEqual('write a protractor test');
//     });
//   });
// });

describe('Math site', function(){
	var mathPage;
	beforeEach(function(){
		mathPage = new MathPage;
		mathPage.get();
	});
	it('should have a menu and scoreboard button', function(){
		expect(element.all(by.css('.statusbar .btn')).count()).toEqual(2);
	});

	it('should have the options menu open when started, and close it when clicked', function(){
		expect(mathPage.numberOfQuestions.isDisplayed()).toBe(true);
		mathPage.menuButton.click();
		expect(mathPage.numberOfQuestions.isDisplayed()).toBe(false);
	});

	it('should start an exercise when pressing play, including the animation', function(){
		expect(mathPage.progressbar.getCssValue('width')).toBe('0px');
		mathPage.startButton.click();
		expect(mathPage.exercise.getText()).toMatch(/x|:/);
		setTimeout(function(){
			expect(mathPage.progressbar.getCssValue('width')).toNotBe('0px');
		}, 50)
	});
	it('should stop showing the exercises when resetting, and stop the animation', function(){
		mathPage.startButton.click();
		mathPage.resetButton.click();
		expect(mathPage.exercise.getText()).toMatch(/^\|\|$/);
		expect(mathPage.progressbar.getCssValue('width')).toBe('0px');
	});

});

var MathPage = function() {
  this.navbar = element(by.css('.navbar'));
  this.menuButton = element(by.css('#menuButton'));
  this.numberOfQuestions = element(by.css('#numberOfQuestions'));
  this.division = element(by.model("options.operands.division"));
  this.exercise = element(by.css('span.huge'));
  this.startButton = element(by.css('#startButton'));
  this.pauseButton = element(by.css('#pauseButton'));
  this.resetButton = element(by.css('#resetButton'));
  this.progressbar = element(by.css('.progress-bar'));

  this.get = function() {
    browser.get('http://localhost:9000');
  };

  this.xxx = function() {
    
  };
};