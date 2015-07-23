function bookSearchController(searchService) {
  var vm = this;
	vm.query = query;
	vm.sendSearchRequest = sendSearchRequest;

	function sendSearchRequest() {
		return vm.searchService.getSearchResults(vm.query)
				.then(function(data) {
					vm.results = data;
					return vm.results_;
		});;

	function getbookSearchResults() {
		return vm.results_;
	}
}
