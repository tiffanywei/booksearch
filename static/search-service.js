(function() {

	angular.module('bookSearch')
			.factory('searchFactory', ['$http', searchFactory]);

	/**
	/* Handles the XHR request to the server for getting search results.
	*/
	function searchFactory($http) {
		var isReady_ = true;
		var http_ = $http;
		var service = {
			isLoading: isLoading,
			fetchSearchResults: fetchSearchResults,
		};
		return service;

		// Function declarations below

		function isLoading() {
			return !isReady_;
		}

		function fetchSearchResults(query) {
			// isReady_ = false will trigger ajax spinner gif
			isReady_ = false;
			return http_.get('/'.concat(query))
					.then(fetchSearchResultsSuccess)
					.catch(fetchSearchResultsFailure)
					.finally(function() { isReady_ = true });

			function fetchSearchResultsSuccess(response) {
				return response.data;
			}

			function fetchSearchResultsFailure(error) {
				console.log('XHR failed for getSearchResults.');
			}
		}
	}
})();
