import Snackbar from 'awesome-snackbar';
import loadingIcon from '../public/loading.gif'

let sbList = [];

export default function Main(){

    //copyTextToClipboard:
	const copyTextToClipboard = (text) => {
		if(!navigator.clipboard){
			fallbackCopyTextToClipboard(text);
		}else{
			navigator.clipboard.writeText(text).then(function(){
                Snackbar('Copied to clipboard');
			},function(err){
                Snackbar('cannot copy');
			});
		}
	}

	//fallbackCopyTextToClipboard:
	const fallbackCopyTextToClipboard = (text) => {
		let textArea = document.createElement("textarea");
		textArea.value			= text;
		textArea.style.top		= "0";//avoid scrolling to bottom:
		textArea.style.left		= "0";
		textArea.style.position	= "fixed";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try{
			document.execCommand('copy');
            Snackbar('Copied to clipboard');
		}catch(err){
            Snackbar('cannot copy');
		}
		document.body.removeChild(textArea);
	}

    //render:
    return (
        <div id='window' style={{scrollBehavior:'smooth'}}>
            <div id='container'>
                <header id='header'>
                    <a className='headerLink' href='/'>Awesome Components</a>
                    <a className='headerLink' id='coffee' href='https://www.buymeacoffee.com/mostafamdzh'>buy me a coffee!</a>
                </header>
                <div id='main'>

                    {/* navigation */}
                    <div id='navigation'>
                        <div id='navLinkContainer'>
                            <a className='navLink' href='#installation' >installation </a>
                            <a className='navLink' href='#action-button'>action button</a>
                            <a className='navLink' href='#position'     >position     </a>
                            <a className='navLink' href='#icon-support' >icon support </a>
                            <a className='navLink' href='#theme'        >theme        </a>
                            <a className='navLink' href='#custom-style' >custom style </a>
                            <a className='navLink' href='#timing'       >timing       </a>
                            <a className='navLink' href='#live-update'  >update on fly</a>
                        </div>
                    </div>

                    {/* content */}
                    <div id='content'>

                        {/* intro */}
                        <h3 id='awesome'><a href='/'>Awesome</a></h3>
                        <div id='name-versionWrapper'>
                            <h1 id='snackbar'><a href='/'>Snackbar</a></h1>
                            <a>V1.0.0</a>
                        </div>
                        <p>React, pure Javascript and Typescript compatible snackbar</p>

                        {/* installation */}
                        <h3 className='sectionName' id='installation'><a href='#installation'># Installation</a></h3>
                        <p className='step'><a className='bold'>{'>'} step 1 : </a>you can use either npm or yarn to install, or you can import the main file with Html tag</p>
                        <div className='codeWrapper'>
                            <p className='comment'># npm</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('npm i awesome-snackbar --save')}>
                                <p>npm i <span>awesome-snackbar</span> --save</p>
                            </button>
                            <p className='comment'># yarn</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('yarn add awesome-snackbar')}>
                                <p>yarn add <span>awesome-snackbar</span></p>
                            </button>
                            <p className='comment'>
                                # html (download the snackbar.js file from the&nbsp;
                                <a href='https://github.com/MostafaMDZH/Awesome-Snackbar/tree/main/package/src'>src</a>
                                &nbsp;directory)
                            </p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('<script src="snackbar.js"></script>')}>
                                <p>{"<script src=\""}<span>snackbar.js</span>{"\"></script>"}</p>
                            </button>
                        </div>
                        <p className='step'><a className='bold'>{'>'} step 2 : </a>include the package in your code</p>
                        <div className='codeWrapper'>
                            <p className='comment'># npm and yarn</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('import Snackbar from \'awesome-snackbar\'')}>
                                <p>import <span>Snackbar</span> from <span>'awesome-snackbar'</span></p>
                            </button>
                        </div>
                        <p className='step'><a className='bold'>{'>'} step 3 : </a>start making snackbars!</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable' onClick={()=>Snackbar('Hello World! 👋')}>
                                <p><span>Snackbar</span>('Hello world! 👋');</p>
                            </button>
                        </div>

                        {/* action button */}
                        <h3 className='sectionName' id='action-button'><a href='#action-button'># Action Button</a></h3>
                        <p>Create a custom button with callback using action button</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    Snackbar('Make another one!', {
                                        actionText: 'Make',
                                        onAction: () => Snackbar('Another Snackbar')
                                    });
                                }}>
                                <p>
                                    {"Snackbar('Make another one!'), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"actionText"}</span>{": 'Make',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"onAction"  }</span>{": () => Snackbar('Another Snackbar')"}<br></br>
                                    {"});"}
                                </p>
                            </button>
                        </div>

                        {/* position */}
                        <h3 className='sectionName' id='position'><a href='#position'># Position</a></h3>
                        <p>You can position the snackbar by setting the position parameter</p>
                        <div className='codeWrapper'>
                            <p className='comment'># bottom left (default)</p>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`I'm at the bottom left`, { position: 'bottom-left' })}>
                                <p>
                                    {"Snackbar(`I'm at the bottom left`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'bottom-left'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># bottom center</p>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`I'm at the bottom center`, { position: 'bottom-center' })}>
                                <p>
                                    {"Snackbar(`I'm at the bottom center`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'bottom-center'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># bottom right</p>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`I'm at the bottom right`, { position: 'bottom-right' })}>
                                <p>
                                    {"Snackbar(`I'm at the bottom right`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'bottom-right'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># top left</p>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`I'm at the top left`, { position: 'top-left' })}>
                                <p>
                                    {"Snackbar(`I'm at the top left`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'top-left'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># top center</p>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`I'm at the top center`, { position: 'top-center' })}>
                                <p>
                                    {"Snackbar(`I'm at the top center`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'top-center'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># top right</p>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`I'm at the top right`, { position: 'top-right' })}>
                                <p>
                                    {"Snackbar(`I'm at the top right`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'top-right'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* theme */}
                        <h3 className='sectionName' id='theme'><a href='#theme'># Theme</a></h3>
                        <p>The default theme is dark but you can enable the light theme with theme parameter</p>
                        <div className='codeWrapper'>
                            <p className='comment'># bottom left (default)</p>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`Today is...`, { theme: 'light', position: 'top-center', actionText: 'Sunday!'})}>
                                <p>
                                    {"Snackbar(`Today is...`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"theme: 'light',"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"position: 'top-center',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"actionText: 'Sunday!'"}<br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* custom style */}
                        <h3 className='sectionName' id='custom-style'><a href='#custom-style'># Custom Style</a></h3>
                        <p>The DOM layer in Awesome Snackbar is equivalent to below</p>
                        <div className='codeWrapper'>
                            <button className='codeSection'>
                                <p>
                                    {"<div class='"}<span>{"container'"}</span>{">"}<br></br>

                                    &nbsp;&nbsp;&nbsp;&nbsp;{"<p class='"}<span>{"massage'"}</span>{"></p>"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"<input type='button' class='"}<span>{"actionButton'"}</span>{"/>"}<br></br>

                                    {"</div>"}
                                </p>
                            </button>
                        </div>
                        <p>So you can apply your custom style in form of an array of classes</p>
                        <div className='codeWrapper'>
                            <p className='comment'># you can even add your custom layout (like the 'bold' class below)</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    Snackbar(`Your account has been <a class='bold'>removed!</a>`,{
                                        position: 'bottom-center',
                                        style: {
                                            container: [
                                                ['background-color', 'red'],
                                                ['border-radius', '5px']
                                            ],
                                            massage: [
                                                ['color', '#eee']
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
                                }}>
                                <p>
                                    {"Snackbar(`Your account has been "}<span>{"<a class='bold'>"}</span>{"removed!"}<span>{"</a>"}</span>{"`, { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"position: 'bottom-center',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"actionText: 'Undo',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"style: {"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"container: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['background-color', 'red'],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['border-radius', '5px']"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"massage: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['color', '#eee'],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"bold: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['font-weight', 'bold'],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"actionButton: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['color', 'white'],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"}"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* timing */}
                        <h3 className='sectionName' id='timing'><a href='#timing'># Timing</a></h3>
                        <p>The default timeout for hiding is 4 seconds but you can customize it with the timeout parameter.</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`Give me a second please...`, { timeout: 1000 })}>
                                <p>
                                    {"Snackbar(`Give me a second please...`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 1000"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>
                        <p>Or you can set the timeout to zero so the auto-hide would be disabled (click on the action button automatically will hide it)</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => Snackbar(`I'm not going anywhere!`, { timeout: 0, actionText: 'hide' })}>
                                <p>
                                    {"Snackbar(`I'm not going anywhere!`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 0,"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"actionText: 'Hide'"}<br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        <p>You can also call the hide() function manually</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => sbList.push(Snackbar(`Ha ha! you don't have the action button this time!`, { timeout: 0 }))}>
                                <p>
                                    {"let sb = Snackbar(`Ha ha! you don't have the action button this time!`), { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 0"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># click to hide</p>
                            <button className='codeSection executable'
                                onClick={() => sbList.forEach((sb)=>{sb.hide()})}>
                                <p><span>{"sb.hide();"}<br></br></span></p>
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}