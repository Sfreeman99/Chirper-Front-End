const $ = require('jquery');
const backend = require('../../lib/backend.js');
// const backend = require('../../lib/backend');

// var PAGE_DATA = {
//     user: {
//         userpic:
//             'https://pbs.twimg.com/profile_images/73450913/IMG_0202_400x400.jpg',
//         name: 'Raymond Hettinger',
//         username: 'raymondh',
//         description:
//             'Python core developer. Freelance programmer/consultant/trainer. Husband to Rachel. Father to Matthew.',
//         location: 'Santa Clara, CA',
//         website: 'rhettinger.wordpress.com',
//         joined: {
//             month: 3,
//             year: 2008
//         }
//     },
//     chirps: [
//         {
//             author: {
//                 name: 'Raymond Hettinger',
//                 username: 'raymondh'
//             },
//             date: {
//                 month: 10,
//                 day: 28,
//                 year: 2017
//             },
//             message:
//                 '#python tip:  iter(C, sentinel) returns an iterator that invokes the callable C until it returns a sentinel signaling the iterator is done.'
//         },
//         {
//             author: {
//                 name: 'Raymond Hettinger',
//                 username: 'raymondh'
//             },
//             date: {
//                 month: 10,
//                 day: 25,
//                 year: 2017
//             },
//             message:
//                 '#python teaching tip:  When teaching adults, half of your time should be spent helping students unlearn pre-existing incorrect knowledge.'
//         },
//         {
//             author: {
//                 name: 'Raymond Hettinger',
//                 username: 'raymondh'
//             },
//             date: {
//                 month: 10,
//                 day: 23,
//                 year: 2017
//             },
//             message:
//                 '#python insight of the day:  Directories are a namespace and behave like dictionaries where the key is a filename and the value is an inode.'
//         },
//         {
//             author: {
//                 name: 'Raymond Hettinger',
//                 username: 'raymondh'
//             },
//             date: {
//                 month: 10,
//                 day: 5,
//                 year: 2017
//             },
//             message: '#python news:  #PyPy version 5.9 has just been released.'
//         },
//         {
//             author: {
//                 name: 'Raymond Hettinger',
//                 username: 'raymondh'
//             },
//             date: {
//                 month: 9,
//                 day: 24,
//                 year: 2017
//             },
//             message:
//                 '@dabeaz Put another way. With "yield" the consumer controls execution. With "await" the producer controls execution. Very different points of view.'
//         },
//         {
//             author: {
//                 name: 'Raymond Hettinger',
//                 username: 'raymondh'
//             },
//             date: {
//                 month: 9,
//                 day: 24,
//                 year: 2017
//             },
//             message:
//                 'With #python iterators, we think of next() as initiating execution. With coroutines, we "await" a downstream event to initiate execution.'
//         }
//     ],
//     recommend: [
//         {
//             user: {
//                 name: 'David Beasley',
//                 userpic:
//                     'https://pbs.twimg.com/profile_images/848508178639749120/x8ltNamO_400x400.jpg',
//                 username: 'dabeaz'
//             }
//         },

//         {
//             user: {
//                 name: 'Guido van Rossum',
//                 userpic:
//                     'https://pbs.twimg.com/profile_images/424495004/GuidoAvatar_400x400.jpg',
//                 username: 'gvanrossum'
//             }
//         },

//         {
//             user: {
//                 name: 'Python Software',
//                 userpic:
//                     'https://pbs.twimg.com/profile_images/439154912719413248/pUBY5pVj_400x400.png',
//                 username: 'ThePSF'
//             }
//         },

