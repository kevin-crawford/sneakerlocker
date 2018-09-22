function loadOwnerInventory() {
let username = localStorage.getItem('username');

	$.ajax({
		type: 'GET',
		url: `/${username}/inventory`,
		dataType: 'json',
		contentType: 'json/application',
		error: function() {
			$('#js-myinventory').append(`
			<p>Please Log In To View Your Inventory</p>`);
		}
	})
	.done(result => {
		console.log(result);
		const shoeCount = result.length;
		localStorage.setItem('shoeCount', shoeCount);

		for(let i = 0; i < result.length; i++){
		$('#js-myinventory').append(
			`
			<div class="shoe-info">
				<p>Brand: ${result[i].shoeBrand}</p>
				<p>Model: ${result[i].shoeModel}</p>
				<p>Color: ${result[i].primaryColor}</p>
				<p>Size: ${result[i].shoeSize}</p>
				<a href="#" id="edit-shoe" stockNumber="${result[i].stockNumber}">Edit</a>
				<a href="#" id="delete-shoe-btn" stockNumber="${result[i].stockNumber}"> DELETE </a>
				
			</div>
				<form name="editshoe-form" role="form" class="editshoe-form hidden">
				<fieldset>
				<legend> Edit Shoe </legend>
					<label>Brand</label>
						<select name="Shoe Brand">
							<option value="Nike">Nike</option>
							<option value="Adidas">Adidas</option>
							<option value="Puma">Puma</option>
							<option value="Under Armor">Under Armor</option>
							<option value="Jordan">Jordan</option>
							<option value="Vans">Vans</option>
							<option value="Converse">Converse</option>
							<option value="Reebok">Reebok</option>
							<option value="New Balance">New Balance</option>
							<option value="Sketchers">Sketchers</option>
							<option value="Other">Other</option>
						</select>
						<br>
						<label>Model</label>
							<input title="Edit Shoe Model" type="text" placeholder="Shoe Model">
							<br>
						<label>Color</input>
							<input title="Edit Shoe Color" type="text" placeholder="Shoe Color">
							<br>
						<label>Size</label>
						<select name="Shoe Size">
							<option value="5">5</option>
							<option value="5.5">5.5</option>
							<option value="6">6</option>
							<option value="6.5">6.5</option>
							<option value="7">7</option>
							<option value="7.5">7.5</option>
							<option value="8">8</option>
							<option value="8">8.5</option>
							<option value="9">9</option>
							<option value="9">9.5</option>
							<option value="10">10</option>
							<option value="10.5">10.5</option>
							<option value="11">11.5</option>
							<option value="12">12</option>
							<option value="12.5">12.5</option>
							<option value="13">13</option>
							<option value="13.5">13.5</option>
							<option value="14">14</option>
					<input title="Edit Shoe Submission" type="submit">
				</fieldset>
			`
		)};
	});
};

// DELETE ITEM LISTENER
$('#js-myinventory').on('click', '#delete-shoe-btn', (e) => {
	e.preventDefault();
		const item = e.target;
		const itemId = $(item).attr('stockNumber');
	console.log(itemId);
	
	let retVal = confirm("Are You Sure?");
	if( retVal == true ){
		return deleteItem(itemId);
	} else {
		return false;
	};
});

// EDIT ITEM LISTENER

$('#js-myinventory').on('click', '#edit-shoe', (e) => {
	e.preventDefault();
	console.log('Revealing');
	$('.editshoe-form').removeClass('hidden');
});


// EDIT ACCOUNT EVENT LISTENER
$('#edit-account-link').click( (e) => {
	e.preventDefault();
	console.log('revealing');
	$('#edit-account').removeClass('hidden');
});

// USER DASHBOARD
function loadUserDashBoard() {
	console.log('getting user info')

	let username = localStorage.getItem('username');
	let shoeCount = localStorage.getItem('shoeCount');

	// hide dashboard if not logged in , else show dashboard
	if(username === null){
		$('#dashboard').addClass('hidden');
	} 
	else {
		$('#js-username').append(`
		<p>Logged in As: <a href="myaccount.html">${username}</a></p>`
		);

		$('#js-shoeCount').append(`
		<p>Shoe Count: ${shoeCount}</p>
		`);
	}
}

// LOGOUT 
$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.clear();
	window.location = '/index.html';
});

function addItem() {
	$.ajax({
		type: 'POST',
		url: `/inventory/${itemID}/addShoe`,
		dataType: 'json',
		data: JSON.stringify(result),
		contentType: 'json/application'
	})
	.done(result => {
		// append item to inventory
		// increment count 
	})
};

function editItem() {


	$.ajax({
		type: 'PUT',
		url: `/inventory/${itemID}/editShoe`,
		dataType: 'json',
		data: JSON.stringify(result),
		contentType: 'json/application'
	})
	.done(result => {
		// edit item 
	})
};

function deleteItem(itemId) {
const token = localStorage.getItem('authToken');
console.log(token);

	$.ajax({
		type: 'DELETE',
		url: `/inventory/${itemId}/deleteShoe`,
		dataType: 'json',
		contentType: 'json/application',
		Headers: {
			'Authorization': 'Bearer ' + token
		}
	})
	.done(result => {
		console.log('item deleted');
		// decrement count
	})
};

function handleOnLoad() {
	$(loadOwnerInventory);
	$(loadUserDashBoard);
};

$(handleOnLoad);
