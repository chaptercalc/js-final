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
    var message = $('#InsuranceCompany').val();
    var message2 = $('#MP').val();
    var message3 = $('#LinesOfBusiness').val();
    var message4 = $('#Underwriter').val();
    var message5 = $('#hitList').val();

    var messagesReference = myDBReference.child('messages');

    messagesReference.push({
      message: {
        Company: message,
        MP: message2,
        LinesOfBusiness: message3,
        Underwriter: message4,
        HitList: message5
      }


    });

    // messagesReference.push({
    //   message: message + " | " + message2 + " | " + message3 + " | " + message4 + " | " + message5

    // });


  });

  myDBReference.child('messages').on('child_added', function(results) { // read docs on child_added
    results.forEach(function(message) {

      var data = {
        message: message.val() //How do I call disply the object?
      };

      var templateHTML = template(data);

      $('#messages-list').append(templateHTML);
    });
  });

// show all items in the data base, when called. 
// $('#showAll').click(function(event){
//   event.preventDefault();
//   myDBReference.on("value", function(message) {

//     var data = {
//       message: message.val()
//     };

//     var templateHTML = template(data);
//     $('#messages-list').append(templateHTML);
//   });

// });





// var messagesReference = new Firebase('https://js-finalproject.firebaseio.com/messages/')

// messagesReference.remove();


});