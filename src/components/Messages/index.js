import React, { Component } from 'react';
import keydown, { Keys } from 'react-keydown';
import { ipc } from 'config/electron-imports';
import { IPC } from 'config/enums';

//redux
import { connect } from 'react-redux';
import { setUrl, setAuthed, showSettings, closeSettings } from 'redux-store/actions';

//other
import urls from 'config/urls';
import ReactResizeDetector from 'react-resize-detector';

import {
  linksToExternal,
  isNavigatingToTweet,
  canNavigateInternal,
  getComputed,
  isOnRequestsPage
} from 'config/url-checks';

//icons
import {
  faMoon as faMoonSolid,
  faCog,
  faBars,
  faListUl,
  faHome
} from '@fortawesome/fontawesome-free-solid';
import { faMoon } from '@fortawesome/fontawesome-free-regular';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';
import injectedCSS from './css';

//components
import ToggleIcon, { Icon } from 'components/ToggleIcon';
import Settings from 'components/Settings';

//electron
const electron = window.require('electron');
const { shell } = electron;

const LARGE_WINDOW_WIDTH = 1030;
const SCROLLBAR_BUFFER = 20;

class Messages extends Component {
  state = { isSmall: false };
  @keydown(Keys.esc)
  esc() {
    closeSettings();
  }

  goBack = () => {
    const {
      webviewRef: { current: webview }
    } = this.props;

    webview.goBack();
  };

  afterNavigate = ({ url }) => {
    const {
      webviewRef: { current: webview },
      setUrl,
      store,
      setAuthed
    } = this.props;

    const { allowTweetLinking } = store;

    let session = webview.getWebContents().session;

    setUrl(url);

    let canNavigate = canNavigateInternal(url);

    if (canNavigate === false) {
      webview.goBack();
    }

    if (isNavigatingToTweet(url)) {
      if (allowTweetLinking) {
        return shell.openExternal(url);
      }
    }

    webview.executeJavaScript(
      isOnRequestsPage(url)
        ? `document.body.classList.add('hide-arrow')`
        : `document.body.classList.remove('hide-arrow')`
    );

    session.cookies.get({ url: urls.cookiesDomain }, (error, cookies) => {
      const isAuthed = ['u', 'auth_token'].every(cookieName => !!cookies.find(c => c.name === cookieName));
      if (url === 'https://mobile.twitter.com/home') {
        if (isAuthed === true) {
          webview.loadURL(urls.messages);
        }
      }
      setAuthed(isAuthed);
    });
  };

  onExternal = ({ url }) => {
    const { allowExternalLinking } = this.props.store;
    if (allowExternalLinking && linksToExternal(url)) {
      shell.openExternal(url);
    }
  };

  afterStopLoading = () => {
    this.props.webviewRef.current.insertCSS(injectedCSS);
    // this.props.webviewRef.current.openDevTools();
  };

  componentDidMount() {
    const {
      showSettings,
      webviewRef: { current: webview }
    } = this.props;

    ipc.answerMain(IPC.OPEN_SETTINGS, showSettings);

    webview.addEventListener('did-stop-loading', this.afterStopLoading);
    webview.addEventListener('did-navigate', this.afterNavigate);
    webview.addEventListener('did-navigate-in-page', this.afterNavigate);
    webview.addEventListener('new-window', this.onExternal);
  }

  onResize = width => this.setState({ isSmall: width < LARGE_WINDOW_WIDTH - SCROLLBAR_BUFFER });

  toggleSize = () => {
    const { isSmall } = this.state;
    ipc.callMain(IPC.RESIZE, { isSmall });
  };

  render() {
    const { toggleTheme, webviewRef, store, showSettings } = this.props;
    const { nightMode } = store;
    const { isSmall } = this.state;

    const { showHeader, showBackButton, showMessages, showNightMode } = getComputed({
      ...store,
      isSmall,
      isLarge: !isSmall
    });

    return (
      <S.Messages>
        <Settings />

        <ReactResizeDetector refreshMode="throttle" handleWidth onResize={this.onResize} />

        {showHeader && (
          <S.Header>
            {showBackButton && <Icon onClick={this.goBack} icon={faHome} />}

            <S.Title>{showMessages && 'Twizzle'}</S.Title>

            <A.Horizontal spaceAll={12}>
              {showNightMode && (
                <ToggleIcon icons={[faMoonSolid, faMoon]} on={nightMode} toggle={toggleTheme} />
              )}
              <ToggleIcon icons={[faBars, faListUl]} on={!isSmall} toggle={this.toggleSize} />
              <Icon onClick={showSettings} icon={faCog} />
            </A.Horizontal>
          </S.Header>
        )}

        <S.Webview showHeader={showHeader} ref={webviewRef} src={urls.messages} />
      </S.Messages>
    );
  }
}

export default connect(
  ({ nightMode, size, url, isAuthed, allowExternalLinking, allowTweetLinking }) => ({
    store: { nightMode, url, isAuthed, allowExternalLinking, allowTweetLinking }
  }),
  { setUrl, setAuthed, showSettings, closeSettings }
)(Messages);
