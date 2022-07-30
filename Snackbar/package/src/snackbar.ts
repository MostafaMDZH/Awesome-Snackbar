import "./snackbar.scss"

class Snackbar{

    //default values:
    public static readonly HIDING_DEFAULT_TIMEOUT: number = 4000;

    // class properties:
    public static List: Snackbar[] = [];
    
    //object properties:
    protected viewID:           number;
    protected view:             HTMLElement;
    protected actionButton:     HTMLElement;
    protected massage:          string;
    protected isWaitingForHide: boolean;
    protected actionText:       string;
    protected onAction:         () => void;
    protected hidingTimeout:    number;

    //constructor:
    constructor(parameters: {
            massage:        string,
            actionText?:    string,
            onAction?:  () => void,
            hidingTimeout?: number
        }){

        //init properties:
        this.viewID           = Snackbar.generateViewID();
        this.massage          = parameters.massage;
        this.isWaitingForHide = false;
		this.actionText       = parameters.actionText || '';
        this.onAction         = parameters.onAction || function(){};
        if(parameters.hidingTimeout === 0) this.hidingTimeout = 0;
        else this.hidingTimeout = parameters.hidingTimeout || Snackbar.HIDING_DEFAULT_TIMEOUT;
        
        //the view:
        let view = Snackbar.getHTML(this.viewID, this.massage, this.actionText);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        this.actionButton = document.getElementById(this.viewID + '_actionButton') || document.createElement('div');
        if(this.actionText !== '') this.actionButton.style.display = 'block';
        
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
                <a id="massage">${massage}</a>
                <input type="button" class="actionButton" id="${viewId}_actionButton" value="${actionText}">
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
        setTimeout(()=>{
            Snackbar.List.push(this);
            Snackbar.adjustListPosition();
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
        if(Snackbar.List.length > 1){
            this.view.style.opacity = '0';
            this.view.style.marginBottom = '-70px';
        }else
            this.view.style.bottom = '-60px';
        Snackbar.List.shift();
        Snackbar.adjustListPosition();
        setTimeout(function(){
            thisView.view.remove();
        }, 1000);//long enough to make sure that it is hidden
    }

    //adjustListPosition:
    static adjustListPosition(): void{
        let listLength = Snackbar.List.length;
        Snackbar.List.forEach(function(sb, i){
            sb.view.style.bottom = (
                25 +
                ((listLength - i - 1) * (sb.getHeight() + 5))
                ) + 'px';
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