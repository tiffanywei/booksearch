describe('controller', function() {
	var $controller;
  beforeEach(module('bookSearch'));

  beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
		scope = {};
  }));
  
  it('should call searchFactory.fetchSearchResults() on sendSearchRequest', function() {
    var searchFactorySpy = jasmine.createSpyObj('Spy', ['fetchSearchResults']);
		var mock_promise = { then: jasmine.createSpy() };
		searchFactorySpy.fetchSearchResults.and.returnValue(mock_promise);

    var bookSearchController = $controller('bookSearchController', {
      $scope: scope,
      searchFactory: searchFactorySpy
    });
		bookSearchController.sendSearchRequest();
    expect(bookSearchController.searchFactory.fetchSearchResults).toHaveBeenCalled();
  });
});
