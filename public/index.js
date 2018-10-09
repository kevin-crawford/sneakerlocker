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

	console.log(userObject);

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
	localStorage.setItem('username', username);
	window.location = '/myaccount.html';
})
.fail(function (error) {
	console.log(error);
	if(error.status === 401) {
			console.log('Username and/or password is incorrect');
			$('#login-error').html(`
			<div class="err-msg">
			<p>Username and/or password is incorrect</p>
			</div>
			`)
		};
	});
});

// HIDE / REVEAL SIGNUP-SIGNIN FORMS
$('#new-account').click( event => {
	event.preventDefault();
	$('#login-section').hide();
	$('#signup-section').removeClass('hidden');
});

// BACK OUT OF SIGN UP FORM
$('#back-btn').click(event => {
	event.preventDefault();
	$('#signup-section').addClass('hidden');
	$('#login-section').show();
});


// LOGOUT 
$('#logout-btn').on('click', (e) => {
	event.preventDefault();
	console.log('Logging Out User');
	localStorage.empty();
	window.location = '/index.html';
});

//SIGN UP EVENT LISTENER
$('#signup-form').submit( event => {
	event.preventDefault();
	
	
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
			$('#error-handling').html(`
			<div class="err-msg">
			<p>Password must be at least 10 characters long</p>
			</div>
			`)
			console.log('password must be at least 10 characters long');
		}
		else if (error.responseJSON.location === "username"){
			$('#error-handling').html(`
			<div class="err-msg">
			<p>Username already taken</p>
			</div>
			`)
			console.log('username already taken');
		} 
		else if ( error.responseJSON.location === "email"){
			$('#error-handling').html(`
			<div class="err-msg">
			<p>Email already taken</p>
			</div>
			`)
			console.log('email already taken');
		} else {
			$("#signup-section").hide();
			$("#login-section").show();
		};
	});
});