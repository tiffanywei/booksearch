function searchService($http) {
	var isReady_ = false;
	var http_ = $http;
	var service = {
		isLoading: isLoading,
		fetchSearchResults: fetchSearchResults,
	};
	return service;

	// Function declarations below

	function isLoading() {
		return !isReady;
	}

	function fetchSearchResults(query) {
		return $http.get('/test_results')
				.then(fetchSearchResultsSuccess)
				.catch(fetchSearchResultsFailure);

		function fetchSearchResultsSuccess(response) {
			return response.data.results;
		}

		function fetchSearchResultsFailure(error) {
			logger.error('XHR failed for getSearchResults.');
		}

	}

}
