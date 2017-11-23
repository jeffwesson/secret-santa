module.exports = function (participants) {
	if (!participants || participants.length % 2) return -1;

	const getRandomNumber = (low = 1, high = participants.length * 2) => {
		return Math.random() * (high - low) + low;
	};

	const getList = len => {
		let arr = new Array(len);
		for (let i = 0; i < arr.length; i++) {
			arr[i] = getRandomNumber();
		}
		return arr.reduce((a, p, i) => a.concat(arr[i]), []);
	};

	const getPairs = list => {
		let l = Array.from(list).sort();
		let p = [];
		while (l.length) {
			p.push([l.shift(), l.pop()]);
		}
		return p;
	};

	const mergeLists = (keys, values) => {
		return keys.reduce((o, k, i) => {
			o[values[i]] = k;
			return o;
		}, {});
	};

	const mapPairs = (pairs, map) => pairs.map(pair => [map[pair[0]], map[pair[1]]].sort());

	let list = getList(participants.length)
		, pairs = getPairs(list)
		, merged = mergeLists(participants, list)
	;

	return mapPairs(pairs, merged);
}