//         {
//             user: {
//                 name: 'Pycoders Weekly',
//                 userpic:
//                     'https://pbs.twimg.com/profile_images/429285908953579520/InZKng9-_400x400.jpeg',
//                 username: 'pycoders'
//             }
//         }
//     ]
// };
function DateJoined(data) {
    var Months = 'January February March April May June July August September October November December'.split(
        ' '
    );
    var num = data['chirper']['joined']['month'];
    if (num === 0) {
        return Months[num];
    } else {
        return Months[num - 1];
    }
}
function MonthDateYear(data) {
    var Months = 'Jan Feb March April May June July Aug Sept Oct Nov Dec'.split(
        ' '
    );
    var monthPublished = data['month'];
    var day = data['day'];
    if (monthPublished === 0) {
        return Months[monthPublished] + ' ' + day;
    } else {
        return Months[monthPublished - 1] + ' ' + day;
    }
}
function ProfileInformation(data) {
    return [
        "<div class='container'>", ////
        "<div class='col-lg-3' id='user-profile'>", ///
        "<div class='col-lg-12 col-md-12 col-sm-12' id='picture'>", //
        "<img src='" +
            hasImage(data['chirper']) +
            "' class='img-circle' id='userpic'>",
        UploadImage(data['chirper']),
        '</div>', //
        "<div class='col-lg-12 col-md-12 col-sm-12'><span><h3 id='name'><a id='name-color' href='#" +
            data['chirper']['username'] +
            "'>" +
            data['chirper']['name'] +
            '</a></h3></span>', //
        "<span><h3 id='username-margin'><small><a id='username' href='#" +
            data['chirper']['username'] +
            "'>@" +
            data['chirper']['username'] +
            '</a></small></h3></span>', //
        '<span><p>' + data['chirper']['description'] + '</p></span>', //
        "<span><p id='location' >" +
            data['chirper']['location'] +
            '</p></span>', //
        "<span><a href='" +
            data['chirper']['website'] +
            "'>" +
            data['chirper']['website'] +
            '</a></span>', //
        "<span><p id='joined'>" +
            DateJoined(data) +
            '&nbsp;' +
            data['chirper']['joined']['year'] +
            '</p></span>', //
        '</div></div>', ///
        '</div>' ////
    ].join('');
}
function ChirperFeed(data) {
    return data['chirps']
        .map(function(feed) {
            return [
                '<div class="row"><hr><div class="col-lg-12"><div class="row">',
                "<div class='col-lg-1'>" +
                    "<img class='img-circle chirper-mini-pic' src='" +
                    hasImage(data['chirper']) +
                    "'>",
                '</div>',
                "<div class='col-lg-11'>",
                '<span class="chirper-name">' +
                    feed['author']['name'] +
                    '</span>',

                '<span class="chirper-username"><a href="#' +
                    feed.author.username +
                    '">@' +
                    feed['author']['username'] +
                    '</span>',
                ' <span class="chirper-date">' +
                    MonthDateYear(feed['date']) +
                    '</span>',
                "<div class='row' id='chirp-message'>",
                '<span class="chirp">' +
                    hashTag(feed['message']) +
                    '</span></div>',
                '</div></div></div></div>'
            ].join('');
        })
        .join('');
}
function hashTag(message) {
    var phrase = message.split(' ');
    for (var i = 0; i < phrase.length; i++) {
        if (phrase[i].startsWith('#')) {
            phrase[i] =
                "<a href='#" + phrase[i].substr(1) + "'>" + phrase[i] + '</a>';
        } else if (phrase[i].startsWith('@')) {
            phrase[i] =
                "<a href='#" + phrase[i].substr(1) + "'>" + phrase[i] + '</a>';
        }
    }
    return phrase.join(' ');
}
function UploadImage(data) {
    if (!data.userpic && !window.localStorage.getItem('UserPic')) {
        return [
            "<input id='pic' type='file' name='userpic' />",
            "<input id='upload-pic' type='submit' value='upload'/>"
        ].join('');
    }
}
function hasImage(data) {
    return 'http://way4sale.com/oc-content/plugins/profile_picture/no-user.png';
}
function Chirp(data) {
    return [
        '<div>',
        '<h3> Chirper </h3>',
        "<textarea class='form-control' placeholder='" +
            data.chirper.name +
            " chirp about something...' rows='3'></textarea>",
        '</div>',
        "<button id='submit-chirp' type='button' class='btn btn-lb btn-lg'>",
        "<div class='row'>",
        "<div class='col-lg-4'>",
        "<img alt='Brand' id='img-button-logo' class='img-circle' src='https://cdn.dribbble.com/users/68544/screenshots/2647748/aviabird.png'>",
        '</div>',
        '</div>',
        '</button>'
    ].join('');
}
function ViewProfile(data) {
    return [
        "<div class='container-fluid'>", ///
        "<div class='container col-lg-3 col-md-3 col-sm-3'>" + // Profile information starts here
            ProfileInformation(data) +
            '</div>', //
        "<div class='container col-lg-5 col-md-4 col-sm-4 chirp-box'>", // Feed starts here
        Chirp(data),
        '<div>' + ChirperFeed(data) + '</div>',
        '</div>',
        '</div>'
    ].join('');
}
function navbarInformation(data) {
    if (data.chirper.name) {
        return [
            '<div>' + data.chirper.name + '</div>',
            "<button class='btn' id='logout'> Logout </button>"
        ].join('');
    } else {
        return [
            '<form class="navbar-form navbar-right" role="search">',
            '<div id="LoginUsernameValidation" class="form-group">',
            '<input type="text" id="LoginUsername" class="form-control" placeholder="username" aria-describedby="LoginUsernameMessage">',
            '<span class="LoginErrorMessage" id="LoginUsernameMessage"></span>',
            '</div>',
            "<div id='LoginPasswordValidation' class='form-group'>",
            "<input type='password' class='form-control' placeholder='password' name='password' id='LoginPassword' aria-describedby='LoginPasswordMessage'>",
            "<span class='LoginErrorMessage' id='LoginPasswordMessage'></span>",
            '</div>',
            '<button type="submit" class="btn btn-default" id="Login">Sign In</button>',
            '</form>'
        ].join('');
    }
}
function main() {
    var username = window.location.hash.substr(1);
    backend.getProfileInformation(
        username,
        function(feed) {
            console.log(feed);
            $('.navbar-text').html(navbarInformation(feed));
            $('#app').html(ViewProfile(feed));
            $('#logout').click(function() {
                window.localStorage.removeItem('key');
                window.localStorage.removeItem('User');
                window.localStorage.removeItem('UserPic');
                window.location = '../Signup/index.html';
            });
            $('#home').click(function() {
                event.preventDefault();
                window.location.href =
                    '#' + window.localStorage.getItem('User');
                window.location.reload(true);
            });
            $('a').click(function(event) {
                if ($(this)[0].hash[0] === '#') {
                    window.location.reload(true);
                }
            });
            $('#upload-pic').click(function() {
                window.localStorage.setItem(
                    'UserPic',
                    'home/basecamp/Downloads/' +
                        $('#pic')
                            .val()
                            .substr(13)
                );
                window.location.reload(true);
            });

            $('#submit-chirp').click(function(event) {
                event.preventDefault();
                var key = window.localStorage.getItem('key');
                var message = $('textarea').val();
                $.post(
                    'https://bcca-chirper.herokuapp.com/api/chirp/',
                    JSON.stringify({ key: key, message: message })
                )
                    .then(function(feed) {
                        console.log(feed);
                    })
                    .catch(function error(response) {
                        console.log(response);
                    });
                window.location.reload(true);
            });
        },
        function(response) {
            console.log(response);
            console.log('failed to load');
        }
    );
}
$(main);

// var PAGE_DATA = {};
// function draw() {
//     $('#message').html('Name: ' + PAGE_DATA.chirper.name);
// }
// function user(username) {
//     $.get('https://bcca-chirper.herokuapp.com/api/' + username + '/')
//         .then(function handleFeedResponse(response) {
//             console.log(response);
//             PAGE_DATA = response;
//             draw();
//         })
//         .catch(function handleFeedReason(reason) {
//             console.log(reason);
//             $('#message').html("The username '" + username + "' is not valid");
//         });
// }

// function foo() {
//     backend.signup(...).then(...).catch(...)
// }
