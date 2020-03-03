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
		header.addClass('overlay');
		main.addClass('overlay');
	}

	function removeOverlay() {
		header.removeClass('overlay');
		main.removeClass('overlay');
	}

	/* =======================
  // Zoom Image
  ======================= */
	$('.page img, .post img').attr('data-action', 'zoom');
	$('.page a img, .post a img').removeAttr('data-action', 'zoom');
});

// Static comments
(function($) {
	var $comments = $('.js-comments');

	$('#comment-form').submit(function() {
		var form = this;

		$(form).addClass('disabled');
		$('#comment-form-submit').html(
			'<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Loading...'
		);

		$.ajax({
			type: $(this).attr('method'),
			url: $(this).attr('action'),
			data: $(this).serialize(),
			contentType: 'application/x-www-form-urlencoded',
			success: function(data) {
				$('#comment-form-submit').html('Submitted');
				$('.post__comments-form .js-notice')
					.removeClass('notice--danger')
					.addClass('notice--success');
				showAlert(
					'<strong>Thanks for your comment!</strong> It will show on the site once it has been approved.'
				);
			},
			error: function(err) {
				console.log(err);
				$('#comment-form-submit').html('Submit Comment');
				$('.post__comments-form .js-notice')
					.removeClass('notice--success')
					.addClass('notice--danger');
				showAlert(
					'<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again.'
				);
				$(form).removeClass('disabled');
			}
		});

		return false;
	});

	function showAlert(message) {
		$('.post__comments-form .js-notice').removeClass('hidden');
		$('.post__comments-form .js-notice-text').html(message);
	}
})(jQuery);
