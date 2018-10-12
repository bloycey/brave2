// NOTICE!! THIS IS REQUIRED TO MAKE YOUR NETO SHOPPING CART WORK
// DO NOT REMOVE UNLESS YOU REALLY KNOW WHAT YOU ARE DOING

(function($) {
	$.extend({
		initPageFuncs: function() {
			// Ajax Wish List
			$.addToWishList({
				'class': 'wishlist_toggle',
				'textclass': 'wishlist_text',
				'htmlon': 'Remove From Wishlist',
				'htmloff': 'Add To Wishlist',
				'tooltip_css': 'whltooltips'
			});
			// Ajax Add To Cart
			$.addToCartInit({
				'cart_id' :  'cartcontents',
				'target_id': 'cartcontentsheader',
				'image_rel': 'itmimg'
			});

			$(".disp_ajax_templ").unbind();
			$(".disp_ajax_templ").change(function() {
				var sku = $(this).val();
				var rel = $(this).attr('rel');
				$.load_ajax_template(rel, {'sku':sku, 'showloading':true, 'procdata':'n'}, {onLoad: function (){$.initPageFuncs();}});
			});
			// This renders the instant search results - edit design of ajax results here
			$.initSearchField({
				'result_header'		: '<ul class="nav nav-list">',
				'result_body'		: '<li><a href="##url##" search-keyword="##keyword##"><img border="0" src="##thumb##" width="36" height="36"/><span class="title">##model##</span></a></li>',
				'result_footer'		: '</ul>',
				'category_header'	: '<ul class="nav nav-list">',
				'category_body'		: '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
				'category_footer'	: '</ul>'
			});
		},

// For child product multi-add to cart function
		checkValidQty: function() {
			var found = 0;
			$("#multiitemadd :input").each(function() {
				if ($(this).attr('id').match(/^qty/)) {
					if ($(this).val() > 0) {
						found = 1;
					}
				}
			});
			if (found == 0) {
				$.fancybox.open('<div>Please specify a quantity before adding to cart</div>');
				return false;
			}
			return true;
		},

		amend_total: function(ident) {
			var modifier = $("#price"+ident).val();
			var obj = $("#chk"+ident);
			var price = $("#product_price").val();
			var newprice = 0;
			if(obj.is(':checked')) newprice = (price*100 + modifier*100) / 100;
			else newprice = (price*100 - modifier*100) / 100;

			$("#product_price").val(newprice);

			$(".finalprice").html($.formatNumber(newprice, {'pf':'','dp':2,'sp':','}));
			return true;
		},

		modQtyByMulti: function(obj,act) {
			var mul = 1;
			var maxm;
			var minm = 0;
			var objid = obj.replace(/^qty/,'');
			if ($('#qty'+objid).length > 0) {
				if ($('#multiplier_qty'+objid).length > 0) {
					mul = $('#multiplier_qty'+objid).val();
				}
				if ($('#min_qty'+objid).length > 0) {
					minm = $('#min_qty'+objid).val();
				}
				if ($('#max_qty'+objid).length > 0) {
					maxm = $('#max_qty'+objid).val();
				}

				var cur = $('#'+obj).val();
				if (isNaN(cur)) {
					cur = 0;
				}

				if (act == 'add') {
					cur = parseInt(cur) + parseInt(mul);
					if (!isNaN(maxm) && cur > maxm) {
						cur = maxm;
					}
				}
				else if (act == 'subtract') {
					cur = parseInt(cur) - parseInt(mul);
					if (cur < minm) {
						cur = minm;
					}
				}

				$('#qty'+objid).val(cur);
			}
		}
	});
})(jQuery);

$(document).ready(function() {
	// Popup Credit Card CCV Description At Checkout
	$("#card_ccv").fancybox();

	// Popup Terms At Checkout
	$("#terms").fancybox({
		'width' : 850,
		'height': 650
	});

	// Jquery Ui Date Picker
	$(".datepicker").datepicker({ dateFormat: "dd/mm/yy" });
	$.initPageFuncs();

	// Carousel
	$('.carousel').carousel();

});

$(".btn-loads").click(function(){
	$(this).button("loading");
	var pendingbutton=this;
	setTimeout(function(){
		$(pendingbutton).button("reset");
	},3000);
});

// Fancybox
$(document).ready(function() {
	$(".fancybox").fancybox();
});

// Tooltip
$('.tipsy').tooltip({trigger:'hover',placement:'bottom'});

