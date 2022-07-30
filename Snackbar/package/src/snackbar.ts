import "./snackbar.scss"

class Snackbar{

    //static attributes:
    public static readonly ANIMATION_TIME: number = 400;
    public static readonly HIDING_DEFAULT_TIMEOUT: number = 4000;
    
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
    protected show(){
        setTimeout(()=>{
            Snackbar.SnackbarsList.push(this);
        }, 10);//slight delay between adding to DOM and running css animation
    }

    //startHidingTimer:
	protected startHidingTimer(){
		if(this.hidingTimeout > 0 && !this.isWaitingForHide){
			this.isWaitingForHide = true;
			setTimeout(() => {
				this.hide();
			}, this.hidingTimeout);
		}
	}

    //hide:
    protected hide(){
        const thisView = this;
        if(Snackbar.SnackbarsList.length > 1){
        setTimeout(function(){
            thisView.view.remove();
        }, Snackbar.ANIMATION_TIME);
    }

}

module.exports = Snackbar;