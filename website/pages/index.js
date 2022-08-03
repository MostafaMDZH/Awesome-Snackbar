import Snackbar from 'awesome-snackbar';

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
        <div id='window'>
            <div id='container'>
                <div id='header'>
                    <a class='headerLink' id='title' href='/'>Awesome Components</a>
                    <a class='headerLink' id='coffee' href='https://www.buymeacoffee.com/mostafamdzh'>buy me a coffee!</a>
                </div>
                <div id='main'>

                    <div id='navigation'>
                        <div id='navLinkContainer'>
                            <a class='navLink' href='#intro'        >intro        </a>
                            <a class='navLink' href='#positioning'  >positioning  </a>
                            <a class='navLink' href='#theme'        >theme        </a>
                            <a class='navLink' href='#action-button'>action button</a>
                            <a class='navLink' href='#custom-style' >custom style </a>
                            <a class='navLink' href='#live-update'  >live update  </a>
                        </div>
                    </div>

                    <div id='content'>
                        <h3 id='awesome'><a href='/'>Awesome</a></h3>
                        <h1 id='snackbar'><a href='/'>Snackbar</a></h1>
                        <a id='version'>V1.0.0</a>

                    </div>

                </div>
            </div>
        </div>
    )
}