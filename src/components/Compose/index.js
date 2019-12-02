import React, { Component } from 'react';
import * as S from './styles';
import urls from 'config/urls';
import { canNavigateFromCompose, canGoBackFromCompose } from 'config/url-checks';
import cssToInject from './css';
import { connect } from 'react-redux';

class Compose extends Component {
  refreshTheme = () => {
    const {
      composeRef: { current: webview }
    } = this.props;
    webview.reload();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.nightMode !== this.props.nightMode) {
      this.refreshTheme();
    }
  }

  componentDidMount() {
    const {
      composeRef: { current: webview }
    } = this.props;

    const afterNavigate = ({ url }) => {

      if (!canNavigateFromCompose(url)) {
        webview.goBack();
      }

      let showBackButton = canGoBackFromCompose(url);

      webview.executeJavaScript(
        showBackButton
          ? `document.body.classList.add('show-arrow')`
          : `document.body.classList.remove('show-arrow')`
      );
    };

    webview.addEventListener('did-navigate', afterNavigate);
    webview.addEventListener('did-navigate-in-page', afterNavigate);
    webview.addEventListener('did-stop-loading', () => {
      webview.insertCSS(cssToInject);
      // webview.openDevTools();
    });
  }

  render() {
    return (
      <S.Compose>
        <webview className={S.Webview} ref={this.props.composeRef} src={urls.compose} />
      </S.Compose>
    );
  }
}

export default connect(({ nightMode }) => ({ nightMode }))(Compose);
