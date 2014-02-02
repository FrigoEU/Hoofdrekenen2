'use strict';

describe('Controller: MathStatusbarCtrl', function () {

  // load the controller's module
  beforeEach(module('hoofdrekenenApp'));

  var MathStatusbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MathStatusbarCtrl = $controller('MathStatusbarCtrl', {
      $scope: scope
    });
  }));

  it('should be able to toggle hideOptions', function () {
    scope.visuals = {
      hideOptions: false
    };
    scope.toggleOptions();
    expect(scope.visuals.hideOptions).toBe(true);
  });
  it('should be able to toggle hideScoreboard', function () {
    scope.visuals = {
      hideScoreboard: false
    };
    scope.toggleScoreboard();
    expect(scope.visuals.hideScoreboard).toBe(true);
  });

});
