(function() {

	/**
	/* Formats the results object so that the sentences for each word has the
	/* html markup for highlighting.
	/* @param results object
	/* @returns results object
	*/
	angular.module('bookSearch')
			.filter('highlightWords', ['$sce', function($sce) {
				return function(sentence, word) {
					if (sentence && word) {
						return $sce.trustAsHtml(sentence.replace(
							new RegExp('('+word+')', 'gi'), '<span class="highlighted">$1</span>'));
					} else {
						return sentence
					}
				}
			}]);

})();
