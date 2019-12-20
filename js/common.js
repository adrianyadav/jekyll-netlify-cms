$(document).ready(function() {
	'use strict';

	var headerOverlay = $('.header__overlay'),
		menuOpenIcon = $('.nav__icon-menu'),
		menuCloseIcon = $('.ion-md-close'),
		menuList = $('.main-nav'),
		searchOpenIcon = $('.icon--search'),
		searchCloseIcon = $('.icon--close'),
		searchBox = $('.search');

	/* =======================
  // Hide Header
  ======================= */
	header();

	function header() {
		var initialScroll;
		$(window).scroll(function() {
			var scroll = $(this).scrollTop();
			if (scroll > initialScroll && initialScroll > 100) {
				$('.header').addClass('is-hide');
			} else {
				$('.header').removeClass('is-hide');
			}
			initialScroll = scroll;
		});
	}

	/* =======================
  // Menu and Search
  ======================= */
	menuOpenIcon.click(function() {
		menuOpen();
	});

	menuCloseIcon.click(function() {
		menuClose();
	});

	searchOpenIcon.click(function() {
		searchOpen();
	});

	searchCloseIcon.click(function() {
		searchClose();
	});

	headerOverlay.click(function() {
		menuClose();
		searchClose();
	});

	function menuOpen() {
		menuList.addClass('is-open');
		headerOverlay.addClass('is-visible');
	}

	function menuClose() {
		menuList.removeClass('is-open');
		headerOverlay.removeClass('is-visible');
	}

	function searchOpen() {
		searchBox.addClass('is-visible');
	}

	function searchClose() {
		searchBox.removeClass('is-visible');
	}

	/* =======================
  // Zoom Image
  ======================= */
	$('.page img, .post img').attr('data-action', 'zoom');
	$('.page a img, .post a img').removeAttr('data-action', 'zoom');

});
