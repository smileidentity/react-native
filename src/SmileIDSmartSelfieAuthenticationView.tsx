import React, { Component } from 'react';
import {
  HostComponent,
  UIManager,
  findNodeHandle,
  Platform,
} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { SmartSelfieAuthenticationRequest } from './index';

const SmileIDSmartSelfieAuthenticationComponent =
  codegenNativeComponent<SmartSelfieAuthenticationRequest>(
    'SmileIDSmartSelfieAuthenticationView'
  ) as HostComponent<SmartSelfieAuthenticationRequest>;

export default class SmileIDSmartSelfieAuthenticationView extends Component<SmartSelfieAuthenticationRequest> {
  private viewRef = React.createRef<any>(); //

  componentDidMount() {
    const parameters = {
      ...this.props,
    };

    // Obtain the command identifier
    const commandId = UIManager.getViewManagerConfig(
      'SmileIDSmartSelfieAuthenticationView'
    ).Commands.setParams;

    // Ensure the commandId is defined and is a number
    if (typeof commandId !== 'undefined') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.viewRef.current),
        Platform.OS === 'android' ? commandId.toString() : commandId,
        [parameters]
      );
    } else {
      throw new Error(
        'Command "setParams" is not defined for MyNativeComponent'
      );
    }
  }

  render() {
    return (
      <SmileIDSmartSelfieAuthenticationComponent
        ref={this.viewRef}
        {...this.props}
      />
    );
  }
}
