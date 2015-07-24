(function() {

	/**
	/* Flattens the results object into an array so ng-repeat can work
	/* over table rows.
	/* @param results looks like
	/* {'hello': [
  /*		 {'sentence': 'he said hello to her',
  /*      'filename': 'file1'},
  /*     {'sentence': 'don\'t you hello me',
  /*      'filename': 'file2'}
  /* ],
  /* 'hi': [
  /*     {'sentence': '"hi" is so casual',
  /*      'filename': 'file1'}
  /* ]}
	/* @returns an array that looks like 
	/* [
  /*     {'sentence': 'he said hello to her',
  /*      'filename': 'file1'},
  /*     {'sentence': 'don\'t you hello me',
  /*      'filename': 'file2'}
  /*     {'sentence': '"hi" is so casual',
  /*      'filename': 'file1'}
  /* ]
	*/
	angular.module('bookSearch')
			.filter('flattenRows', function() {
				return function(results) {
					var rows = [];
					angular.forEach(results, function(wordInfoList, word) {
						Array.prototype.push.apply(rows, wordInfoList);
					});
					console.log('flattenRows called');
					return rows;
				}
			});

})();
