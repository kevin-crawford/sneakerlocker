function loadOwnerInventory() {
let username = localStorage.getItem('username');

	if (username === null) {
		window.location = '/index.html'
	} else {
	$.ajax({
		type: 'GET',
		url: `/${username}/inventory`,
		dataType: 'json',
		contentType: 'json/application',
		error: function() {
			$('#js-myinventory').append(`
			<div  id="login-redirect">
				<a href='/index.html'>Please Log In To View Your Inventory</a>
			</div>
			`);
		}
	})
	.done(result => {
		const shoeCount = result.length;
		localStorage.setItem('shoeCount', shoeCount);

		if(shoeCount == 0){
			$('#js-myinventory').append(`
			<section role="region" class="shoeinfo-region">
				<h4> No Shoes Found! Please add a shoe.<h4>
			</section>
			`)
		} else {
		for(let i = 0; i < result.length; i++){
			let shoeNumber = (i + 1);
		$('#js-myinventory').append(`
		<section role="region" class="shoeinfo-region">
		<div class="shoeNumber-inventory">
			<h3>${shoeNumber}</h3>
		</div>
		<div class="shoe-item-wrapper">
		<ul class="shoe-info">
				<li>Brand</li>
				<li>Model</li>
				<li>Color</li>
				<li>Size</li>
			</ul>
			<ul class="shoe-info-data">
				<li>${result[i].shoeBrand}</li>
				<li>${result[i].shoeModel}</li>
				<li>${result[i].primaryColor}</li>
				<li>${result[i].shoeSize}</li>
			</ul>
			<a href="#" class="edit-shoe button">EDIT / CLOSE</a>
			<a href="#" class="delete-shoe-btn button" stockNumber="${result[i].stockNumber}"> DELETE </a>
		</div>	
		</section>
		
		<section role="region" class="editshoe-section">
			<form name="editshoe-form" role="form" id="shoeForm${[i]}" stockNumber="${result[i].stockNumber}" class="editform hidden">
				<fieldset>
				<legend> Edit Shoe </legend>
				<div class="shoebrand wrapper">
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
					</div>
					<div class="shoemodel wrapper">
						<label for="editShoeModel-query">Model</label>
							<input title="Edit Shoe Model" type="text" class="editShoeModel-query" placeholder="Shoe Model" required>
					</div>
					<div class="shoecolor wrapper">
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
					</div>
					<div class="shoesize wrapper">
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
						</div>
					<input type="submit" title="Edit Shoe Submission">
				</fieldset>
				</form>
			</section>
			`
		)};
		}
	});
	}
};

// GO TO PUBLIC VIEW LISTENER
$('#view-public').click( e => {
	e.preventDefault();
	window.location = '/publiclocker.html';
})

// EDIT ACCOUNT EVENT LISTENER
$('#edit-account-link').click( e => {
	e.preventDefault();
	$('#edit-account').removeClass('hidden');
	$('#myinventory-section').addClass('hidden');
	$("#add-shoe-btn").addClass('hidden');
});

// CLOSE EDIT ACCOUNT FORM
$('#close-edit').click( e => {
	e.preventDefault();
	$('#edit-account').addClass('hidden');
	$('#myinventory-section').removeClass('hidden');
	$('#add-shoe-btn').removeClass('hidden');
})
// EDIT ACCOUNT AJAX CALLS

