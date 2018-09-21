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
					<p>Shoe Model: ${result[i].shoeModel}</p>
					<p>Primary Color: ${result[i].primaryColor}</p>
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

	$(loadPublicInventory);