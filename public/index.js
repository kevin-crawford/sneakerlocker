// EVENT LISTENERS LANDING PAGE
// LOGIN EVENT LISTENER
$('#login-form').submit( event => {
	event.preventDefault();
	console.log('Logging In...');

	// login input variables
	const username = $(event.currentTarget).find('#username-query').val();
	const password = $(event.currentTarget).find('#password-query').val();

	console.log(username, password);
	console.log(` user is logging in as ${username}`);

	const userObject = {
		username: username,
		password: password
	};

$.ajax({
	type: 'POST',
	url: '/login',
	dataType: 'json',
	data: JSON.stringify(userObject),
	contentType: 'application/json'
})
.done(result => {
	console.log(result);
})
.fail(function (jqXHR, error, errorThrown) {
	console.log(jqXHR);
	console.log(error);
	console.log(errorThrown);
	});

});

//SIGN UP EVENT LISTENER
$('#signup-form').submit( event => {
	event.preventDefault();
	console.log('Submitting Sign Up Request');

	// sign up input variables 

	const username = $(event.currentTarget).find('#newUsername-query').val();
	const password = $(event.currentTarget).find('#newPassword-query').val();
	const firstName = $(event.currentTarget).find('#fn-query').val();
	const lastName = $(event.currentTarget).find('#ln-query').val();
	const email = $(event.currentTarget).find('#email-query').val();

	console.log(username,password,firstName,lastName,email);

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
	.fail(function (jqXHR, error, errorThrown) {
		console.log(jqXHR);
		console.log(error);
		console.log(errorThrown);
	});
});
