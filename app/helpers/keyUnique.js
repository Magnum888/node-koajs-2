/**
 * @module helpers/keyUnique
 */

const lenghID = require('config').keyUnique.length,
      timestamp = +new Date,
      _getRandomInt = ( min, max ) => {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    };

module.exports = keyUnique = (lengthId = lenghID) => {
    let ts = timestamp.toString();
	let parts = ts.split( "" ).reverse();
	let key = "";

	for( let i = 0; i < lengthId; ++i ) {
		let index = _getRandomInt( 0, parts.length - 1 );
		key += parts[index];
	};

    return key;
}