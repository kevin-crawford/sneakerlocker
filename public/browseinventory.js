$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.clear();
	window.location = '/index.html';
});

function loadPublicInventory() {
	const username = localStorage.getItem('ownerInv');

		$.ajax({
			type: 'GET',
			url: `/${username}/inventory`,
			dataType: 'json',
			contentType: 'json/application'
		})
		.done(result => {
			
			const shoeCount = result.length;
			console.log(result);
			
			if(shoeCount == 0){
				$('#public-inventory').append(`
					<section role="region" class="shoeinfo-region">
						<h4> No Shoes Found!<h4>
					</section>
					`)
				} else {
					$('#public-inventory').append(`
				<div class="publiclocker-title">
					<h2>${username}'s Inventory</h2>
				</div>
				`)
			for(let i = 0; i < result.length; i++){
						let shoeNumber = (i + 1);
			$('#public-inventory').append(`
			<section role="region" aria-labeledby="shoe-info" class="shoeinfo-region">
			
				<div id="shoeNumber-inventory">
					<h3>${shoeNumber}</h3>
				</div>
				<div class="shoe-item wrapper">
					<div class="shoe-brand">
						<label>Brand</label>
						<p>${result[i].shoeBrand}</p>
					</div>
					<div class="shoe-model">
						<label>Model</label>
						<p>${result[i].shoeModel}</p>
					</div>
					<div class="shoe-color">
						<label>Color</label>
						<p>${result[i].primaryColor}</p>
					</div>
					<div class="shoe-size">
						<label>Size</label>
						<p>${result[i].shoeSize}</p>
					</div>
				</div>
			</section>
				`
				)};
			};
		});
	};
	function loadUserDashBoard() {
		console.log('getting user info')
	
		let username = localStorage.getItem('username');
		let shoeCount = localStorage.getItem('shoeCount');
	
		console.log(username,shoeCount);
	
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
	
function handleOnLoad(){
	$(loadPublicInventory);
	$(loadUserDashBoard);
}


$(handleOnLoad);