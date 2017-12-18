const $ = require('jquery');
const backend = require('../../lib/backend');

function NameIsValid(name) {
    var arr = name.split(' ');
    if (arr.length > 1 && arr.length < 3) {
        return true;
    } else {
        return false;
    }
}
function checkUsernameExists(username) {
    return $.get(
        'https://bcca-chirper.herokuapp.com/api/username_exists/' +
            username +
            '/'
    );
}
function PasswordIsValid(password) {
    // console.log(password.length);
    if (password.length < 10) {
        return false;
    } else {
        return true;
    }
}
function SignUpIsValid() {
    return (
        NameIsValid($('#Name').val()) && PasswordIsValid($('#Password').val())
    );
}
function showErrors(name, username, password) {
    if (!NameIsValid(name)) {
        $('#NameValidation').addClass('has-error');
        $('#NameMessage').html('<li>Please give a first and last Name</li>');
    }

    if (!PasswordIsValid(password)) {
        $('#PasswordValidation').addClass('has-error');
        $('#PasswordMessage').html(
            '<li>Password must be 10 or more characters long</li>'
        );
    }
    checkUsernameExists(username).then(function(username) {
        if (username.exists) {
            $('#UserNameValidation').addClass('has-error');
            $('#UserNameMessage').html('<li>username already exist</li>');
        }
    });
}
function OnType(field) {
    $('#' + field).on('input', function() {
        $('#' + field + 'Validation').removeClass('has-error');
        $('#' + field + 'Message').html('');
    });
}
function LoginUsernameIsValidMessages() {
    var username = $('#LoginUsername').val();
    checkUsernameExists(username).then(function(username) {
        if (!username.exists) {
            $('#LoginUsernameValidation').addClass('has-error');
            $('#LoginUsernameMessage')
                .addClass('has-error')
                .html('Please Sign Up first');
        }
    });
}
function LoginUsernameIsValid() {
    var username = $('#LoginUsername').val();
    checkUsernameExists(username).then(function(username) {
        if (!username.exists) {
            return false;
        }
    });
}
function LoginPasswordIsValidMessages() {
    password = $('#LoginPassword').val();
    if (!PasswordIsValid(password)) {
        $('#LoginPasswordValidation').addClass('has-error');

        $('#LoginPasswordMessage')
            .addClass('has-error')
            .html('Password does not meet requirement of 10 length');
    }
}
function LoginPasswordIsValid() {
    password = $('#LoginPassword').val();
    if (!PasswordIsValid(password)) {
        return false;
    }
}
function LoginIsValid() {
    return LoginUsernameIsValid();
}
function main() {
    OnType('Password');
    OnType('UserName');
    OnType('Name');
    OnType('LoginUsername');
    OnType('LoginPassword');
    $('#Login').click(function(event) {
        var LoginUsername = $('#LoginUsername').val();
        var LoginPassword = $('#LoginPassword').val();
        console.log('Username: ' + LoginUsername);
        console.log('Password: ' + LoginPassword);
        event.preventDefault();
        backend.login(LoginUsername, LoginPassword);
    });
    $('#Sign-Up').click(function(event) {
        // event.preventDefault();
        var name = $('#Name').val();
        var username = $('#UserName').val();
        var password = $('#Password').val();
        var email = $('#Email').val();
        if (!SignUpIsValid()) {
            event.preventDefault();
            showErrors(name, username, password);
        } else {
            backend.signup(name, username, email, password);
        }
    });
}
$(main);
