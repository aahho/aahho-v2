$(document).ready(function () {
    $('#siteBody').animate({
        opacity: 1
	}, 500, 'linear');

    var oldSection = ".modal-section";
    var windowWidth = $(window).width();

    $(window).resize(function () {
        windowWidth = $(window).width();
    });

    if(windowWidth < 577) {
        oldSection = undefined;
    }

    $('.tab-link').on("click",_.debounce(function(){
        console.log("work-link is clicked",$(this).text());
        var tabLink = $(this).text().toLowerCase();
        var section = 'details-' + tabLink;

        $(oldSection).hide("slide", {direction: "left"}, 200, function () {
            if(windowWidth < 768 || windowWidth >= 992) {
                $('#'+section).show( "slide", { direction: "right" }, 200);
                oldSection = '#details-' + tabLink;
                console.log(oldSection);
            }
        });

        if(windowWidth >= 768 && windowWidth < 992) {
            $("#tab-section").hide("slide", {direction: "left"}, 200, function () {
                $('#'+section).show( "slide", { direction: "right" }, 200);
                oldSection = '#details-' + tabLink;
            });
        }
    }, 100));
    
    $(".close-modal").on("click", function () {
        $(oldSection).hide("slide", {direction: "left"}, 200, function () {
            $(".modal-section").show("slide", {direction: "right"}, 200);
            if(windowWidth < 577) {
                oldSection = undefined;
            } else {
                oldSection = ".modal-section";
            }
        });
        if(windowWidth >= 768 && windowWidth < 992) {
            $("#tab-section").show("slide", {direction: "right"}, 200)
        }
    });

    $(".team-img").hover(_.debounce(function () {
        console.log("team img hover in");
        var img = $(this).children(".img-fluid");
        var detailsDiv = img.attr("alt");
        $("#"+detailsDiv).show("drop",{direction:"down"}, 200);
        window.setTimeout(function () {
            $("#"+detailsDiv).hide("drop",{direction: "down"}, 200);
        }, 2000);
    }, 50), function () {
        console.log("team img hover out");
        var img = $(this).children(".img-fluid");
        var detailsDiv = img.attr("alt");
        $("#"+detailsDiv).hide("drop",{direction: "down"}, 400);
    });
	
	// $(".abtn-home").fitText();

    //form validation
    $('#contactName').keyup(function(){
        var data = $(this).val();
        console.log(data);
        if(data.length > 2){
            $(this).parent('div').removeClass('has-warning').addClass('has-success');
        }
        else{
            $(this).parent('div').removeClass('has-success').addClass('has-warning');
        }    
    });
    var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    $('#contactEmail').keyup(function(e){
        var data = $('#contactEmail').val().trim();
        console.log(data);
        if(data.match(pattern)){
            $(this).parent('div').removeClass('has-warning').addClass('has-success');
        }
        else{
            $(this).parent('div').removeClass('has-success').addClass('has-warning');
        }    
    });
    $('#contactPhone').keyup(function(e){
        var data = $('#contactPhone').val().trim();
        console.log(data);
        if(data.length > 9){
            $(this).parent('div').removeClass('has-warning').addClass('has-success');
        }
        else{
            $(this).parent('div').removeClass('has-success').addClass('has-warning');
        }    
    });
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

    var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
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
    var contactForm = $("#cform");
    contactForm.submit(function (ev) {
        ev.preventDefault();
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
        if(object.contactName.length > 2 && object.contactEmail.match(pattern) && object.contactPhone.length > 9){
            console.log('object'+object);
            const promise = ref.push(object);
            promise.catch(e => console.log(e.message));
            promise.then(function() {
                //$('#contactModal').modal('toggle');  
                //window.location.reload();
                toastr.success("Thank you for contacting us. We'll get back to you shortly");
            })
            console.log('created or pushed');
        }
    });

}());
