import React, { Component } from 'react';
import type { HostComponent } from 'react-native';
import { UIManager, findNodeHandle, Platform } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieEnrollmentRequest } from './index';

const SmileIDDocumentCaptureComponent =
  codegenNativeComponent<SmartSelfieEnrollmentRequest>(
    'SmileIDDocumentCaptureView'
  ) as HostComponent<SmartSelfieEnrollmentRequest>;

export default class SmileIDDocumentCaptureView extends Component<SmartSelfieEnrollmentRequest> {
  private viewRef = React.createRef<any>(); //

  componentDidMount() {
    const parameters = {
      ...this.props,
    };

    // Obtain the command identifier
    const commandId = UIManager.getViewManagerConfig(
      'SmileIDDocumentCaptureView'
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
      <SmileIDDocumentCaptureComponent ref={this.viewRef} {...this.props} />
    );
  }
}
