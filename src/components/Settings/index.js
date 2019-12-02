import React, { Component } from 'react';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

//redux
import { connect } from 'react-redux';
import { toggleSetting, closeSettings } from 'redux-store/actions';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

//components
import Switch from 'components/Switch';

const IS_MAC = process.platform === 'darwin';

class Settings extends Component {
  render() {
    const {
      showSettings,
      closeSettings,
      allowTweetLinking,
      allowExternalLinking,
      showTweetComposer,
      toggleSetting,
      minimizeOnClose
    } = this.props;

    return (
      <S.Settings show={showSettings}>
        <S.Overlay onClick={closeSettings} />
        <S.Content>
          <A.Header>
            <span>Settings</span> <A.Icon onClick={closeSettings} icon={faTimes} />
          </A.Header>
          <S.Inside>
            <Switch
              onClick={() => toggleSetting('allowExternalLinking')}
              on={allowExternalLinking}
              label="Allow external links"
            />
            <Switch
              onClick={() => toggleSetting('allowTweetLinking')}
              on={allowTweetLinking}
              label="Allow links to tweets"
            />
            <Switch
              onClick={() => toggleSetting('showTweetComposer')}
              on={showTweetComposer}
              label="Show tweet composer in menu bar"
            />
            {IS_MAC && (
              <Switch
                onClick={() => toggleSetting('minimizeOnClose')}
                on={minimizeOnClose}
                label="Minimize instead of close"
              />
            )}
          </S.Inside>
        </S.Content>
      </S.Settings>
    );
  }
}

export default connect(
  ({ showSettings, allowTweetLinking, minimizeOnClose, allowExternalLinking, showTweetComposer }) => ({
    showSettings,
    allowTweetLinking,
    allowExternalLinking,
    showTweetComposer,
    minimizeOnClose
  }),
  { toggleSetting, closeSettings }
)(Settings);
