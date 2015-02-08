'use strict';
var test = require('ava');
var defaultUid = require('./');

test(function (t) {
	if (process.platform === 'darwin') {
		t.assert(defaultUid() === 501);
	}

	if (process.platform === 'linux') {
		t.assert(defaultUid() === 1000);
	}

	t.assert(defaultUid('linux') === 1000);
	t.assert(defaultUid('unicorn') === undefined);

	t.end();
});
