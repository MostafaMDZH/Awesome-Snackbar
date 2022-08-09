"use strict";
class Snackbar {
    //constructor:
    constructor(parameters) {
        var _a;
        //append CSS styles to DOM:
        Snackbar.appendCSS();
        //the view:
        this.viewID = Snackbar.generateViewID();
        let view = Snackbar.getDOM(this.viewID);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        //set properties:
        this.message = parameters.message || 'does anybody here?';
        this.setMessage(this.message);
        this.position = parameters.position || Snackbar.DEFAULT_POSITION;
        this.setPosition(this.position);
        this.setTheme(parameters.theme);
        this.setIconSrc(parameters.iconSrc);
        this.setStyle(parameters.style);
        this.setActionText(parameters.actionText);
        this.setActionCallback(parameters.onAction);
        this.timeout = (_a = parameters.timeout) !== null && _a !== void 0 ? _a : Snackbar.DEFAULT_HIDING_TIMEOUT;
        this.isWaitingForHide = false;
        //events:
        this.setHideEvents();
        //finally show:
        this.show();
    }
    //appendCSS:
    static appendCSS() {
        if (document.getElementById('snackbar-style') === null) {
            let head = document.head || document.getElementsByTagName('head')[0];
            let style = document.createElement('style');
            style.id = 'snackbar-style';
            head.appendChild(style);
            style.appendChild(document.createTextNode(Style));
        }
    }
    //generateViewID:
    static generateViewID() {
        let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if (element === null)
            return id;
        return Snackbar.generateViewID();
    }
    //getDOM:
    static getDOM(viewId) {
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
    setMessage(message) {
        this.message = message;
        let messageEl = this.view.getElementsByClassName('message')[0];
        messageEl.innerHTML = this.message;
    }
    //setPosition:
    setPosition(position) {
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
    setIconSrc(iconSrc) {
        if (iconSrc === undefined)
            return;
        this.iconSrc = iconSrc;
        let iconEl = this.view.getElementsByClassName('icon')[0];
        iconEl.style.setProperty('display', 'block');
        iconEl.style.setProperty('background-image', 'url(' + this.iconSrc + ')');
    }
    //setTheme:
    setTheme(theme) {
        if (theme === undefined)
            return;
        this.theme == theme;
        this.view.classList.remove('light');
        this.view.classList.remove('dark');
        this.view.classList.add(theme);
    }
    //setStyle:
    setStyle(style) {
        if (style === undefined)
            return;
        this.style = style;
        for (const [className, style] of Object.entries(this.style)) {
            let root = document.getElementById(this.viewID.toString());
            let element = root.getElementsByClassName(className)[0];
            if (element !== undefined)
                for (const property of style)
                    element.style.setProperty(property[0], property[1]);
        }
    }
    //setActionText:
    setActionText(actionText) {
        if (actionText === undefined)
            return;
        this.actionText = actionText;
        let actionButton = this.view.getElementsByClassName('actionButton')[0];
        actionButton.style.setProperty('display', 'block');
        actionButton.value = this.actionText;
    }
    //setActionCallback:
    setActionCallback(onAction) {
        this.onAction = onAction;
        let actionButton = this.view.getElementsByClassName('actionButton')[0];
        actionButton.addEventListener('click', () => {
            if (this.onAction !== undefined)
                this.onAction(); //even if action callback doesn't defined, click on button hides the view
            this.hide();
        });
    }
    //setHideEvents:
    setHideEvents() {
        const thisView = this;
        'mousemove mousedown mouseup touchmove click keydown keyup'.split(' ').forEach(function (event) {
            window.addEventListener(event, () => {
                thisView.startHidingTimer();
            });
        });
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
        if (this.timeout > 0 && !this.isWaitingForHide) {
            this.isWaitingForHide = true;
            setTimeout(() => {
                this.hide();
            }, this.timeout);
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
        //remove from list:
        let index = Snackbar.List.indexOf(this);
        if (index > -1)
            Snackbar.List.splice(index, 1);
        Snackbar.adjustListPositions(this);
        //remove from DOM:
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
module.exports = Snackbar;
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
    font-size: 0.87rem;
  }
  .snackbar > .container > .actionButton {
    height: 100%;
    padding: 5px 3px;
    background-color: transparent;
    font-size: 0.87rem;
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
    color: #5f5f5f;
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
