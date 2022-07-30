import Snackbar from 'typescript-components'
import './stylesheets/index.scss'
import './stylesheets/main.scss'
import favicon from './assets/favicon.png'

//favicon:
const link = document.createElement('link');
link.rel = 'icon';
document.getElementsByTagName('head')[0].appendChild(link);
link.href = favicon;

const makeButton = document.getElementById('makeButton');
makeButton.addEventListener('click', () => {
    Snackbar({massage: 'this is a Snackbar'});
});