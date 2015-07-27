(function() {

	angular.module('bookSearch')
			.controller('bookSearchController', [
				'searchFactory',
				'flattenRowsFilter',
				'highlightWordsFilter',
				bookSearchController])

	function bookSearchController( searchFactory, flattenRowsFilter, highlightWordsFilter) {
		var vm = this;
		/**
		/* bound to form text
		/* @type string
		*/
		vm.query;
		vm.results;
		vm.searchFactory = searchFactory;
		vm.sendSearchRequest = sendSearchRequest;

		function sendSearchRequest() {
			return vm.searchFactory.fetchSearchResults(vm.query)
					.then(function(data) {
						processResults_(data);
						console.log(vm.results);
						return vm.results;
			});
		}

		function processResults_(results) {
			vm.results = flattenRowsFilter(results);
		}
	}
})();
