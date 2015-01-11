'use strict';
var test = require('ava');
var defaultUid = require('./');

test(function (t) {
	process.platform = 'darwin';
    defaultUid(undefined, function (uid) {
        t.assert(uid === 501);
    });
});

test(function (t) {
    defaultUid('darwin', function (uid) {
        t.assert(uid === 501);
    });
});

test(function (t) {
    defaultUid('sunos', function (uid) {
        t.assert(uid === 100);
    });
});

test(function (t) {
    defaultUid('unicorn', function (uid) {
        t.assert(uid === undefined);
    });
});
