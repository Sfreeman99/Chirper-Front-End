const $ = require('jquery');

var PAGE_DATA = {
    user: {
        userpic:
            'https://pbs.twimg.com/profile_images/73450913/IMG_0202_400x400.jpg',
        name: 'Raymond Hettinger',
        username: 'raymondh',
        description:
            'Python core developer. Freelance programmer/consultant/trainer. Husband to Rachel. Father to Matthew.',
        location: 'Santa Clara, CA',
        website: 'rhettinger.wordpress.com',
        joined: {
            month: 3,
            year: 2008
        }
    },
    chirps: [
        {
            author: {
                name: 'Raymond Hettinger',
                username: 'raymondh'
            },
            date: {
                month: 10,
                day: 28,
                year: 2017
            },
            message:
                '#python tip:  iter(C, sentinel) returns an iterator that invokes the callable C until it returns a sentinel signaling the iterator is done.'
        },
        {
            author: {
                name: 'Raymond Hettinger',
                username: 'raymondh'
            },
            date: {
                month: 10,
                day: 25,
                year: 2017
            },
            message:
                '#python teaching tip:  When teaching adults, half of your time should be spent helping students unlearn pre-existing incorrect knowledge.'
        },
        {
            author: {
                name: 'Raymond Hettinger',
                username: 'raymondh'
            },
            date: {
                month: 10,
                day: 23,
                year: 2017
            },
            message:
                '#python insight of the day:  Directories are a namespace and behave like dictionaries where the key is a filename and the value is an inode.'
        },
        {
            author: {
                name: 'Raymond Hettinger',
                username: 'raymondh'
            },
            date: {
                month: 10,
                day: 5,
                year: 2017
            },
            message: '#python news:  #PyPy version 5.9 has just been released.'
        },
        {
            author: {
                name: 'Raymond Hettinger',
                username: 'raymondh'
            },
            date: {
                month: 9,
                day: 24,
                year: 2017
            },
            message:
                '@dabeaz Put another way. With "yield" the consumer controls execution. With "await" the producer controls execution. Very different points of view.'
        },
        {
            author: {
                name: 'Raymond Hettinger',
                username: 'raymondh'
            },
            date: {
                month: 9,
                day: 24,
                year: 2017
            },
            message:
                'With #python iterators, we think of next() as initiating execution. With coroutines, we "await" a downstream event to initiate execution.'
        }
    ]
};
function DateJoined(data) {
    var Months = 'January February March April May June July August September October November December'.split(
        ' '
    );
    var num = data['user']['joined']['month'];
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
        "<div class='col-lg-3' id='user-profile'>",
        "<div class='col-lg-12 col-md-12 col-sm-12' id='picture'>", ///
        "<img src='" +
            data['user']['userpic'] +
            "' class='img-circle' id='userpic'>",
        '</div>',
        "<div class='col-lg-12 col-md-12 col-sm-12'><span><h3 id='name'><a id='name-color' href='https://twitter.com/" +
            data['user']['username'] +
            "'>" +
            data['user']['name'] +
            '</a></h3></span>', //
        "<span><h3 id='username-margin'><small><a id='username' href='https://twitter.com/" +
            data['user']['username'] +
            "'>@" +
            data['user']['username'] +
            '</a></small></h3></span>', //
        '<span><p>' + data['user']['description'] + '</p></span>', //
        "<span><p id='location' >" + data['user']['location'] + '</p></span>', //
        "<span><a href='" +
            data['user']['website'] +
            "'>" +
            data['user']['website'] +
            '</a></span>', //
        "<span><p id='joined'>" +
            DateJoined(data) +
            '&nbsp;' +
            data['user']['joined']['year'] +
            '</p></span>', //
        '</div></div>', ///
        '</div>' ////
    ].join('');
}
function ChirperFeed(data) {
    return data['chirps']
        .map(function(feed) {
            return [
                '<div class="row"><hr><div class="col-lg-12 chirper-row"><div class="row">',
                '<span >' +
                    "<img class='img-circle chirper-mini-pic' src='" +
                    data['user']['userpic'] +
                    "'>",
                '</span>',
                '<span class="chirper-name">' +
                    feed['author']['name'] +
                    '</span>',

                '<span class="chirper-username">@' +
                    feed['author']['username'] +
                    '</span>',
                ' <span class="chirper-date">' +
                    MonthDateYear(feed['date']) +
                    '</span>',
                '</div><div class="chirp">' +
                    hashTag(feed['message']) +
                    '</div>',
                '</div></div>'
            ].join('');
        })
        .join('');
}
function hashTag(message) {
    var phrase = message.split(' ');
    for (var i = 0; i < phrase.length; i++) {
        if (phrase[i].startsWith('#')) {
            phrase[i] =
                "<a href='https://twitter.com/hashtag/" +
                phrase[i].substr(1) +
                "?src=hash'>" +
                phrase[i] +
                '</a>';
        } else if (phrase[i].startsWith('@')) {
            phrase[i] =
                "<a href='https://twitter.com/" +
                phrase[i].substr(1) +
                "'>" +
                phrase[i] +
                '</a>';
        }
    }
    return phrase.join(' ');
}
function Recommendations(data) {
    return [];
}
function ViewProfile(data) {
    return [
        "<div class='container-fluid'>", ///
        "<div class='container col-lg-3 col-md-3 col-sm-3'>" + // Profile information starts here
            ProfileInformation(data) +
            '</div>', //
        "<div class='container col-lg-6 col-md-6 col-sm-6' id='chirp-box'><div>" + // Feed starts here
            ChirperFeed(data) +
            '</div>',
        "<div class='container col-lg-3 col-md-3 col-sm-3'>" + // Profile information starts here
            Recommendations(data) +
            '</div>', //

        '</div>'
    ].join('');
}
function main() {
    $('#app').html(
        "<div class='jumbotron'><h1> Chirper </h1></div>" +
            ViewProfile(PAGE_DATA)
    );
}
$(main);
