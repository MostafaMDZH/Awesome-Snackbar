//.scss
// import './src/snackbar.scss'

//js:
const SnackbarClass = require('./src/snackbar');
module.exports = (massage, parameters) => {return new SnackbarClass({massage, ...parameters});}