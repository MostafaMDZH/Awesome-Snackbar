"use strict";
class Snackbar {
    //constructor:
    // constructor(config: {massage: string, actionText?: string, actionCallback?: () => void, hidingTimeout?: number}){
    constructor(config) {
        //init properties:
        this.viewID = Snackbar.generateViewID();
        this.massage = config.massage;
        this.isWaitingForHide = false;
        this.actionText = config.actionText || '';
        this.actionCallback = config.actionCallback || function () { };
        if (config.hidingTimeout === 0)
            this.hidingTimeout = 0;
        else
            this.hidingTimeout = config.hidingTimeout || Snackbar.HIDING_DEFAULT_TIMEOUT;
        //the view:
        document.body.innerHTML += Snackbar.getHTML(this.viewID, this.massage, this.actionText);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('');
        this.actionButton = document.getElementById(this.viewID + '_actionButton') || document.createElement('');
        if (this.actionText !== '')
            this.actionButton.style.display = 'block';
        //events:
        const thisView = this;
        'mousemove mousedown mouseup touchmove click keydown keyup'.split(' ').forEach(function (event) {
            window.addEventListener(event, () => {
                thisView.startHidingTimer();
            });
        });
        this.actionButton.addEventListener('click', () => {
            this.actionCallback();
            this.hide();
        });
        //finally show:
        this.show();
    }
    //getHTML:
    static getHTML(viewId, massage, actionText) {
        return `
			<div class="snackbar" id="${viewId}">
				<a id="massage">${massage}</a>
				<input type="button" class="actionButton" id="${viewId}_actionButton" value="${actionText}">
			</div>
		`;
    }
    //generateViewID:
    static generateViewID() {
        let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if (element === null)
            return id;
        return Snackbar.generateViewID();
    }
    //show:
    show() {
        setTimeout(() => {
            this.view.classList.add('show');
        }, 10); //slight delay between add and show
    }
    //startHidingTimer:
    startHidingTimer() {
        if (this.hidingTimeout > 0 && !this.isWaitingForHide) {
            this.isWaitingForHide = true;
            setTimeout(() => {
                this.hide();
            }, this.hidingTimeout);
        }
    }
    //hide:
    hide() {
        const thisView = this;
        this.view.classList.remove('show');
        setTimeout(function () {
            thisView.view.remove();
        }, Snackbar.ANIMATION_TIME);
    }
}
//static attributes:
Snackbar.ANIMATION_TIME = 400;
Snackbar.HIDING_DEFAULT_TIMEOUT = 4000;
