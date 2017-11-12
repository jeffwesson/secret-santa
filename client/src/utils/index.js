function hyphensToSpaces(str) {
	return str.split('-').join(' ');
}

function capitalize(str) {
	if (typeof str !== 'string') return str;
	return str[0].toUpperCase() + str.substr(1);
}

export { capitalize, hyphensToSpaces };
