"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./snackbar.scss");
class Snackbar {
    //constructor:
    constructor(parameters) {
        //init properties:
        this.viewID = Snackbar.generateViewID();
        this.massage = parameters.massage;
        this.isWaitingForHide = false;
        this.actionText = parameters.actionText || '';
        this.onAction = parameters.onAction || function () { };
        if (parameters.hidingTimeout === 0)
            this.hidingTimeout = 0;
        else
            this.hidingTimeout = parameters.hidingTimeout || Snackbar.HIDING_DEFAULT_TIMEOUT;
        //the view:
        let view = Snackbar.getHTML(this.viewID, this.massage, this.actionText);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        this.actionButton = document.getElementById(this.viewID + '_actionButton') || document.createElement('div');
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
            this.onAction();
            this.hide();
        });
        //finally show:
        this.show();
    }
    //getHTML:
    static getHTML(viewId, massage, actionText) {
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
            Snackbar.SnackbarsList.push(this);
            Snackbar.adjustListPosition();
        }, 10); //slight delay between adding to DOM and running css animation
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
        if (Snackbar.SnackbarsList.length > 1) {
            this.view.style.opacity = '0';
            this.view.style.marginBottom = '-70px';
        }
        else
            this.view.style.bottom = '-60px';
        Snackbar.SnackbarsList.shift();
        Snackbar.adjustListPosition();
        setTimeout(function () {
            thisView.view.remove();
        }, 1000); //long enough to make sure that it is hidden
    }
    //adjustListPosition:
    static adjustListPosition() {
        let listLength = Snackbar.SnackbarsList.length;
        Snackbar.SnackbarsList.forEach(function (sb, i) {
            sb.view.style.bottom = (25 +
                ((listLength - i - 1) * (sb.getHeight() + 5))) + 'px';
        });
    }
    //getHeight:
    getHeight() {
        let heightStr = getComputedStyle(this.view).height;
        let heightNum = +heightStr.replace('px', '');
        return heightNum;
    }
}
//default values:
Snackbar.HIDING_DEFAULT_TIMEOUT = 4000;
// class properties:
Snackbar.SnackbarsList = [];
module.exports = Snackbar;
