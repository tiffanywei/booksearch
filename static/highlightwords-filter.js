(function() {

	/**
	/* Formats the results object so that the sentences for each word has the
	/* html markup for highlighting.
	/* @param results object
	/* @returns results object
	*/
	angular.module('bookSearch')
			.filter('highlightWords', ['$sce', function($sce) {
				return function(results) {
					angular.forEach(results, function(wordInfoList, word) {
						angular.forEach(wordInfoList, function(wordInfo) {
							wordInfo.sentence = $sce.trustAsHtml(wordInfo.sentence.replace(
								new RegExp('('+word+')', 'gi'), '<span class="highlighted">$1</span>'));
						});
					});
					return results;
				}
			}]);

})();
