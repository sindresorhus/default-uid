const DEFAULT_UIDS = {
	darwin: 501,
	freebsd: 1000,
	linux: 1000,
	sunos: 100
};

export default function defaultUid(platform = process.platform) {
	return DEFAULT_UIDS[platform];
}
