(function() {

	angular.module('bookSearch')
			.controller('bookSearchController', ['searchFactory', bookSearchController])

	function bookSearchController(searchFactory) {
		var vm = this;
		/**
		/* bound to form text
		/* @type string
		*/
		vm.query;
		vm.results_;
		vm.searchFactory = searchFactory;
		vm.sendSearchRequest = sendSearchRequest;
		vm.getBookSearchResults = getBookSearchResults;

		function sendSearchRequest() {
			return vm.searchFactory.fetchSearchResults(vm.query)
					.then(function(data) {
						vm.results = data;
						return vm.results_;
			});
		}

		function getBookSearchResults() {
			return vm.results_[vm.query];
		}
	}
})();
