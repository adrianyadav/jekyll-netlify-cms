SimpleJekyllSearch({
	searchInput: document.getElementById('js-search-input'),
	resultsContainer: document.getElementById('js-results-container'),
	json: '../search.json',
	searchResultTemplate:
		'<li class="search-results__item"><a class="search-results__link" href="{url}">{title}</a></li>',
	noResultsText: '<li class="no-results">No results found</li>'
});
