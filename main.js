$(document).ready(function() {
  // create object instance of my Firebase database
  var myDBReference = new Firebase('https://js-finalproject.firebaseio.com/');

  var sourceTemplate = $('#list-template').html();
  var template = Handlebars.compile(sourceTemplate);

  // define submit event listener/handler
  $('#message-form').submit(function(event) {
    // prevents page refresh
    event.preventDefault();

    // grab user input
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
        };

        var templateHTML = template(data);
        $('#messages-list').append(templateHTML);

    });

});


//query for only ENVmarkets
$('#envMarkets').click(function(event){
   //console.log(myDBReference.child('messages').ref().orderByChild('Company'));
      myDBReference.child('messages').ref().orderByChild('Company').equalTo('Auto').on('child_added', function(results) { 

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


//$('#construction').click(function(event){
  
  myDBReference.child('messages').on('child_added', function(results) { 
      

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

//});

$('#envMarkets').click(function(event){
   //console.log(myDBReference.child('messages').ref().orderByChild('Company'));
      myDBReference.child('messages').ref().orderByChild('Company').equalTo('Auto').on('child_added', function(results) { 

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

