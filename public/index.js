// EVENT LISTENERS LANDING PAGE
// LOGIN EVENT LISTENER
$('#login-form').submit( event => {
	event.preventDefault();
	// login input variables
	const username = $(event.currentTarget).find('#username-query').val();
	const password = $(event.currentTarget).find('#password-query').val();

	const userObject = {
		username: username,
		password: password
	};

$.ajax({
	type: 'POST',
	url: '/auth/login',
	dataType: 'json',
	data: JSON.stringify(userObject),
	contentType: 'application/json'
})
.done(token => {
	console.log('success!')
	localStorage.setItem('authToken', token.authToken);
	// res.sendFile('/myaccount.html');
})
.fail(function (error) {
	console.log(error);
	if(error.status === 401) {
			console.log('Username and/or password is incorrect');
		}
	});

});

// HIDE / REVEAL SIGNUP-SIGNIN FORMS
$('#new-account').click(event => {
	event.preventDefault();
	$('#login-section').hide();
	$('#signup-section').removeClass('hidden');
})

//SIGN UP EVENT LISTENER
$('#signup-form').submit( event => {
	event.preventDefault();
	$("#login-section").show();
	$("#signup-section").hide();
	console.log('Submitting Sign Up Request');
	const username = $(event.currentTarget).find('#newUsername-query').val();
	const password = $(event.currentTarget).find('#newPassword-query').val();
	const firstName = $(event.currentTarget).find('#fn-query').val();
	const lastName = $(event.currentTarget).find('#ln-query').val();
	const email = $(event.currentTarget).find('#email-query').val();
	// Payload
	const newUserObject = {
		username: username,
		password: password,
		firstName: firstName,
		lastName:	lastName,
		email: email
	};
	// POST request to Sneakerlocker API 
	$.ajax({
		type: 'POST',
		url: '/',
		dataType: 'json',
		data: JSON.stringify(newUserObject),
		contentType: 'application/json'
	})
	.done(result => {
		console.log(result);
	})
	.fail(function (error) {
		if (password.length < 10){
			console.log('password must be at least 10 characters long');
		}
		if (error.responseJSON.location === "username"){
			console.log('username already taken');
		}
		if ( error.responseJSON.location === "email"){
			console.log('email already taken');
		}
	});
});


// ------------------ MY ACCOUNT PAGE ---------------------------//
//---------------------------------------------------------------//

function renderMyAccount(){
	let token = localStorage.getItem("authToken");
	

}


// USED TO LOAD MYACCOUNT.HTML AND PUBLIC VIEWS, needs to be repeatable and used for different owners not just the local one. 

function loadOwnerInventory() {



	$.ajax({
		type: 'GET',
		url: `/${ownerID}/inventory`,
		dataType: 'json',
		contentType: 'json/application',
	})
	.done(result => {
		console.log(result);
	})
	.fail( error => {
		console.log(error)
	})

};