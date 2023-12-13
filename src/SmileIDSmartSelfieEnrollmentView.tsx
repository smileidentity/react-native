import React, { Component } from 'react';
import { HostComponent, UIManager, findNodeHandle } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { SmartSelfieEnrollmentRequest } from './index';

const SmileIDSmartSelfieEnrollmentComponent =
  codegenNativeComponent<SmartSelfieEnrollmentRequest>(
    'SmileIDSmartSelfieEnrollmentView'
  ) as HostComponent<SmartSelfieEnrollmentRequest>;

export default class SmileIDSmartSelfieEnrollmentView extends Component<SmartSelfieEnrollmentRequest> {
  private viewRef = React.createRef<any>(); //

  componentDidMount() {
    const parameters = {
      ...this.props,
    };

    // Obtain the command identifier
    const commandId = UIManager.getViewManagerConfig(
      'SmileIDSmartSelfieEnrollmentView'
    ).Commands.setParams;

    // Ensure the commandId is defined and is a number
    if (typeof commandId !== 'undefined') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.viewRef.current),
        commandId.toString(),
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
      <SmileIDSmartSelfieEnrollmentComponent
        ref={this.viewRef}
        {...this.props}
      />
    );
  }
}
