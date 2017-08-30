$(document).ready(function () {
    $('#siteBody').animate({
        opacity: 1
	}, 500, 'linear');

    $('.tab-link').on("click",function(){
    	console.log("work-link is clicked",$(this).text());
    	var section = 'details-' + $(this).text().toLowerCase();
    	$('#modal-section').hide( "drop", { direction: "down" }, "fast" );
    	$('#details-work').hide( "drop", { direction: "down" }, "fast" );
    	$('#details-tools').hide( "drop", { direction: "down" }, "fast" );
    	$('#details-team').hide( "drop", { direction: "down" }, "fast" );
		$('#'+ section).show('scale',{ direction: "right" },400);

	});
	
	$(".abtn-home").fitText();
});

/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){
	
	$.fn.fitText = function( kompressor, options ) {

	// Setup options
	var compressor = kompressor || 1,
		settings = $.extend({
			'minFontSize' : Number.NEGATIVE_INFINITY,
			'maxFontSize' : Number.POSITIVE_INFINITY
		}, options);

	return this.each(function(){

		// Store the object
		var $this = $(this);

		// Resizer() resizes items based on the object width divided by the compressor * 10
		var resizer = function () {
		$this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
		};

		// Call once to set.
		resizer();

		// Call on resize. Opera debounces their resize by default.
		$(window).on('resize.fittext orientationchange.fittext', resizer);

	});

	};

})( jQuery );

(function () {

    // Initializing Firebase
    const config = {
        apiKey: "AIzaSyDXEqSlclCTKIMSvlyGvYTXd2v2Na1Hj8w",
        authDomain: "aahhocom.firebaseapp.com",
        databaseURL: "https://aahhocom.firebaseio.com",
        projectId: "aahhocom",
        storageBucket: "aahhocom.appspot.com",
        messagingSenderId: "1004628283797"
    };
    firebase.initializeApp(config);

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }

    const btnContact = document.getElementById('btnContact');

    firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      // @Himan @Tarun . Please Show this error message in proper way
      toastr["error"]("Failed to login. Please try again.");
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
        }
    });

    // Adding Contact Event
    if (btnContact) {
        btnContact.addEventListener('click', e => {
            console.log("came inside");
            var ref = firebase.database().ref('/website/contacts');
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            console.log(name, email, phone);
            var object =  {
                'contactName' : name,
                'contactEmail' : email,
                'contactPhone' : phone
            }
            console.log('object'+object);
            const promise = ref.push(object);
            promise.catch(e => console.log(e.message));
            promise.then(function() {
              window.location.reload();
            })
            console.log('created or pushed');
        });
    }
}());
