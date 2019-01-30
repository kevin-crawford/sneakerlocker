function loadOwners() {
	$.ajax({
		type: 'GET',
		url: `/browse`,
		dataType: 'json',
		contentType: 'json/application'
	})
	.done(result => {
		for(let i = 0; i < result.length; i++ ){
			
			let shoeSize;
			let shoeNumber = (i + 1);
			if(result[i].shoeSize == undefined){
				$('#js-owner-browse').append(
					`
					<div class="owner-browse">
						<div class="shoeNumber-inventory">
							<h4>${shoeNumber}</h4>
						</div>
						<div class="shoe-item-owner">
							<label>OWNER</label>
							<p>${result[i].username}</p>
						</div>
						<div class="shoe-item-count">
							<label># of Shoes</label>
							<p>${result[i].shoeCount}</p>
						</div>
						<div>
							<label>Shoe Size</label>
							<p>N/A</p>
						</div>	
							<a href="#" class="go-to-ownerInv button" username="${result[i].username}">VIEW</a>
					</div>
					`)
			} else {
				let shoeSize = result[i].shoeSize;
				$('#js-owner-browse').append(
					`
					<div class="owner-browse">
					<div class="shoeNumber-inventory">
						<h4>${shoeNumber}</h4>
					</div>
					<div class="shoe-item-owner">
						<label>OWNER</label>
						<p>${result[i].username}</p>
					</div>
					<div class="shoe-item-count">
						<label># of Shoes</label>
						<p>${result[i].shoeCount}</p>
					</div>
					<div>
						<label>Shoe Size</label>
						<p>${result[i].shoeSize}</p>
					</div>	
						<a href="#" class="go-to-ownerInv button" username="${result[i].username}">VIEW</a>
				</div>
					`
				);
			};	
		};
	});
};

$('#js-owner-browse').on('click', 'a', (e) => {
	e.preventDefault();
	console.log('Owner Clicked');
	const owner = e.target;
	const browseOwnerInv = $(owner).attr('username');
	localStorage.setItem('ownerInv', browseOwnerInv);
	window.location = '/browseinventory.html';
	
});



// USER DASHBOARD
function loadUserDashBoard() {
	console.log('getting user info')

	let username = localStorage.getItem('username');
	let shoeCount = localStorage.getItem('shoeCount');
	console.log(username);
	// hide dashboard if not logged in , else show dashboard
	if(username === null){
		$('.dashboard').addClass('hidden');
		$('#my-account').addClass('hidden');
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
