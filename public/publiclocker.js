// LOGOUT 
$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.clear();
	window.location = '/index.html';
});

function loadPublicInventory(username) {
	
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
			).on('click', (e) => {
				e.preventDefault();
				const item = e.target;
				const attr = $(item).attr('stockNumber');
				console.log(attr);
				
			});
			}
		}
	);
	};

function loadUserDashBoard() {
		console.log('getting user info')
		const username = localStorage.getItem('username');
		$('#js-username').prepend(`
		<p>Logged in As:</p>
		<a href="myaccount.html">${username}</a>`);
	}


function handleOnLoad(){
	$(loadPublicInventory);
	$(loadUserDashBoard);
}


$(handleOnLoad);