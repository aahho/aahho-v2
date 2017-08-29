$(document).ready(function () {
    $('#siteBody').animate({
        opacity: 1
    }, 500, 'linear');

    $('.tab-link').on("click",function(){
    	console.log("work-link is clicked",$(this).text());
    	var section = 'details-' + $(this).text().toLowerCase();
    	$('#details-section').hide( "drop", { direction: "down" }, "slow" );
    	$('#details-work').hide( "drop", { direction: "down" }, "slow" );
    	$('#details-tools').hide( "drop", { direction: "down" }, "slow" );
    	$('#details-team').hide( "drop", { direction: "down" }, "slow" );
    	$('#contact-section').hide( "drop", { direction: "down" }, "slow" );
    	$('#'+ section).show('scale',{ direction: "right" },400);

    })
});