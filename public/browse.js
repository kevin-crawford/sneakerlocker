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
						<a href="#" id="go-to-ownerInv" ownerId="${result[i].ownerId}">
							<p> Owner: ${result[i].username}
									Amount of Shoes: ${result[i].shoeCount}
									Shoe Size: ${result[i].shoeSize}
							</p>
						</a>
					</div>
					`
				);
		};
		$('#go-to-ownerInv').on('click', (e) => {
			e.preventDefault();
			console.log('Owner Clicked');
			const owner = e.target;
			const ownerId = $(owner).attr('ownerId');
			console.log(ownerId);
			// log ownerId in localStorage
			// Redirect user to publicview.html of selected owner.
		})
	});
};

// // GO TO PUBLIC VIEW OF OWNER LOCKER E.LISTENER
// function browseListener(event) {
// 	event.preventDefault();
// 	console.log('Owner Clicked');
// }

// function goToOwnerLocker(){
// 	window.location = '/publiclocker.html'
// 		// go to 
	
// }


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
