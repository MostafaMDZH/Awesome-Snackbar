import Head from 'next/head'
import Cookies from 'universal-cookie';
import Link from 'next/link'
import Snackbar from 'awesome-snackbar';
import loadingIcon from '../public/loading.gif'

let isWelcomeSbShow = false;
let SB = null;

export default function Main(){

    //copyTextToClipboard:
	const copyTextToClipboard = (text) => {
		if(!navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(function(){
            new Snackbar('Copied to clipboard 👍');
        },function(err){
            new Snackbar('cannot copy 👎');
        });
	}

    //welcome snackbar:
    const cookies = new Cookies();
    setTimeout(() => {
        if(isWelcomeSbShow) return;
        if(cookies.get('WelcomeSB') !== undefined) return;
        isWelcomeSbShow = true;
        new Snackbar('Welcome to Awesome Snackbar! 👋', {
            position: 'top-center',
            timeout: 2000,
            afterHide: () => {
                new Snackbar('Click on code sections to run the demo', {
                    position: 'top-center',
                    timeout: 0,
                    actionText: 'Got it',
                    onAction: () => cookies.set('WelcomeSB', 'yes', { path: '/', maxAge: 1000*24*60*60 })
                });
            }
        });
    }, 2000);

    //render:
    return (
        <div id='window' style={{scrollBehavior:'smooth'}}>

            <Head>
                <title>Awesome Snackbar | React, Angular, Vue, and Typescript compatible snackbar</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            {/* header */}
            <header id='header'>
                <Link href='https://awesome-components.demos.mostafa-mdzh.ir/'><a className='headerLink'>Awesome Components</a></Link>
                <Link href='https://www.buymeacoffee.com/mostafamdzh'><a className='headerLink' id='coffee'>buy me a coffee! :)</a></Link>
            </header>

            <div className='container' id='intro'>

                <div id='main'>

                    {/* navigation */}
                    <div id='navigation'>
                        <div id='navigationWrapper'>
                            <a className='navLink' href='#intro'         >intro         </a>
                            <a className='navLink' href='#installation'  >installation  </a>
                            <a className='navLink' href='#action-button' >action button </a>
                            <a className='navLink' href='#position'      >position      </a>
                            <a className='navLink' href='#icon-support'  >icon support  </a>
                            <a className='navLink' href='#theme'         >theme         </a>
                            <a className='navLink' href='#custom-style'  >custom style  </a>
                            <a className='navLink' href='#timing'        >timing        </a>
                            <a className='navLink' href='#wait-for-event'>wait for event</a>
                            <a className='navLink' href='#update-on-fly' >update on fly </a>
                            <a className='navLink' href='#after-hide'    >after hide    </a>
                        </div>
                    </div>

                    {/* content */}
                    <div id='content'>

                        <a href='https://github.com/MostafaMDZH/Awesome-Snackbar' id='github'>Github</a>

                        {/* intro */}
                        <h3 id='awesome'><Link href='/'>Awesome</Link></h3>
                        <div id='name-versionWrapper'>
                            <h1 id='appName'><Link href='/'>Snackbar</Link></h1>
                            <a id='version'>V2.0.4</a>
                        </div>
                        <p className='sectionDescription'>React, Angular, Vue, and Typescript compatible snackbar</p>

                        <h3 className='sectionName' id="features"><a># Features</a></h3>
                        <ul className='features'>
                            <li>Action Button</li>
                            <li>Dark/Light Theme</li>
                            <li>Custom Position</li>
                            <li>Icon Support</li>
                            <li>Custom Style</li>
                            <li>Custom Markup</li>
                            <li>Multiple Snackbars At The Same Time</li>
                            <li>Update On Fly</li>
                            <li>User Event Detection</li>
                            <li>Custom Timeout</li>
                            <li>Manual Hiding</li>
                            <li>Callback After Hide</li>
                            <li>Responsive Design</li>
                            <li>Dynamic HTML</li>
                            <li>Lightweight</li>
                            <li>Zero Dependency</li>
                        </ul>
                        
                        {/* installation */}
                        <h3 className='sectionName' id='installation'><a href='#installation'># Installation</a></h3>
                        <p className='step'><a className='bold'>{'>'} step 1 : </a>you can use either npm or yarn, or import the main file with the script tag.</p>
                        <div className='codeWrapper'>
                            <p className='comment'># npm</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('npm i awesome-snackbar')}>
                                <p>npm i <span>awesome-snackbar</span></p>
                            </button>
                            <p className='comment'># yarn</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('yarn add awesome-snackbar')}>
                                <p>yarn add <span>awesome-snackbar</span></p>
                            </button>
                            <p className='comment'>
                                # html (download the snackbar.js file from the&nbsp;
                                <a href='https://github.com/MostafaMDZH/Awesome-Snackbar/tree/main/src'>src</a>
                                &nbsp;directory)
                            </p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('<script src="snackbar.js"></script>')}>
                                <p>{"<script src=\""}<span>snackbar.js</span>{"\"></script>"}</p>
                            </button>
                        </div>
                        <p className='step'><a className='bold'>{'>'} step 2 : </a>include the package in your code:</p>
                        <div className='codeWrapper'>
                            <p className='comment'># npm and yarn</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('import Snackbar from \'awesome-snackbar\'')}>
                                <p>import <span>Snackbar</span> from <span>&apos;awesome-snackbar&apos;</span></p>
                            </button>
                        </div>
                        <p className='step'><a className='bold'>{'>'} step 3 : </a>start making snackbars!</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable' onClick={()=>new Snackbar('Hello World! 👋')}>
                                <p><span>new Snackbar</span>(&apos;Hello world! 👋&apos;);</p>
                            </button>
                        </div>

                        {/* action button */}
                        <h3 className='sectionName' id='action-button'><a href='#action-button'># Action Button</a></h3>
                        <p className='sectionDescription'>Create a custom button with a callback using the action button:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    new Snackbar('Make another one!', {
                                        actionText: 'Make',
                                        onAction: () => new Snackbar('Another Snackbar')
                                    });
                                }}>
                                <p>
                                    {"new Snackbar('Make another one!'), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"actionText"}</span>{": 'Make',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"onAction"  }</span>{": () => new Snackbar('Another Snackbar')"}<br></br>
                                    {"});"}
                                </p>
                            </button>
                        </div>

                        {/* position */}
                        <h3 className='sectionName' id='position'><a href='#position'># Position</a></h3>
                        <p className='sectionDescription'>You can position the snackbar by setting the position parameter:</p>
                        <div className='codeWrapper'>
                            <p className='comment'># bottom left (default)</p>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`I'm at the bottom left`, { position: 'bottom-left' })}>
                                <p>
                                    {"new Snackbar(`I'm at the bottom left`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'bottom-left'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># bottom center</p>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`I'm at the bottom center`, { position: 'bottom-center' })}>
                                <p>
                                    {"new Snackbar(`I'm at the bottom center`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'bottom-center'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># bottom right</p>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`I'm at the bottom right`, { position: 'bottom-right' })}>
                                <p>
                                    {"new Snackbar(`I'm at the bottom right`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'bottom-right'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># top left</p>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`I'm at the top left`, { position: 'top-left' })}>
                                <p>
                                    {"new Snackbar(`I'm at the top left`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'top-left'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># top center</p>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`I'm at the top center`, { position: 'top-center' })}>
                                <p>
                                    {"new Snackbar(`I'm at the top center`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'top-center'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># top right</p>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`I'm at the top right`, { position: 'top-right' })}>
                                <p>
                                    {"new Snackbar(`I'm at the top right`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'top-right'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* icon support */}
                        <h3 className='sectionName' id='icon-support'><a href='#icon-support'># Icon Support</a></h3>
                        <p className='sectionDescription'>You can add an icon to your snackbar with the iconSrc parameter:</p>
                        <div className='codeWrapper'>
                            <p className='comment'>import loadingIcon from &apos;./src/loading.gif&apos;;</p>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`Loading... please wait`, { iconSrc: loadingIcon.src, actionText: 'Stop'})}>
                                <p>
                                    {"new Snackbar(`Loading... please wait`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"iconSrc: 'loadingIcon.src',"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"actionText: 'Stop'"}<br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* theme */}
                        <h3 className='sectionName' id='theme'><a href='#theme'># Theme</a></h3>
                        <p className='sectionDescription'>The default theme is dark, but you can enable the light theme with the theme parameter:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`Today is...`, { theme: 'light', position: 'top-center', actionText: 'Sunday!'})}>
                                <p>
                                    {"new Snackbar(`Today is...`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"theme: 'light',"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"position: 'top-center',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"actionText: 'Sunday!'"}<br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* custom style */}
                        <h3 className='sectionName' id='custom-style'><a href='#custom-style'># Custom Style</a></h3>
                        <p className='sectionDescription'>The Awesome snackbar&apos;s html markup is equivalent to below:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection'>
                                <p>
                                    {"<div class='"}<span>{"container"}</span>{"'>"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"<p class='"}<span>{"message"}</span>{"'></p>"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"<input type='button' class='"}<span>{"actionButton"}</span>{"'/>"}<br></br>
                                    {"</div>"}
                                </p>
                            </button>
                        </div>
                        <p className='sectionDescription'>So you can apply your custom style in a form of an array of classes:</p>
                        <div className='codeWrapper'>
                            <p className='comment'># you can even add your custom markup (like the &apos;bold&apos; class below)</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    new Snackbar(`Image has been <a class='bold'>removed!</a>`,{
                                        position: 'bottom-center',
                                        style: {
                                            container: [
                                                ['background-color', 'red'],
                                                ['border-radius', '5px']
                                            ],
                                            message: [
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
                                    {"new Snackbar(`Image has been "}<span>{"<a class='bold'>"}</span>{"removed!"}<span>{"</a>"}</span>{"`, { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"position: 'bottom-center',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"actionText: 'Undo',"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"style: {"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"container: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['background-color', 'red'],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['border-radius', '5px']"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"message: ["}</span><br></br>
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
                        <p className='sectionDescription'>The default timeout for hiding is 4 seconds but you can customize it with the timeout parameter:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`Give me a second please...`, { timeout: 1000 })}>
                                <p>
                                    {"new Snackbar(`Give me a second please...`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 1000"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># Notice: when the waitForEvent is set to true(which is the default value), if an event happens after the timeout value after creating the Snackbar, the timeout value divides by two.</p>
                            <p className='comment'># For example, if the timeout value is 4 seconds and an event happens 3 seconds after the snackbar is created, 4 seconds later the hide animation starts, but if that event happens 5 seconds after the snackbar is created, the hide animation starts in 2 seconds.</p>
                        </div>
                        <p className='sectionDescription'>Or you can set the timeout to zero so the auto-hide would be disabled (click on the action button automatically will hide it)</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => new Snackbar(`I'm not going anywhere!`, { timeout: 0, actionText: 'Hide' })}>
                                <p>
                                    {"new Snackbar(`I'm not going anywhere!`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 0,"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"actionText: 'Hide'"}<br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        <p className='sectionDescription'>You can also call the hide() function manually:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    if(SB === null)
                                        SB = new Snackbar(`Ha ha! you don't have the action button this time!`, { timeout: 0 });
                                }}>
                                <p>
                                    {"let sb = new Snackbar(`Ha ha! you don't have the action button this time!`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 0"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># click to hide</p>
                            <button className='codeSection executable'
                                onClick={() => {SB?.hide(); SB = null;}}>
                                <p><span>{"sb.hide();"}</span></p><br></br>
                            </button>
                        </div>

                        {/* wait-for-event */}
                        <h3 className='sectionName' id='wait-for-event'><a href='#wait-for-event'># Wait For Event</a></h3>
                        <p className='sectionDescription'>By default, a snackbar waits for an event to hide, but if your message is not that important, you can disable this feature with the waitForEvent parameter:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    setTimeout(() => {
                                        new Snackbar(`I'm not waiting for you!`, { waitForEvent: false });
                                    }, 100);
                                }}>
                                <p>
                                    {"new Snackbar(`I'm not waiting for you!`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"waitForEvent: false"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* update on fly */}
                        <h3 className='sectionName' id='update-on-fly'><a href='#update-on-fly'># Update On Fly</a></h3>
                        <p className='sectionDescription'>If you store the returned object from the new Snackbar() function, you can set some of its attributes after its created:</p>
                        <div className='codeWrapper'>
                            
                            <p className='comment'># create a simple snackbar</p>
                            <button className='codeSection executable'
                                onClick={() => {if(SB === null) SB = new Snackbar(`I'm a simple snackbar`, { timeout: 0 });}}>
                                <p>{"let "}<span>sb</span>{" = new Snackbar(`I'm a simple snackbar`), { timeout: 0 });"}</p>
                            </button>

                            <p className='comment'># update the text</p>
                            <button className='codeSection executable'
                                onClick={() => SB?.setMessage('I can change my message')}>
                                <p>{"sb."}<span>{"setMessage"}</span>{"('I can change my message');"}</p><br></br>
                            </button>

                            <p className='comment'># change the position</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    SB?.setMessage('Or change my position!');
                                    SB?.setPosition('top-left');
                                }}>
                                <p>{"sb."}<span>{"setPosition"}</span>{"('top-left');"}</p><br></br>
                            </button>

                            <p className='comment'># add an icon</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    SB?.setMessage('And add an icon');
                                    SB?.setIconSrc(loadingIcon.src);
                                }}>
                                <p>{"sb."}<span>{"setIconSrc"}</span>{"( loadingIcon.src );"}</p><br></br>
                            </button>

                            <p className='comment'># change the theme</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    SB?.setMessage('Or change my theme');
                                    SB?.setTheme('light');
                                }}>
                                <p>{"sb."}<span>{"setTheme"}</span>{"('light');"}</p><br></br>
                            </button>

                            <p className='comment'># change the style</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    SB?.setMessage('Even my style!');
                                    SB?.setStyle({
                                        container: [['background-color', '#072']],
                                        message: [['color', '#fd0']]
                                    });
                                }}>
                                <p>
                                    {"sb."}<span>{"setStyle"}</span>{"({"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"container: [['background-color', '#072']],"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"message: [['color', '#fd0']],"}<br></br>
                                    {"});"}
                                </p>
                            </button>

                            <p className='comment'># and hide</p>
                            <button className='codeSection executable'
                                onClick={() => {SB?.hide(); SB = null;}}>
                                <p>sb.<span>hide();</span></p>
                            </button>

                        </div>

                        {/* after hide */}
                        <h3 className='sectionName' id='after-hide'><a href='#after-hide'># After Hide</a></h3>
                        <p className='sectionDescription'>When the waitForEvent is set to true(which is the default value), the hide function is waiting for an event to start hiding timeout, so it may not occur exactly after the specified timeout after snackbar creation, so if you want to run a function after your snackbar hides, you can use the afterHide parameter for it:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    new Snackbar('Marco...', {
                                        afterHide: () => new Snackbar('Polo!')
                                    });
                                }}>
                                <p>
                                    {"new Snackbar('Marco...'), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"afterHide"}</span>{": () => new Snackbar('Polo!')"}<br></br>
                                    {"});"}
                                </p>
                            </button>
                        </div>

                    </div>

                </div>

            </div>

            {/* footer */}
            <footer id='footer'>
                <p>Made with ♡ by <a href='https://github.com/MostafaMDZH'>Mostafa Mohammadzadeh</a></p>
                <p id='dash'>-</p>
                <p id='githubLink'>Source on <a href='https://github.com/MostafaMDZH/Awesome-Snackbar'>Github</a></p>
                <p id='awesomeComponents'>From <Link href='https://awesome-components.demos.mostafa-mdzh.ir/'><a>Awesome Components</a></Link></p>
            </footer>

        </div>
    )
}