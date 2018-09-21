function loadOwners() {
	
	$.ajax({
		type: 'GET',
		url: `/browse`,
		dataType: 'json',
		contentType: 'json/application'
	})
	.done(result => {
		console.log(result);
			for(let i = 0; i < result.length; i++ ){
				$('#js-owner-browse').append(
					`
					<ul>
						<a href="#"><li> Username: ${result[i].username}</li>
						<li> # of Shoes: ${result[i].shoeCount}</li>
						<li> Shoe Size: ${result[i].shoeSize}</li></a>
					</ul>
					`
				)
		}
	})
};


// LOGOUT 
$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.clear();
	window.location = '/index.html';
});



$(loadOwners);


var MOCK_LOCKER_DATA = {
	"lockers": [
		{
			"locker_id": "000001",
			"owner_name": "Kevin Crawford",
			"shoe_count": 5,
			"user_shoe_size": 11.5,
			"inventory": {
				"item":
				{
					"shoe_brand": "Nike",
					"shoe_model": "presto",
					"primary_shoe_color": "red",
					"shoe_size": 11.5
				},
				"item":
				{
					"shoe_brand": "Jordan",
					"shoe_model": "4 Retro",
					"primary_shoe_color": "blue",
					"shoe_size": 11.5
				},
				"item": {
					"shoe_brand": "Adidas",
					"shoe_model": "Yeezy 500",
					"primary_shoe_color": "yellow",
					"shoe_size": 11.5
				},
				"item": {
					"shoe_brand": "Adidas",
					"shoe_model": "Ultraboost",
					"primary_shoe_color": "black",
					"shoe_size": 11.5
				},
				"item": {
					"shoe_brand": "Nike",
					"shoe_model": "Kobe XII",
					"primary_shoe_color": "green",
					"shoe_size": 11.5
				},
		},
	},
		{
			"locker_id": "000002",
			"author_name": "John Doe",
			"shoe_count": 2,
			"user_shoe_size": 9.5,
			"inventory": {
				"item": {
					"shoe_brand": "Nike",
					"shoe_model": "presto",
					"primary_shoe_color": "red",
					"shoe_size": 9.5
				},
				"item": {
					"shoe_brand": "Jordan",
					"shoe_model": "4 Retro",
					"primary_shoe_color": "blue",
					"shoe_size": 9.5
				}
		},
	},
	],
}


// function getLockers(callbackFn){
// 	setTimeout(function(){ callbackFn(MOCK_LOCKER_DATA)}, 100);
// }

// function displayLockers(data){
// 	for(index in data.lockers){
// 			$('body').append(
// 				'<h3> Author: ' + data.lockers[index].author_name + '</h3>',
// 				'<p>User Shoe Size: ' + data.lockers[index].user_shoe_size + '</p>',
// 			'<p>Shoe Count: ' + data.lockers[index].shoe_count + '</p>');
// 		}
// 	}
	
	
// function getAndDisplayLockers() {
// 	getLockers(displayLockers);
// }

// $(function() {
// 	getAndDisplayLockers();
// })

