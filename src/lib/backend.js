const $ = require('jquery');

function signup(name, username, email, password) {
    return $.post(
        'https://bcca-chirper.herokuapp.com/api/signup/',
        JSON.stringify({
            name: name,
            username: username,
            email: email,
            password: password
        })
    )
        .then(function UserInformation(data) {
            window.localStorage.setItem('key', data.key);
            window.localStorage.setItem('User', username);
            login(username, password);
            console.log('it worked');
        })
        .catch(function(response) {
            console.log(response);
        });
}
function getProfileInformation(username, successFunc, failFunc) {
    $.get('https://bcca-chirper.herokuapp.com/api/' + username + '/?page=')
        .then(successFunc)
        .catch(failFunc);
}
function login(username, password) {
    $.post(
        'https://bcca-chirper.herokuapp.com/api/login/',
        JSON.stringify({
            username: username,
            password: password
        })
    )
        .then(function UserInformation(data) {
            window.localStorage.setItem('key', data.key);
            window.localStorage.setItem('User', username);
            window.location = '../Feed/index.html#' + username;
            // console.log(window.location.hash)
        })
        .catch(function Catch(response) {
            console.log(response);
        });
}
var PAGE_DATA = {};
exports.signup = signup;
exports.login = login;
exports.getProfileInformation = getProfileInformation;
