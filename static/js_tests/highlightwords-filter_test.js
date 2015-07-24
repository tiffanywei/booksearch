describe('highlight words', function() {
	var $sce, highlightWordsFilter;

	beforeEach(module('bookSearch'));
	beforeEach(inject(function(_$sce_, _highlightWordsFilter_){
		$sce = _$sce_;
		highlightWordsFilter = _highlightWordsFilter_;
	}));

	it('should return an empty object when passed an empty object', function() {
		expect(highlightWordsFilter({})).toEqual({});
	});

	it('should highlight words', function() {
		var filtered_test_results = highlightWordsFilter({
			'hello': [
					{
							'sentence': 'he said hello to her',
							'filename': 'file1'
					},
					{
							'sentence': 'don\'t you hello me',
							'filename': 'file2'
					}
			],
			'hi': [
					{
							'sentence': '"hi" is so casual',
							'filename': 'file1'
					}
			]
		})
		var expected_results = {
			'hello': [
					{
							'sentence': 'he said <span class="highlighted">hello</span> to her',
							'filename': 'file1'
					},
					{
							'sentence': 'don\'t you <span class="highlighted">hello</span> me',
							'filename': 'file2'
					}
			],
			'hi': [
					{
							'sentence': '"<span class="highlighted">hi</span>" is so casual',
							'filename': 'file1'
					}
			]
		}
		expect($sce.getTrustedHtml(filtered_test_results['hello'][0].sentence))
			.toEqual(expected_results['hello'][0].sentence);	
		expect($sce.getTrustedHtml(filtered_test_results['hello'][1].sentence))
			.toEqual(expected_results['hello'][1].sentence);	
		expect($sce.getTrustedHtml(filtered_test_results['hi'][0].sentence))
			.toEqual(expected_results['hi'][0].sentence);	
	});
});