$('#edit-account-form').submit( e => { 
	e.preventDefault();

	// const username = $(event.currentTarget).find('#editUsername-query').val();
	// const password = $(event.currentTarget).find('#editPassword-query').val();
	const firstName = $(event.currentTarget).find('#fn-query').val();
	const lastName = $(event.currentTarget).find('#ln-query').val();
	const email = $(event.currentTarget).find('#email-query').val();
	const shoeSize = $(event.currentTarget).find('#shoeSize-query').val();

	const token = localStorage.getItem('authToken');

	const editRawOwnerObj = {
		// username: username,
		// password: password,
		firstName: firstName,
		lastName: lastName,
		email: email,
		shoeSize: shoeSize
	};

// REMOVE EMPTY STRINGS FROM EDIT OWNER OBJECT
function removeEmptyStrings(obj){
	let newObj = {};
	Object.keys(obj).forEach((prop) => {
    if (obj[prop] !== '') { newObj[prop] = obj[prop]; }
	});
	return newObj;
};

const editOwnerObj = removeEmptyStrings(editRawOwnerObj);

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
		localStorage.setItem('username', result.username);
		window.location.reload(true);
		});
	};
});

// USER DASHBOARD
function loadUserDashBoard() {

	let username = localStorage.getItem('username');
	let shoeCount = localStorage.getItem('shoeCount');

	// hide dashboard if not logged in , else show dashboard
	if(username === null){
		$('.dashboard').addClass('hidden');
		$('#add-shoe-btn').addClass('hidden');
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

	localStorage.clear();
	window.location = '/index.html';
});

// EDIT INVENTORY FUNCTIONS // ADD // EDIT // DELETE
$('#add-shoe-btn').on('click', e => {
	e.preventDefault();
	$('#addShoe-form').removeClass('hidden');
	$('#myinventory-section').addClass('hidden');
	$('#add-shoe-btn').addClass('hidden');
});

// CANCEL SHOE EDIT -- REVEAL INVENTORY
$('#cancelShoeEdit').on('click', e => {
	e.preventDefault();
	$('#addShoe-form').addClass('hidden');
	$('#myinventory-section').removeClass('hidden');
	$('#add-shoe-btn').removeClass('hidden');
});

// ADD SHOE SUBMISSION LISTENER
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

// ADD SHOE AJAX CALL
function addItem(newShoeObj) {

	const token = localStorage.getItem('authToken');

	$.ajax({
		type: 'POST',
		url: `/inventory/addShoe`,
		dataType: 'json',
		data: JSON.stringify(newShoeObj),
		contentType: 'application/json',
		beforeSend: function(xhr){
			xhr.setRequestHeader('Authorization', 'Bearer ' + token)
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
	console.log('clicked');
	$(e.currentTarget).parent().parent().next().find('.editform').toggleClass('hidden');
});

// EDIT ITEM SUBMISSION
$('#js-myinventory').submit('.editform', e => {
	e.preventDefault();

	const item = e.target;
	const itemId = $(item).attr('stockNumber');
	
	const shoeBrand = $('#'+e.target.id).closest('.editform').find('.editShoeBrand-query').val()
	const shoeModel = $('#'+e.target.id).closest('.editform').find('.editShoeModel-query').val()
	const shoeColor = $('#'+e.target.id).closest('.editform').find('.editShoeColor-query').val()
	const shoeSize = $('#'+e.target.id).closest('.editform').find('.editShoeSize-query').val()

	const editShoeObj = {
		shoeBrand: shoeBrand,
		shoeModel: shoeModel,
		shoeColor: shoeColor,
		shoeSize: shoeSize
	}
	$(editItem(editShoeObj, itemId));

});

// EDIT ITEM AJAX CALL
function editItem(item, itemId) {
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
		localStorage.removeItem('itemId');
		window.location.reload(true);
	})
};

// DELETE ITEM LISTENER
$('#js-myinventory').on('click', '.delete-shoe-btn', (e) => {
	e.preventDefault();
		const item = e.target;
		const itemId = $(item).attr('stockNumber');
	
	let retVal = confirm("Are You Sure?");
	if( retVal == true ){
		return deleteItem(itemId);
	} else {
		return false;
	};

});

// DELETE ITEM AJAX CALL
function deleteItem(itemId) {
const token = localStorage.getItem('authToken');

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


// START FUNCTIONS ON LOAD
function handleOnLoad() {
	$(loadOwnerInventory);
	$(loadUserDashBoard);
};

$(handleOnLoad);
