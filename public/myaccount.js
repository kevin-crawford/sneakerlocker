function loadOwnerInventory() {

const username = localStorage.getItem('username');

	$.ajax({
		type: 'GET',
		url: `/${username}/inventory`,
		dataType: 'json',
		contentType: 'json/application'
	})
	.done(result => {
		console.log(result)
		for(let i = 0; i < result.length; i++){
		$('#js-myinventory').append(
			`
			<ul>
				<li>Brand: ${result[i].shoeBrand}</li>
				<li>Shoe Model: ${result[i].shoeModel}</li>
				<li>Primary Color: ${result[i].primaryColor}</li>
				<li>Size: ${result[i].shoeSize}</li>
			</ul>
			<a href="#" id="delete-shoe-btn"> - </a>
			`
		);
		}
	});


};

$(loadOwnerInventory);

function addItem() {
	$.ajax({
		type: 'POST',
		url: `/${ownerID}/inventory/${itemID}/addShoe`,
		dataType: 'json',
		data: JSON.stringify(result),
		contentType: 'json/application'
	})
	.done(result => {
		// append item to inventory
	})
};

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
	})

};

