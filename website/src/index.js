import Snackbar from '@typescript-components/snackbar'
import './stylesheets/index.scss'
import './stylesheets/main.scss'
import favicon from './assets/favicon.png'

//favicon:
const link = document.createElement('link');
link.rel = 'icon';
document.getElementsByTagName('head')[0].appendChild(link);
link.href = favicon;



const makeBL = document.getElementById('makeBL');
makeBL.addEventListener('click', () => {
    Snackbar({
        massage: 'This is a Snackbar This is a Snackbar This is a Snackbar This is a Snackbar This is a Snackbar',
        position: 'bottom-left',
        actionText: 'Undo'
    });
});
const makeBC = document.getElementById('makeBC');
makeBC.addEventListener('click', () => {
    Snackbar({
        massage: 'This is a <a class="bold">Snackbar</a>',
        position: 'bottom-center',
        style: {
            container: [
                ['background-color', 'red']
            ],
            massage: [
                ['color', 'black']
            ],
            bold: [
                ['font-weight', 'bold']
            ],
            actionButton: [
                ['color', 'white']
            ]
        },
        actionText: 'Undo'
    });
});
const makeBR = document.getElementById('makeBR');
makeBR.addEventListener('click', () => {
    Snackbar({
        massage: 'This is a Snackbar',
        position: 'bottom-right'
    });
});

const makeTL = document.getElementById('makeTL');
makeTL.addEventListener('click', () => {
    Snackbar({
        massage: 'This is a Snackbar',
        position: 'top-left'
    });
});
const makeTC = document.getElementById('makeTC');
makeTC.addEventListener('click', () => {
    Snackbar({
        massage: 'This is a Snackbar',
        position: 'top-center',
        theme: 'light',
        actionText: 'Undo'
    });
});
const makeTR = document.getElementById('makeTR');
makeTR.addEventListener('click', () => {
    Snackbar({
        massage: 'This is a Snackbar',
        position: 'top-right'
    });
});