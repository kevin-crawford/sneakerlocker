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
			
			let shoeSize;

			if(result[i].shoeSize == undefined){
				let shoeSize = 'N/A';
			} else {
				let shoeSize = result[i].shoeSize;
			}
				$('#js-owner-browse').append(
					`
					<div class="owner-browse">
						<a href="#" class="go-to-ownerInv" username="${result[i].username}">
							Owner: ${result[i].username}
							Shoes: ${result[i].shoeCount}
							Shoe Size: ${shoeSize}
						</a>
					</div>
					`
				);
		};
	});
};

$('#js-owner-browse').on('click', 'a', (e) => {
	e.preventDefault();
	console.log('Owner Clicked');
	const owner = e.target;
	const browseOwnerInv = $(owner).attr('username');
	localStorage.setItem('ownerInv', browseOwnerInv);
	console.log(username);
	window.location = '/browseinventory.html';
	
});



// USER DASHBOARD
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
		<p id="username"><a href="myaccount.html">${username}</a></p>
		<p id="shoeCount">Shoe Count ${shoeCount}</p>`
		);
	};
};

// LOGOUT 
$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.clear();
	window.location = '/index.html';
});

function handleOnLoad() {
	$(loadUserDashBoard);
	$(loadOwners);
};


$(handleOnLoad);
