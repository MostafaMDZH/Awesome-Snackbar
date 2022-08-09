export default `
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