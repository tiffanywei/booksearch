describe('flatten rows', function() {
	var flattenRowsFilter;

	beforeEach(module('bookSearch'));
	beforeEach(inject(function(_flattenRowsFilter_){
		flattenRowsFilter = _flattenRowsFilter_;
	}));

	it('should return an empty array when passed an empty object', function() {
		expect(flattenRowsFilter({})).toEqual([]);
	});

	it('should flatten rows', function() {
		var test_results = {
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
		}
		var expected_results = [
			{
					'sentence': 'he said hello to her',
					'filename': 'file1'
			},
			{
					'sentence': 'don\'t you hello me',
					'filename': 'file2'
			},
			{
					'sentence': '"hi" is so casual',
					'filename': 'file1'
			}
		]
		expect(flattenRowsFilter(test_results)).toEqual(expected_results);	
	});
});
