module.exports = (players = []) => players
	.map(player => ({ ...player, order: Math.random() }))
	.sort((a, b) => {
		if (a.order < b.order) return -1;
		if (a.order > b.order) return 1;
		return 0;
	})
	.reduce((pairs, player, index, _players) => {
		const sender = player;
		const receiverIndex = index + 1 < _players.length ? index + 1 : 0;
		const receiver = _players[receiverIndex];
		pairs.push({ sender, receiver });
		return pairs;
	}, []);