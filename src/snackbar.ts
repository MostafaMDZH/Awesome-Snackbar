module.exports = (message: string, parameters: object) => {return new Snackbar({message, ...parameters});}

class Snackbar{

    //class properties:
    public static List: Snackbar[] = [];
    
    //default values:
    public static readonly DEFAULT_HIDING_TIMEOUT: number = 4000;
    public static readonly DEFAULT_POSITION: string = 'bottom-left';

    //object properties:
    protected viewID:           number;
    protected view:             HTMLElement;
    protected message:          string;
    protected position:         string;
    protected iconSrc:          string | undefined;
    protected theme:            string | undefined;
    protected style:            object | undefined;
    protected hideEventHandler: EventListenerOrEventListenerObject;
    protected actionText:       string | undefined;
    protected onAction: (() => void) | undefined;
    protected bornTime:         number;
    protected waitForEvent:     boolean;
    protected timeout:          number;
    protected isWaitingForHide: boolean;
    protected afterHide: (() => void) | undefined;

    //constructor:
    constructor(parameters: {
            message:       string,
            position?:     string,
            theme?:        string,
            iconSrc?:      string,
            style?:        object,
            actionText?:   string,
            onAction?: () => void,
            waitForEvent?: boolean,
            timeout?:      number,
            afterHide?:() => void
        }){

        this.bornTime = Date.now();
        this.hideEventHandler = this.handleHideEvent.bind(this);

        //append CSS styles to DOM:
        Snackbar.appendCSS();

        //the view:
        this.viewID = Snackbar.generateViewID();
        let view = Snackbar.getDOM(this.viewID);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        
        //set properties:
        this.setMessage(this.message = parameters.message);
        this.setPosition(this.position = parameters.position || Snackbar.DEFAULT_POSITION);
        this.setTheme(parameters.theme);
        this.setIconSrc(parameters.iconSrc);
        this.setStyle(parameters.style);
        this.setActionText(parameters.actionText);
        this.setActionCallback(parameters.onAction);
        this.waitForEvent = parameters.waitForEvent ?? true;
        this.timeout = parameters.timeout ?? Snackbar.DEFAULT_HIDING_TIMEOUT;
        this.isWaitingForHide = false;
        this.afterHide = parameters.afterHide;
        
        //hide events:
        this.addHideEventListener();

        //don't wait for an event:
        if(!this.waitForEvent)
            this.startHidingTimer();
        
        //finally show:
        this.show();

	}

    //appendCSS:
    protected static appendCSS():void{
        if(document.getElementById('snackbar-style') === null){
            let head = document.head || document.getElementsByTagName('head')[0];
            let style = document.createElement('style');
            style.id = 'snackbar-style';
            head.appendChild(style);
            style.appendChild(document.createTextNode(Style));
        }
    }

    //generateViewID:
    protected static generateViewID():number{
		let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if(element === null)
            return id;
        return Snackbar.generateViewID();
	}

    //getDOM:
    protected static getDOM(viewId: number):ChildNode{
        const DOM = `
            <div class="snackbar" id="${viewId}">
                <div class="container">
                    <span class='icon'></span>
                    <p class="message"></p>
                    <input type="button" class="actionButton" id="${viewId}_actionButton" value="">
                </div>
            </div>
        `;
        let div = document.createElement('div');
        div.innerHTML = DOM.trim();
        return div.firstChild || div;
	}

    //setMessage:
    public setMessage(message:string):void{
        this.message = message;
        let messageEl = <HTMLElement> this.view.getElementsByClassName('message')[0];
        messageEl.innerHTML = this.message;
    }

    //setPosition:
    public setPosition(position:string):void{
        this.position = position;
        this.view.classList.remove('bottom-left');
        this.view.classList.remove('bottom-center');
        this.view.classList.remove('bottom-right');
        this.view.classList.remove('top-left');
        this.view.classList.remove('top-center');
        this.view.classList.remove('top-right');
        this.view.classList.add(position);
        Snackbar.adjustListPositions(this);
    }

    //setIconSrc:
    public setIconSrc(iconSrc?:string):void{
        if(iconSrc === undefined) return;
        this.iconSrc = iconSrc;
        let iconEl = <HTMLElement> this.view.getElementsByClassName('icon')[0];
        iconEl.style.setProperty('display', 'block');
        iconEl.style.setProperty('background-image', 'url(' + this.iconSrc + ')');
    }

    //setTheme:
    public setTheme(theme?:string):void{
        if(theme === undefined) return;
        this.theme == theme;
        this.view.classList.remove('light');
        this.view.classList.remove('dark');
        this.view.classList.add(theme);
    }

    //setStyle:
    public setStyle(style?:object):void{
        if(style === undefined) return;
        this.style = style;
        for(const [className, style] of Object.entries(this.style)){
            let root = document.getElementById(this.viewID.toString());
            let element = <HTMLElement> root!.getElementsByClassName(className)[0];
            if(element !== undefined) for(const property of style)
                element.style.setProperty(property[0], property[1]);
        }
    }

    //setActionText:
    public setActionText(actionText?:string):void{
        if(actionText === undefined) return;
        this.actionText = actionText;
        let actionButton = <HTMLInputElement> this.view.getElementsByClassName('actionButton')[0];
        actionButton.style.setProperty('display', 'block');
        actionButton.value = this.actionText;
    }

    //setActionCallback:
    protected setActionCallback(onAction?:()=>void):void{
        this.onAction = onAction;
        let actionButton = <HTMLInputElement> this.view.getElementsByClassName('actionButton')[0];
        actionButton.addEventListener('click', () => {
            if(this.onAction !== undefined)
                this.onAction();//even if action callback doesn't defined, click on button hides the view
            this.hide();
        });
    }

