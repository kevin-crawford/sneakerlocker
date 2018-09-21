function loadOwnerInventory() {

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
		$('#js-myinventory').append(
			`
			<div>
				<p>Brand: ${result[i].shoeBrand}</p>
				<p>Shoe Model: ${result[i].shoeModel}</p>
				<p>Primary Color: ${result[i].primaryColor}</p>
				<p>Size: ${result[i].shoeSize}</p>
				<a href="#" id="edit-shoe" stockNumber="${result[i].stockNumber}">Edit</a>
				<a href="#" id="delete-shoe-btn" stockNumber="${result[i].stockNumber}"> DELETE </a>
				<legend> Edit Shoe </legend>
				<form name="editshoe-form" id"editshoe-form" role="form">
				<fieldset>
					<label>Shoe Brand</label>
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
						<label>Shoe Model</label>
							<input title="Edit Shoe Model" type="text" placeholder="Shoe Model">
						<label>Primary Color</input>
							<input title="Edit Shoe Color" type="text" placeholder="Primary Shoe Color">
						<label>Shoe Size</label>
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



$(loadOwnerInventory);

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


// LOGOUT 
$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.clear();
	window.location = '/index.html';
});

function editItem() {
	$.ajax({
		type: 'PUT',
		url: `/${ownerID}/inventory/${itemID}/editShoe`,
		dataType: 'json',
		data: JSON.stringify(result),
		contentType: 'json/application'
	})
	.done(result => {
		// edit item 
	})
};

function deleteItem() {
	$.ajax({
		type: 'DELETE',
		url: `/${ownerID}/inventory/${itemID}/deleteShoe`,
		dataType: 'json',
		data: JSON.stringify(result),
		contentType: 'json/application'
	})
	.done(result => {
		// delete item from inventory
		// decrement count
	})

};

