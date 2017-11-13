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
            window.location = '../Feed?user=' + username + '/';
        })
        .catch();
}
function getProfileInformation(username) {
    $.get(
        'https://bcca-chirper.herokuapp.com/api/' + username + '/'
    ).then(function loaded(data) {
        PAGE_DATA = data;
    });
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
            getProfileInformation(username);
            window.location = '../Feed?user=' + username + '/';
        })
        .catch(function Catch(response) {
            console.log(response);
        });
}
var PAGE_DATA = {};
exports.signup = signup;
exports.login = login;
