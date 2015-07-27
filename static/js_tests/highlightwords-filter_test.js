describe('highlight words', function() {
	var $sce, highlightWordsFilter;

	beforeEach(module('bookSearch'));
	beforeEach(inject(function(_$sce_, _highlightWordsFilter_){
		$sce = _$sce_;
		highlightWordsFilter = _highlightWordsFilter_;
	}));

	it('should return an empty string when passed an empty sentence and empty word', function() {
		expect($sce.getTrustedHtml(highlightWordsFilter("", ""))).toEqual("");
	});

	it('should highlight words', function() {
		test_sentence = 'he said hello to her'
		expected_sentence = 'he said <span class="highlighted">hello</span> to her'
		expect($sce.getTrustedHtml(highlightWordsFilter(test_sentence, 'hello')))
			.toEqual(expected_sentence)
	});

	it('should return original sentence if word not in sentence', function() {
		test_sentence = 'he said hello to her'
		expect($sce.getTrustedHtml(highlightWordsFilter(test_sentence, 'bye')))
			.toEqual(test_sentence)
	});
});
