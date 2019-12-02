import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import themes from 'styles/themes';
import { contextMenu } from 'config/electron-imports';

//redux
import { connect } from 'react-redux';
import { setNightMode } from 'redux-store/actions';

//components
import Compose from 'components/Compose';
import Messages from 'components/Messages';

let initializedContext = false;

class App extends Component {
  messagesRef = React.createRef();
  composeRef = React.createRef();

  getCurrentWebview = () => {
    return this.messagesRef.current || this.composeRef.current;
  };

  toggleTheme = () => {
    const webview = this.getCurrentWebview();
    if (!webview) {
      return;
    }

    webview.executeJavaScript(
      `
      (async function() {
        return new Promise(function(resolve, reject) {
          const moreButton = document.querySelector("[aria-label='More menu items']");
          if (moreButton) {
            moreButton.click();
            setTimeout(function() {
              const displaySettingsButton = document.querySelector(
                "[href='/i/display']"
              );
              if (displaySettingsButton) {
                displaySettingsButton.click();
                document.body.style.opacity = 0;
                setTimeout(function() {
                  const lightElement = document.querySelector("[aria-label='Light']");
                  const darkElement = document.querySelector("[aria-label='Dim']");
                  if (lightElement && darkElement) {
                    const isLightMode = lightElement.checked;
                    if(isLightMode) {
                      darkElement.click();
                    } else {
                      lightElement.click();
                    }
                    window.history.back();
                    setTimeout(() => {
                      document.body.style.opacity = 100;
                    }, 50);
                    resolve(!!isLightMode);
                  }
                }, 100);
              }
            }, 100);
          } else {
            resolve(false);
          }
        });
      })();
    `,
      false,
      nextValue => {
        this.props.setNightMode(!!nextValue);
      }
    );
  };

  async componentDidMount() {
    const webview = this.getCurrentWebview();

    if (webview) {
      webview.addEventListener('dom-ready', () => {
        if (initializedContext === false) {
          contextMenu({
            window: webview
          });
          initializedContext = true;
        }
      });
    }
  }

  render() {
    const { nightMode } = this.props;

    const theme = themes[nightMode ? 'dark' : 'light'];

    const pageProps = {
      nightMode,
      toggleTheme: this.toggleTheme
    };

    const page = window.location.search.split('?page=')[1];

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          {page === 'messages' && <Messages webviewRef={this.messagesRef} {...pageProps} />}
          {page === 'compose' && <Compose composeRef={this.composeRef} {...pageProps} />}
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default connect(
  ({ nightMode }) => ({ nightMode }),
  { setNightMode }
)(App);
