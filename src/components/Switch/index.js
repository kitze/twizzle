import React, { Component } from 'react';

//styles
import * as S from './styles';

//components
import Toggle from '../../components/Toggle';

class Switch extends Component {
  render() {
    const { label, onClick, ...rest } = this.props;
    return (
      <S.Switch onClick={onClick}>
        <Toggle {...rest} />
        <S.Label>{label}</S.Label>
      </S.Switch>
    );
  }
}

export default Switch;
