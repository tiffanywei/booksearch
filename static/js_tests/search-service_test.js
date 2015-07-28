describe('searchFactory', function() {
	var searchFactory, httpBackend;
  beforeEach(module('bookSearch'));

  beforeEach(inject(function(_searchFactory_, _$httpBackend_) {
		searchFactory = _searchFactory_;
		httpBackend = _$httpBackend_;
  }));
  
  it('should call fetchSearchResultsSuccess() on XHR success', function() {
		var testEmptyObject = {};
		httpBackend.expectGET('/test').respond(200, testEmptyObject);
		testResponse = searchFactory.fetchSearchResults('test');
		//httpBackend.expectGET('/test');
		httpBackend.flush();
		expect(testResponse['$$state']['value']).toEqual(testEmptyObject);
  });
 
  it('should call log error message on console on XHR failure', function() {
		httpBackend.whenGET('/testerror').respond(500);
		//console.log = jasmine.createSpy("log");
		spyOn(console, 'log');
		searchFactory.fetchSearchResults('testerror');
		httpBackend.flush();
		expect(console.log).toHaveBeenCalledWith('XHR failed for getSearchResults.');
  });
});
