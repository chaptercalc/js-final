$(document).ready(function() {
  // create object instance of my Firebase database
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgVDDlreaJDdbc6Ddfo--VElc6nBEqoSw",
    authDomain: "js-finalproject.firebaseapp.com",
    databaseURL: "https://js-finalproject.firebaseio.com",
    storageBucket: "js-finalproject.appspot.com",
  };
  firebase.initializeApp(config);

  var myDBReference = firebase.database().ref();

  var sourceTemplate = $('#list-template').html();
  var template = Handlebars.compile(sourceTemplate);


// going to have to figure out how to hide the site until the user logs in. 
// basically just wrap everything in a div. hide/unhide.

$('#userCreateNew').submit(function(event) {
      event.preventDefault();
      var email = $('#email').val();
      var password = $('#password').val();

        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });

      /**
       * Sends an email verification to the user.
       */
      // function sendEmailVerification() {
      //   // [START sendemailverification]
      //   firebase.auth().currentUser.sendEmailVerification().then(function() {
      //     // Email Verification sent!
      //     // [START_EXCLUDE]
      //     alert('Email Verification Sent!');
      //     // [END_EXCLUDE]
      //   });
      //   // [END sendemailverification]
      // }
});


$('#message-form').submit(function(event) {
    event.preventDefault();


    var InsuranceCompany = $('#InsuranceCompany').val();
    var MP = $('#MP').val();
    var LinesOfBusiness = $('#LinesOfBusiness').val();
    var Underwriter = $('#Underwriter').val();
    var HitList = $('#hitList').val();

    var messagesReference = myDBReference.child('messages');


    messagesReference.push({
        Company: InsuranceCompany,
        MP: MP,
        LinesOfBusiness: LinesOfBusiness,
        Underwriter: Underwriter,
        HitList: HitList
    });


  });


$('#showAllMarkets').click(function(event){
  
  myDBReference.child('messages').on('child_added', function(results) { 
      
        var data = {
          Company: results.val().Company,
          MP: results.val().MP,
          LinesOfBusiness: results.val().LinesOfBusiness,
          Underwriter: results.val().Underwriter,
          HitList: results.val().HitList,
         // id: results.key()
        };

        var templateHTML = template(data);
        $('#messages-list').append(templateHTML);

    });

});


//query for only Auto markets
$('#Auto').click(function(event){

      myDBReference.child('messages').orderByChild('LinesOfBusiness').equalTo('Auto').on('child_added', function(results) { 

              var data = {
                Company: results.val().Company,
                MP: results.val().MP,
                LinesOfBusiness: results.val().LinesOfBusiness,
                Underwriter: results.val().Underwriter,
                HitList: results.val().HitList,
              };

              var templateHTML = template(data);
              $('#messages-list').append(templateHTML);

      });
});


$('#Excess').click(function(event){
  
      myDBReference.child('messages').orderByChild('LinesOfBusiness').equalTo('Excess').on('child_added', function(results) { 
      
              var data = {
                Company: results.val().Company,
                MP: results.val().MP,
                LinesOfBusiness: results.val().LinesOfBusiness,
                Underwriter: results.val().Underwriter,
                HitList: results.val().HitList,
              };

              var templateHTML = template(data);
              $('#messages-list').append(templateHTML);
      });
});




$('#empty').click(function(event){
  $('#messages-list').empty();
});


$('#SearchHitList').submit(function(event){
      event.preventDefault();

      var SHL = $('#SHLtext').val();

      myDBReference.child('messages').orderByChild('Company').equalTo(SHL).on('child_added', function(results) { 

              var data = {
                Company: results.val().Company,
                MP: results.val().MP,
                LinesOfBusiness: results.val().LinesOfBusiness,
                Underwriter: results.val().Underwriter,
                HitList: results.val().HitList,
              };

              var templateHTML = template(data);
              $('#messages-list').append(templateHTML);

      });
});





//       var templateHTML = template(data);
// ​
//       var $templateHTML = $(templateHTML);
// ​
//       $templateHTML.click(function() {
//         var messageId = $(this).data('id');
//         updateMessage(messageId);
//       })
//       $('#messages-list').append($templateHTML);
//     });
//   });


//   // Delete functionality
//   function deleteMessage(id) {
//     var messageReference = new Firebase('https://fan-message-board.firebaseio.com/messages/' + id);
// ​
//     messageReference.remove();
//   }


// $('#messages-list').click(function(event){

// var messagesReference = new Firebase('https://js-finalproject.firebaseio.com/messages/')

// messagesReference.remove();

// });


});

