// LOGOUT 
$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.clear();
	window.location = '/index.html';
});

function loadPublicInventory() {
	const username = localStorage.getItem('username');
		$.ajax({
			type: 'GET',
			url: `/${username}/inventory`,
			dataType: 'json',
			contentType: 'json/application'
		})
		.done(result => {
			console.log(result);
			for(let i = 0; i < result.length; i++){
			$('#public-inventory').append(
				`
				<div>
					<p>Brand: ${result[i].shoeBrand}</p>
					<p>Model: ${result[i].shoeModel}</p>
					<p>Color: ${result[i].primaryColor}</p>
					<p>Size: ${result[i].shoeSize}</p>
				</div>
				`
			)};
		});
	};
	function loadUserDashBoard() {
		console.log('getting user info')
	
		let username = localStorage.getItem('username');
		let shoeCount = localStorage.getItem('shoeCount');
	
		console.log(username,shoeCount);
	
		// hide dashboard if not logged in , else show dashboard
		if(username === null){
			$('#dashboard').addClass('hidden');
		} 
		else {
			$('#js-userinfo').append(`
			<p id="username">Username <a href="myaccount.html">${username}</a></p>
			<p id="shoeCount">Shoe Count ${shoeCount}</p>`
			);
		};
	};
	
function handleOnLoad(){
	$(loadPublicInventory);
	$(loadUserDashBoard);
}


$(handleOnLoad);