$(document).ready(function() {

var token = '269761860.af46082.4db827bfedc6424b868f37df74661f4f'
var userid = 269761860 // User ID - get it in source HTML of your Instagram profile or look at the next example :)
var num_photos = 4; // how much photos do you want to get

$('#All').click(function(event) {
    // prevents page refresh
    event.preventDefault();
	$.ajax({
		url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
		dataType: 'jsonp',
		type: 'GET',
		data: {access_token: token, count: num_photos},
		success: function(data){
	 		console.log(data);
				for(var i = 0; i < num_photos; i++){
				//console.log(data.data[i].images.low_resolution.url)

				$('body').append('<img src="'+data.data[i].images.low_resolution.url+'">'); 
				// data.data[x].images.low_resolution.url - URL of image, 306х306
				// data.data[x].images.thumbnail.url - URL of image 150х150
				// data.data[x].images.standard_resolution.url - URL of image 612х612
				// data.data[x].link - Instagram post URL 
				};
		}
	});
});


$('#Search').submit(function(event) {
    // prevents page refresh
    event.preventDefault();
    var hashtag = $('#instaTag').val();

    console.log(hashtag);
    num_photos = 4;
 
		$.ajax({
			url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
			dataType: 'jsonp',
			type: 'GET',
			data: {access_token: token, count: num_photos},
			success: function(data){
				console.log(data);
				for(var i = 0; i < num_photos; i++){
					$('body').append('<img src="'+data.data[i].images.low_resolution.url+'">'); 
				}
			},
			error: function(data){
				console.log(data);
			}
		});

	});
});