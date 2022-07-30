import "./snackbar.scss"

class Snackbar{

    // class properties:
    public static List: Snackbar[] = [];
    
    //default values:
    public static readonly DEFAULT_HIDING_TIMEOUT: number = 4000;
    public static readonly DEFAULT_POSITION:       string = 'bottom-left';

    //object properties:
    protected viewID:           number;
    protected view:             HTMLElement;
    protected actionButton:     HTMLElement;
    protected massage:          string;
    protected position:         string;
    protected style:            object;
    protected isWaitingForHide: boolean;
    protected actionText:       string;
    protected onAction:         () => void;
    protected hidingTimeout:    number;

    //constructor:
    constructor(parameters: {
            massage:        string,
            position?:      string,
            style?:         object,
            actionText?:    string,
            onAction?:  () => void,
            hidingTimeout?: number
        }){

        //init properties:
        this.viewID           = Snackbar.generateViewID();
        this.massage          = parameters.massage;
        this.position         = parameters.position || Snackbar.DEFAULT_POSITION;
        this.style            = parameters.style || {};
        this.isWaitingForHide = false;
		this.actionText       = parameters.actionText || '';
        this.onAction         = parameters.onAction || function(){};
        if(parameters.hidingTimeout === 0) this.hidingTimeout = 0;
        else this.hidingTimeout = parameters.hidingTimeout || Snackbar.DEFAULT_HIDING_TIMEOUT;
        
        //the view:
        let view = Snackbar.getHTML(this.viewID, this.massage, this.actionText);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        this.view.classList.add(this.position);
        this.actionButton = document.getElementById(this.viewID + '_actionButton') || document.createElement('div');
        if(this.actionText !== '') this.actionButton.style.display = 'block';

        //style:
        for(const [className, style] of Object.entries(this.style)){
            let root = document.getElementById(this.viewID.toString());
            let element = <HTMLElement> root!.getElementsByClassName(className)[0];
            if(element !== undefined)
                for(const property of style)
                    element.style.setProperty(property[0], property[1]);
        }
        
        //events:
        const thisView = this;
        'mousemove mousedown mouseup touchmove click keydown keyup'.split(' ').forEach(function(event){
            window.addEventListener(event, () => {
                thisView.startHidingTimer();
            });
        });
        this.actionButton.addEventListener('click', () => {
            this.onAction();
            this.hide();
        });
        
        //finally show:
        this.show();

	}

    //getHTML:
    protected static getHTML(viewId: number, massage: string, actionText?: string): ChildNode{
        const htmlString = `
            <div class="snackbar" id="${viewId}">
                <div class="container">
                    <p id="massage">${massage}</p>
                    <input type="button" class="actionButton" id="${viewId}_actionButton" value="${actionText}">
                </div>
            </div>
        `;
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild || div;
	}

    //generateViewID:
    protected static generateViewID(): number{
		let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if(element === null)
            return id;
        return Snackbar.generateViewID();
	}

    //show:
    protected show(): void{
        setTimeout(() => {
            Snackbar.List.push(this);
            Snackbar.adjustListPositions(this);
        }, 10);//slight delay between adding to DOM and running css animation
    }

    //startHidingTimer:
	protected startHidingTimer(): void{
		if(this.hidingTimeout > 0 && !this.isWaitingForHide){
			this.isWaitingForHide = true;
			setTimeout(() => {
				this.hide();
			}, this.hidingTimeout);
		}
	}

    //hide:
    protected hide(): void{
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
        Snackbar.List.shift();
        Snackbar.adjustListPositions(this);
        setTimeout(function(){
            thisView.view.remove();
        }, 1000);//long enough to make sure that it is hidden
    }

    //adjustListPosition:
    static adjustListPositions(sb: Snackbar): void{
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
    protected getHeight(): number{
        let heightStr = getComputedStyle(this.view).height;
        let heightNum: number = +heightStr.replace('px', '');
        return heightNum;
    }

}

module.exports = Snackbar;