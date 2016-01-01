import test from 'ava';
import m from './';

test(t => {
	if (process.platform === 'darwin') {
		t.is(m(), 501);
	}

	if (process.platform === 'linux') {
		t.is(m(), 1000);
	}

	t.is(m('linux'), 1000);
	t.is(m('unicorn'), undefined);
});
