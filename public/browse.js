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
					<div id="owner-browse">
						<a href="#" class="go-to-ownerInv" username="${result[i].username}">
							Owner: ${result[i].username}
							Amount of Shoes: ${result[i].shoeCount}
							Shoe Size: ${result[i].shoeSize}
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
	const username = $(owner).attr('username');
	localStorage.setItem('otherUser', username);
	console.log(username);
	
})



// USER DASHBOARD
function loadUserDashBoard() {
	console.log('getting user info');

	const username = localStorage.getItem('username');
	const shoeCount = localStorage.getItem('shoeCount');

	if( username === null ){
		$('#dashboard').addClass('hidden');
	} 
	else {
		$('#js-username').append(`
		<p>Logged in As: <a href="myaccount.html">${username}</a></p>`
		);
		$('#js-shoeCount').append(`
			<p>Shoe Count: ${shoeCount}</p>
		`);
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
