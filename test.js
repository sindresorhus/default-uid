import test from 'ava';
import defaultUid from './index.js';

test('main', t => {
	if (process.platform === 'darwin') {
		t.is(defaultUid(), 501);
	}

	if (process.platform === 'linux') {
		t.is(defaultUid(), 1000);
	}

	t.is(defaultUid('linux'), 1000);
	t.is(defaultUid('unicorn'), undefined);
});
