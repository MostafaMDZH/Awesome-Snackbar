"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./snackbar.scss");
class Snackbar {
    //constructor:
    constructor(parameters) {
        //init properties:
        this.viewID = Snackbar.generateViewID();
        this.massage = parameters.massage;
        this.position = parameters.position || Snackbar.DEFAULT_POSITION;
        this.theme = parameters.theme || Snackbar.DEFAULT_THEME;
        this.style = parameters.style || {};
        this.isWaitingForHide = false;
        this.actionText = parameters.actionText || '';
        this.onAction = parameters.onAction || function () { };
        if (parameters.hidingTimeout === 0)
            this.hidingTimeout = 0;
        else
            this.hidingTimeout = parameters.hidingTimeout || Snackbar.DEFAULT_HIDING_TIMEOUT;
        //the view:
        let view = Snackbar.getHTML(this.viewID, this.massage, this.actionText);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        this.view.classList.add(this.position);
        this.actionButton = document.getElementById(this.viewID + '_actionButton') || document.createElement('div');
        if (this.actionText !== '')
            this.actionButton.style.display = 'block';
        this.applyStyle();
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
    static generateViewID() {
        let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if (element === null)
            return id;
        return Snackbar.generateViewID();
    }
    //applyStyle:
    applyStyle() {
        this.view.classList.add(this.theme);
        for (const [className, style] of Object.entries(this.style)) {
            let root = document.getElementById(this.viewID.toString());
            let element = root.getElementsByClassName(className)[0];
            if (element !== undefined)
                for (const property of style)
                    element.style.setProperty(property[0], property[1]);
        }
    }
    //show:
    show() {
        setTimeout(() => {
            Snackbar.List.push(this);
            Snackbar.adjustListPositions(this);
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
        let list = Snackbar.List.filter(obj => {
            return obj.position === this.position;
        });
        if (list.length > 1) {
            this.view.style.opacity = '0';
            if (this.position.indexOf('bottom') >= 0)
                this.view.style.marginBottom = '-' + (this.getHeight() + 5) + 'px';
            else
                this.view.style.marginTop = '-' + (this.getHeight() + 5) + 'px';
        }
        else {
            if (this.position.indexOf('bottom') >= 0)
                this.view.style.bottom = '-' + (this.getHeight() + 15) + 'px';
            else
                this.view.style.top = '-' + (this.getHeight() + 15) + 'px';
        }
        Snackbar.List.shift();
        Snackbar.adjustListPositions(this);
        setTimeout(function () {
            thisView.view.remove();
        }, 1000); //long enough to make sure that it is hidden
    }
    //adjustListPosition:
    static adjustListPositions(sb) {
        let list = Snackbar.List.filter(obj => {
            return obj.position === sb.position;
        });
        list.forEach(function (obj, i) {
            let val = (20 +
                ((list.length - i - 1) * (obj.getHeight() + 5))) + 'px';
            if (sb.position.indexOf('bottom') >= 0)
                obj.view.style.bottom = val;
            else
                obj.view.style.top = val;
        });
    }
    //getHeight:
    getHeight() {
        let heightStr = getComputedStyle(this.view).height;
        let heightNum = +heightStr.replace('px', '');
        return heightNum;
    }
}
// class properties:
Snackbar.List = [];
//default values:
Snackbar.DEFAULT_HIDING_TIMEOUT = 4000;
Snackbar.DEFAULT_POSITION = 'bottom-left';
Snackbar.DEFAULT_THEME = 'dark';
module.exports = Snackbar;
