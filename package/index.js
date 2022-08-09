const SnackbarClass = require('./src/snackbar');
module.exports = (message, parameters) => {return new SnackbarClass({message, ...parameters});}