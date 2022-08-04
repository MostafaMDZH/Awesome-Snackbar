const Style = require('./style.js');

class Snackbar{

    // class properties:
    public static List: Snackbar[] = [];
    
    //default values:
    public static readonly DEFAULT_HIDING_TIMEOUT: number = 4000;
    public static readonly DEFAULT_POSITION: string = 'bottom-left';

    //object properties:
    protected viewID:       number;
    protected view:         HTMLElement;
    protected massage:      string;
    protected position:     string;
    protected iconSrc:      string | undefined;
    protected theme:        string | undefined;
    protected style:        object | undefined;
    protected actionText:   string | undefined;
    protected onAction:     (() => void) | undefined;
    protected timeout:      number;
    protected isWaitingForHide: boolean;

    //constructor:
    constructor(parameters: {
            massage?:        string,
            position?:       string,
            theme?:          string,
            iconSrc?:        string,
            style?:          object,
            actionText?:     string,
            onAction?: () => void,
            timeout?:        number
        }){

        //append CSS styles to DOM:
        Snackbar.appendCSS();

        //the view:
        this.viewID = Snackbar.generateViewID();
        let view = Snackbar.getDOM(this.viewID);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        
        //set properties:
        this.massage = parameters.massage || 'does anybody here?';
        this.setMassage(this.massage);
        this.position = parameters.position || Snackbar.DEFAULT_POSITION;
        this.setPosition(this.position);
        this.setTheme(parameters.theme);
        this.setIcon(parameters.iconSrc);
        this.setStyle(parameters.style);
        this.setActionText(parameters.actionText);
        this.timeout = parameters.timeout ?? Snackbar.DEFAULT_HIDING_TIMEOUT;
        this.isWaitingForHide = false;
        
        //events:
        this.setHideEvents();
        
        //finally show:
        this.show();

	}

    //appendCSS:
    static appendCSS():void{
        if(document.getElementById('snackbar-style') === null){
            let head = document.head || document.getElementsByTagName('head')[0];
            let style = document.createElement('style');
            style.id = 'snackbar-style';
            head.appendChild(style);
            style.appendChild(document.createTextNode(Style.default));
        }
    }

    //generateViewID:
    protected static generateViewID(): number{
		let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if(element === null)
            return id;
        return Snackbar.generateViewID();
	}

    //getDOM:
    protected static getDOM(viewId: number): ChildNode{
        const DOM = `
            <div class="snackbar" id="${viewId}">
                <div class="container">
                    <span class='icon'></span>
                    <p class="massage"></p>
                    <input type="button" class="actionButton" id="${viewId}_actionButton" value="">
                </div>
            </div>
        `;
        let div = document.createElement('div');
        div.innerHTML = DOM.trim();
        return div.firstChild || div;
	}

    //setMassage:
    protected setMassage(massage:string):void{
        this.massage = massage;
        let massageEl = <HTMLElement> this.view.getElementsByClassName('massage')[0];
        massageEl.innerHTML = this.massage;
    }

    //setPosition:
    protected setPosition(position:string):void{
        this.position = position;
        this.view.classList.remove('bottom-left');
        this.view.classList.remove('bottom-center');
        this.view.classList.remove('bottom-right');
        this.view.classList.remove('top-left');
        this.view.classList.remove('top-center');
        this.view.classList.remove('top-right');
        this.view.classList.add(position);
    }

    //setIcon:
    protected setIcon(iconSrc?:string):void{
        if(iconSrc === undefined) return;
        this.iconSrc = iconSrc;
        let iconEl = <HTMLElement> this.view.getElementsByClassName('icon')[0];
        iconEl.style.setProperty('display', 'block');
        iconEl.style.setProperty('background-image', 'url(' + this.iconSrc + ')');
    }

    //setTheme:
    protected setTheme(theme?:string):void{
        if(theme === undefined) return;
        this.theme == theme;
        this.view.classList.remove('light');
        this.view.classList.remove('dark');
        this.view.classList.add(theme);
    }

    //setStyle:
    protected setStyle(style?:object):void{
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
    protected setActionText(actionText?:string):void{
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

    //setHideEvents:
    protected setHideEvents():void{
        const thisView = this;
        'mousemove mousedown mouseup touchmove click keydown keyup'.split(' ').forEach(function(event){
            window.addEventListener(event, () => {
                thisView.startHidingTimer();
            });
        });
    }

    //show:
    protected show():void{
        setTimeout(() => {
            Snackbar.List.push(this);
            Snackbar.adjustListPositions(this);
        }, 10);//slight delay between adding to DOM and running css animation
    }

    //startHidingTimer:
	protected startHidingTimer():void{
		if(this.timeout > 0 && !this.isWaitingForHide){
            this.isWaitingForHide = true;
			setTimeout(() => {
				this.hide();
			}, this.timeout);
        }
	}

    //hide:
    protected hide():void{
        const thisView = this;
        let list = Snackbar.List.filter(obj => {
            return obj.position === this.position;
        });
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

        Snackbar.adjustListPositions(this);
        
        //remove from DOM:
        setTimeout(function(){
            thisView.view.remove();
        }, 1000);//long enough to make sure that it is hidden
    }

    //adjustListPosition:
    static adjustListPositions(sb: Snackbar):void{
        let list = Snackbar.List.filter(obj => {
            return obj.position === sb.position;
        });
        list.forEach(function(obj, i){
            let val = (
                20 +
                ((list.length - i - 1) * (obj.getHeight() + 5))
                ) + 'px';
            if(sb.position.indexOf('bottom') >= 0)
                obj.view.style.bottom = val;
            else
                obj.view.style.top = val;
        });
    }

    //getHeight:
    protected getHeight():number{
        let heightStr = getComputedStyle(this.view).height;
        let heightNum: number = +heightStr.replace('px', '');
        return heightNum;
    }

}

module.exports = Snackbar;