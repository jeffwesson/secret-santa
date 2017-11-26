module.exports = function (participants) {
	if (!participants) return -1;

	const getRandomNumber = (low = 1, high = participants.length * 2) => {
		return Math.random() * (high - low) + low;
	};

	const getListOfRandomNumbers = len => {
		let arr = new Array(len);
		for (let i = 0; i < arr.length; i++) {
			arr[i] = getRandomNumber();
		}
		return arr.reduce((a, p, i) => a.concat(arr[i]), []);
	};

	const getPairs = list => {
		let l = Array.from(list).sort();
		let p = [];
		for (let i = 0; i < l.length; i++) {
			p.push([l[i], (l[i + 1] || l[0])]);
		}
		return p;
	};

	const mapParticipantToRandomNumber = (keys, values) => {
		return keys.reduce((o, k, i) => {
			o[values[i]] = k;
			return o;
		}, {});
	};

	const mapPairs = (pairs, map) => pairs.map(pair => [map[pair[0]], map[pair[1]]]);

	let listOfRandomNumbers = getListOfRandomNumbers(participants.length)
		, pairs = getPairs(listOfRandomNumbers)
		, mappedParticipants = mapParticipantToRandomNumber(participants, listOfRandomNumbers)
		;
	const z = mapPairs(pairs, mappedParticipants);
	console.log(z)
	return z;
}