    //show:
    protected show():void{
        setTimeout(() => {
            Snackbar.List.push(this);
            Snackbar.adjustListPositions(this);
        }, 10);//slight delay between adding to DOM and running css animation
    }

    //addHideEventListener:
    protected addHideEventListener():void{
        const thisView = this;
        'mousemove mousedown mouseup touchmove click keydown keyup'.split(' ').forEach(function(eventName){
            window.addEventListener(eventName, thisView.hideEventHandler);
        });
    }

    //addHideEventListener:
    protected removeHideEventListener():void{
        const thisView = this;
        'mousemove mousedown mouseup touchmove click keydown keyup'.split(' ').forEach((eventName) => {
            window.removeEventListener(eventName, thisView.hideEventHandler);
        });
    }

    //handleHideEvent:
    protected handleHideEvent():void{
        let timeout = this.timeout;
        let currentTime = Date.now();
        if(currentTime - this.bornTime > this.timeout)
            timeout = this.timeout / 2;
        this.startHidingTimer(timeout);
        this.removeHideEventListener();
    }

    //startHidingTimer:
	protected startHidingTimer(timeout: number):void{
		if(timeout > 0 && !this.isWaitingForHide){
            this.isWaitingForHide = true;
			setTimeout(() => {
				this.hide();
			}, timeout);
        }
	}

    //hide:
    protected hide():void{
        const thisView = this;

        //get list of snackbars that are in this position:
        let list = Snackbar.List.filter(obj => {
            return obj.position === this.position;
        });

        //hide animation:
        if(list.length > 1){
            this.view.style.opacity = '0';
            if(this.position.indexOf('bottom') >= 0)
                 this.view.style.marginBottom = '-' + (this.getHeight() + 5) + 'px';
            else this.view.style.marginTop    = '-' + (this.getHeight() + 5) + 'px';
        }else{
            if(this.position.indexOf('bottom') >= 0)
                 this.view.style.bottom = '-' + (this.getHeight() + 15) + 'px';
            else this.view.style.top    = '-' + (this.getHeight() + 15) + 'px';
        }

        //remove from list:
        let index = Snackbar.List.indexOf(this);
        if(index > -1) Snackbar.List.splice(index, 1);

        //adjust other snackbars position:
        Snackbar.adjustListPositions(this);
        
        //remove from DOM:
        setTimeout(function(){
            thisView.view.remove();
            if(thisView.afterHide !== undefined)
                thisView.afterHide();
        }, 500);//long enough to make sure that it is hidden
    }

    //adjustListPosition:
    protected static adjustListPositions(sb: Snackbar):void{
        let list = Snackbar.List.filter(obj => {
            return obj.position === sb.position;
        });
        list.forEach(function(obj, i){
            let val = (
                20 +
                ((list.length - i - 1) * (obj.getHeight() + 5))
                ) + 'px';
            if(sb.position.indexOf('bottom') >= 0){
                obj.view.style.bottom = val;
                obj.view.style.top = 'unset';
            }else{
                obj.view.style.top = val;
                obj.view.style.bottom = 'unset';
            }
        });
    }

    //getHeight:
    protected getHeight():number{
        let heightStr = getComputedStyle(this.view).height;
        let heightNum: number = +heightStr.replace('px', '');
        return heightNum;
    }

}

const Style = `
.snackbar {
    position: fixed;
    transition: top 400ms ease 0s, bottom 400ms ease 0s, margin-top 300ms ease 0s, margin-bottom 300ms ease 0s, opacity 150ms ease 150ms;
  }
  .snackbar > .container {
    box-sizing: border-box;
    max-width: 450px;
    min-height: 46px;
    padding: 10px 20px;
    border-radius: 3px;
    background-color: rgb(58, 58, 58);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    color: rgb(250, 250, 250);
    align-items: center;
    gap: 10px;
    transition: all 150ms ease-in-out;
  }
  .snackbar > .container * {
    box-sizing: border-box;
  }
  .snackbar > .container > .icon {
    width: 20px;
    height: 20px;
    margin-left: -3px;
    margin-right: -2px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: none;
  }
  .snackbar > .container > .message {
    font-size: 0.9375rem;
  }
  .snackbar > .container > .actionButton {
    height: 100%;
    padding: 5px 3px;
    background-color: transparent;
    font-size: 0.9375rem;
    color: #F7FF00;
    border: none;
    outline: none;
    cursor: pointer;
    display: none;
  }
  
  .snackbar.bottom-left {
    left: 24px;
    bottom: -60px;
  }
  
  .snackbar.bottom-center {
    left: 50%;
    bottom: -60px;
    transform: translate(-50%, 0);
  }
  
  .snackbar.bottom-right {
    right: 24px;
    bottom: -60px;
  }
  
  .snackbar.top-left {
    left: 24px;
    top: -60px;
  }
  
  .snackbar.top-center {
    left: 50%;
    top: -60px;
    transform: translate(-50%, 0);
  }
  
  .snackbar.top-right {
    right: 24px;
    top: -60px;
  }
  
  .snackbar.light > .container {
    background-color: #fbfbfb;
    color: #555;
  }
  .snackbar.light > .container > .actionButton {
    color: #D60;
  }
  
  @media only screen and (max-width: 500px) {
    .snackbar {
      max-width: calc(100% - 48px);
    }
    .snackbar.top-center,
  .snackbar.bottom-center {
      width: calc(100% - 24px);
      max-width: unset;
      left: 12px;
      transform: translate(0, 0);
      display: flex;
      justify-content: center;
    }
  }/*# sourceMappingURL=snackbar.css.map */
`;