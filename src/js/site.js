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

    const btnContact = document.getElementById('btnContact');

    firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      // @Himan @Tarun . Please Show this error message in proper way
      alert('Failed to login. Please Try Again');
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