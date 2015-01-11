'use strict';

var fs = require('fs');
var getos = require('getos');

var DEFAULT_UIDS = {
	darwin: 501,
	freebsd: 1000,
	linux: 1000,
	sunos: 100
};

var REDHAT_UID = 500;
var REDHAT_DISTROS = [
	'Centos',
	'Red Hat Linux',
	'RHAS',
	'RHEL',
	'Scientific Linux',
	'ScientificCERNSLC',
	'ScientificFermiLTS',
	'ScientificSL',
	'ScientificSLF',
	'Yellow Dog'
];

module.exports = function (platform, cb) {
	platform = platform || process.platform;

	if (platform === 'linux') {
		// Try to get UID_MIN from from /etc/login.defs
		getUidMin(function(uidMin) {
			if (uidMin) {
				getFirstUserUid(uidMin, function(userUid) {
					cb(userUid);
				});
			} else {
				// Get default (hardcoded) UID_MIN
				getDefaultUidMin(function (uid) {
					getFirstUserUid(uid, function(userUid) {
						cb(userUid);
					});
				});
			}
		});
	} else {
		cb(DEFAULT_UIDS[platform]);
	}
};

function getDefaultUidMin(cb) {
	getos(function(err, os) {
		if (err || !os || !os.dist) {
			cb(DEFAULT_UIDS.linux);
		} else if (REDHAT_DISTROS.indexOf(os.dist) !== -1) {
			cb(REDHAT_UID);
		}
	});
}

function getUidMin(cb) {
	fs.readFile('/etc/login.defs', function(err, data) {
		var uidMin;
		if (err || !data) {
			return cb();
		}

		// Line we're looking for: 'UID_MIN\t\t\t 1000'
		String(data).split('\n').some(function(line) {
			var matches = line.match(/^(UID_MIN)\s+(\d+)$/);
			if (matches && matches.length === 3) {
				uidMin = parseInt(matches[2], 10);
				return true;
			}
		});

		cb(uidMin);
	});
}

// Find the first *active* user after a given minimum index
function getFirstUserUid(min, cb) {
	fs.readFile('/etc/passwd', function(err, data) {
		var uids = [];
		if (err || !data) {
			return cb(min);
		}

		// Format: 'username:x:1000:100::/home/username:/bin/zsh'
		String(data).split('\n').forEach(function(line, i) {
			var parts = line.split(':');
			var uid = parseInt(parts[2], 10);
			if (uid) {
				uids.push(uid);
			}
		});

		var lowest = Infinity;
		uids.some(function (uid) {
			if (uid >= min && uid < lowest) {
				lowest = uid;
			}
			return uid === min;
		});

		cb(lowest || min);
	});
}
