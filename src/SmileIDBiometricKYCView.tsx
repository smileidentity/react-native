import React, { Component } from 'react';
import { HostComponent, UIManager, findNodeHandle } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { BiometricKYCRequest } from './index';

const SmileIDBiometricKYCComponent =
  codegenNativeComponent<BiometricKYCRequest>(
    'SmileIDBiometricKYCView'
  ) as HostComponent<BiometricKYCRequest>;

export default class SmileIDBiometricKYCView extends Component<BiometricKYCRequest> {
  private viewRef = React.createRef<any>(); //

  componentDidMount() {
    const parameters = {
      ...this.props,
    };

    // Obtain the command identifier
    const commandId = UIManager.getViewManagerConfig('SmileIDBiometricKYCView')
      .Commands.setParams;

    // Ensure the commandId is defined and is a number
    if (typeof commandId !== 'undefined') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.viewRef.current),
        commandId,
        [parameters]
      );
    } else {
      throw new Error(
        'Command "setParams" is not defined for MyNativeComponent'
      );
    }
  }

  render() {
    return <SmileIDBiometricKYCComponent ref={this.viewRef} {...this.props} />;
  }
}
