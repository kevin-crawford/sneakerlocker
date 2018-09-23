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
				<b>Brand</b> <p>${result[i].shoeBrand}</p>
				<b>Model</b> <p>${result[i].shoeModel}</p>
				<b>Color</b> <p>${result[i].primaryColor}</p>
				<b>Size</b>	<p>${result[i].shoeSize}</p>
				<a href="#" class="edit-shoe" stockNumber="${result[i].stockNumber}">Edit</a>
				<a href="#" id="delete-shoe-btn" stockNumber="${result[i].stockNumber}"> DELETE </a>
				
				<form name="editshoe-form" role="form" id="shoeForm${[i]}" class="editform hidden">
				<fieldset>
				<legend> Edit Shoe </legend>
					<label for="editShoeBrand-query">Brand</label>
						<select name="Shoe Brand" class="editShoeBrand-query">
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
						<label for="editShoeModel-query">Model</label>
							<input title="Edit Shoe Model" type="text" class="editShoeModel-query" placeholder="Shoe Model" required>
						<label for="editShoeColor-query">Color</label>
							<select name="Shoe Color" class="editShoeColor-query">
								<option value="black">Black</option>
								<option value="Blue">Blue</option>
								<option value="Brown">Brown</option>
								<option value="Green">Green</option>
								<option value="Orange">Orange</option>
								<option value="Purple">Purple</option>
								<option value="Red">Red</option>
								<option value="White">White</option>
								<option value="Yellow">Yellow</option>
							</select>
						<label for="editShoeSize-query">Size</label>
						<select name="Shoe Size" class="editShoeSize-query">
							<option value="5">5</option>
							<option value="5.5">5.5</option>
							<option value="6">6</option>
							<option value="6.5">6.5</option>
							<option value="7">7</option>
							<option value="7.5">7.5</option>
							<option value="8">8</option>
							<option value="8.5">8.5</option>
							<option value="9">9</option>
							<option value="9">9.5</option>
							<option value="10">10</option>
							<option value="10.5">10.5</option>
							<option value="11">11</option>
							<option value="11.5">11.5</option>
							<option value="12">12</option>
							<option value="12.5">12.5</option>
							<option value="13">13</option>
							<option value="13.5">13.5</option>
							<option value="14">14</option>
							</select>
					<input type="submit" title="Edit Shoe Submission">
				</fieldset>
				</form>
			</div>
			`
		)};
	});
};


$('#view-public').click( e => {
	e.preventDefault();
	console.log('going to public locker');
	const username =	localStorage.getItem('username');
	$(loadPublicInventory(username));
})

// EDIT ACCOUNT EVENT LISTENER
$('#edit-account-link').click( e => {
	e.preventDefault();
	console.log('revealing');
	$('#edit-account').removeClass('hidden');
	$('#myinventory-section').addClass('hidden');
});

// EDIT ACCOUNT AJAX CALLS

$('#edit-account-form').submit( e => { 
	e.preventDefault();
	console.log('submitting edit owner');

	const username = $(event.currentTarget).find('#editUsername-query').val() || '';
	const password = $(event.currentTarget).find('#editPassword-query').val() || '';
	const firstName = $(event.currentTarget).find('#fn-query').val() || '';
	const lastName = $(event.currentTarget).find('#ln-query').val() || '';
	const email = $(event.currentTarget).find('#email-query').val() || '';
	const shoeSize = $(event.currentTarget).find('#shoeSize-query').val() || 'N/A';

	const token = localStorage.getItem('authToken');

	const editOwnerObj = {
		username: username,
		password: password,
		firstName: firstName,
		lastName: lastName,
		email: email,
		shoeSize: shoeSize
	};

	if( confirm('Are You Sure?')) {
	$.ajax({
		type: 'PUT',
		url: `/owner`,
		dataType: 'json',
		data: JSON.stringify(editOwnerObj),
		contentType: 'application/json',
		beforeSend: function(xhr){
			xhr.setRequestHeader('Authorization', 'Bearer ' + token)
		}
	})
	.done(result => {
		console.log(result);
		window.location.reload(true);
		});
	};
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
		<p id="username">Username <a href="myaccount.html">${username}</a></p>`
		);

		$('#js-shoeCount').append(`
		<p id="shoeCount">Shoe Count ${shoeCount}</p>
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

// EDIT INVENTORY FUNCTIONS // ADD // EDIT // DELETE
$('#add-shoe-btn').on('click', e => {
	e.preventDefault();
	$('#addShoe-form').removeClass('hidden');
});

$('#addShoe-form').submit( e => {
	e.preventDefault();
		const shoeBrand = $(event.currentTarget).find('#addBrand-query').val();
		const shoeModel = $(event.currentTarget).find('#addModel-query').val();
		const primaryColor = $(event.currentTarget).find('#addColor-query').val();
		const shoeSize = $(event.currentTarget).find('#addSize-query').val();

	const newShoeObj = {
		shoeBrand: shoeBrand,
		shoeModel: shoeModel,
		primaryColor: primaryColor,
		shoeSize: shoeSize
	};

	$(addItem(newShoeObj));
})


function addItem(newShoeObj) {

	const token = localStorage.getItem('authToken');
	console.log(token);

	$.ajax({
		type: 'POST',
		url: `/inventory/addShoe`,
		dataType: 'json',
		data: JSON.stringify(newShoeObj),
		contentType: 'application/json',
		beforeSend: function(xhr){
			xhr.setRequestHeader('Authorization', 'Bearer ' + token)
			console.log(newShoeObj);
		},
		error: function(err) {
			console.log(err);
		}
	})
	.done(result => {
		console.log(result, 'item added');
		window.location.reload();
	});
};


// EDIT ITEM LISTENER

$('#js-myinventory').on('click', '.edit-shoe', (e) => {
	e.preventDefault();
	console.log('Revealing');
	$(e.currentTarget).closest('.shoe-info').find('.editform').toggleClass('hidden');

	const item = e.target;
	const itemId = $(item).attr('stockNumber');

	console.log(itemId);
	localStorage.setItem('itemId', itemId);
});

$('#js-myinventory').on('submit','.editform', e => {
	e.preventDefault();

	const shoeBrand = $(e.currentTarget).closest('.editform').find('.editShoeBrand-query').val();
	const shoeModel = $(e.currentTarget).closest('.editform').find('.editShoeModel-query').val();
	const shoeColor = $(e.currentTarget).closest('.editform').find('.editShoeColor-query').val();
	const shoeSize = $(e.currentTarget).closest('.editform').find('.editShoeSize-query').val();
	const storageId = localStorage.getItem('itemId');

	const editShoeObj = {
		shoeBrand: shoeBrand,
		shoeModel: shoeModel,
		shoeColor: shoeColor,
		shoeSize: shoeSize
	}

	$(editItem(editShoeObj));
})


function editItem(item) {

	const itemId = localStorage.getItem('itemId');
	const token = localStorage.getItem('authToken');

	$.ajax({
		type: 'PUT',
		url: `/inventory/${itemId}/editShoe`,
		dataType: 'json',
		data: JSON.stringify(item),
		contentType: 'application/json',
		beforeSend: function(xhr){
			xhr.setRequestHeader('Authorization', 'Bearer ' + token)
		}
	})
	.done(result => {
		console.log(result);
		localStorage.removeItem('itemId');
	})
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

function deleteItem(itemId) {
const token = localStorage.getItem('authToken');
console.log(token);

	$.ajax({
		type: 'DELETE',
		url: `/inventory/${itemId}/deleteShoe`,
		dataType: 'json',
		contentType: 'application/json',
		beforeSend: function(xhr){
			xhr.setRequestHeader('Authorization', 'Bearer ' + token)
		}
	})
	.done(result => {
		console.log('item deleted');
		window.location.reload();
	})
};

function handleOnLoad() {
	$(loadOwnerInventory);
	$(loadUserDashBoard);
};

$(handleOnLoad);
