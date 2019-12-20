$(document).ready(function() {
	'use strict';

	
		var menuOpenIcon = $('.icon--menu'),
		menuCloseIcon = $('.icon--close-menu'),
		menuList = $('.navigation'),
		searchOpenIcon = $('.icon--search'),
		searchCloseIcon = $('.icon--close-search'),
		searchBox = $('.search'),

		header = $('.header'),
		main = $('#main');


	/* =======================
  // Menu and Search
  ======================= */
	menuOpenIcon.click(function() {
		menuOpen();
		addOverlay();
	});

	menuCloseIcon.click(function() {
		menuClose();
		removeOverlay();
	});

	searchOpenIcon.click(function() {
		searchOpen();
	});

	searchCloseIcon.click(function() {
		searchClose();
	});


	function menuOpen() {
		menuList.addClass('navigation--active');
		addOverlay();
	}

	function menuClose() {
		menuList.removeClass('navigation--active');
		removeOverlay();
	}

	function searchOpen() {
		searchBox.addClass('is-visible');
	}

	function searchClose() {
		searchBox.removeClass('is-visible');
	}

	function addOverlay() {
		header.addClass("overlay");
		main.addClass("overlay");
	}

	function removeOverlay() {
		header.removeClass("overlay");
		main.removeClass("overlay");
	}

	/* =======================
  // Zoom Image
  ======================= */
	$('.page img, .post img').attr('data-action', 'zoom');
	$('.page a img, .post a img').removeAttr('data-action', 'zoom');
});