// Who needs AddThis?
function windowPopup(url, width, height) {
	// Calculate the position of the popup so
	// it’s centered on the screen.
	var left = (screen.width / 2) - (width / 2),
		top = (screen.height / 2) - (height / 2);
	window.open(url,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
}
$(".js-social-share").on("click", function(e) {
	e.preventDefault();
	windowPopup($(this).attr("href"), 500, 300);
});

$('.nToggleMenu').click(function(){
	var toggleTarget = $(this).attr('data-target')
	$(toggleTarget).slideToggle();
});
var focused = $('body');
var lastFocused = $('body');
// Capture the current element the user focused in
$(document).on('focusin', function(){ focused = document.activeElement; });
// Capture the last item focused
function updateFocused(){ lastFocused = focused; };
// Place focus on popup
$(document).ready(function(){
	var popUp = document.getElementById('npopupDesc');
	// Configuration of the observer:
	var config = {childList: true};
	// Create an observer instance
	var popUpObserver = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		// Initial observer
		if(mutation.addedNodes["0"]){
			updateFocused();
			// focus on the popup
			$(popUp).attr('tabindex', '-1').focus();
		}else{
			$(popUp).attr('tabindex', '').blur();
			// Observer closing popup
			$(lastFocused).focus();
		}
	  });
	});
	// Pass in the target node, as well as the observer options
	if(popUp){ popUpObserver.observe(popUp, config);}
});


$(document).ready(function(){

	function openNav() {
		$('body').toggleClass("overflow-hidden");
	}

	function closeNav() {
		$('.menu-wrapper').find($('.fa')).removeClass('fa-times').addClass('fa-bars');
		$('#mobile-menu-toggle').find('.fa').removeClass('fa-times').addClass('fa-bars');
		$('.header-menu-item-wrapper').removeClass('in');
		$('body').removeClass("overflow-hidden");
	}

	$(window).resize(function(){
		if($(window).width() > 992) {
		 closeNav();
		}
	})

	$('#triggerMenu').click(function(){
		openNav();
	})

	$('#closeNav').click(function(){
		closeNav();
	})

	$(document).on("click", ".active-overlay", function(){
		closeNav();
	})

	$(window).resize(function(){
		if(window.width > 991) {
			closeNav();
		}
		
	})
})

	
	//Toggle Menu open and close btns

	
	$('#mobile-menu-toggle').click(function(){
		$(this).find($('.fa')).toggleClass('fa-bars fa-times');
		$('.menu-wrapper').find($('.fa')).toggleClass('fa-bars fa-times');
	})

	$('.menu-wrapper').click(function(){
		$(this).find($('.fa')).toggleClass('fa-bars fa-times');
		$('#mobile-menu-toggle').find($('.fa')).toggleClass('fa-bars fa-times');
	})

	$('.category-toggle').click(function(){
		$(this).find($('.fa')).toggleClass('rotate180');
	})

	function toggleCatMenu(){
		$('.mobile-menu-items-wrapper').toggleClass('categoriesOpen');
	}

	$('.category-trigger-btn').click(function(){
			toggleCatMenu();
	})

	$('.closeCatMenu').click(function(){
		toggleCatMenu();
	})

	$('#catMenuOverlay').click(function(){
		toggleCatMenu();
	})


	$('#return-menu').click(function(){
		$('.mobile-menu-items-wrapper').toggleClass('categoriesOpen');
	})

	$("[data-href]").click(function() {
		window.location.href = $(this).attr("data-href");
		return false;
	});

	$('.thumbnail-image-wrapper').mouseenter(function(){
		if($(window).width() > 1199) {
		var img = $(this).find("img");
		var alt = $(img).data('alt');
		var original = $(img).data('original');
		if(alt !== '') {
			$(img).attr('src', alt);
		}
	}
	}).mouseleave(function(){
		if($(window).width() > 1199) {
		var img = $(this).find("img");
		var original = $(img).data('original');
		$(img).attr('src', original);
		}
	})

/*******/

$('#_jstl__buying_options').on('click', '.js-notifymodal-in-stock', function(e){
    e.preventDefault();
    // Get values
    var sku = $(this).attr('data-sku');
    var $wrapper = $('#notifymodal .checkbox');
    var $terms = $('#notifymodal .terms_box');
    var $helpText = $('#notifymodal .checkbox .help-block');
    // Validate form
    if(!$.isChecked($terms)){
        $wrapper.addClass('has-error');
        $helpText.removeClass('hidden');
        return false;
    }else{
        $wrapper.removeClass('has-error');
        $helpText.addClass('hidden');
        // Dismiss modal
        $('#notifymodal').modal('hide');
        // Send information
        $.addNotifyBackInStock(sku, '');
        $terms.attr('checked', false);
        return true;
    }
});
