import React, { Component } from 'react';
import { HostComponent, UIManager, findNodeHandle } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { DocumentVerificationRequest } from './index';

const SmileIDEnhancedDocumentVerificationComponent =
  codegenNativeComponent<DocumentVerificationRequest>(
    'SmileIDEnhancedDocumentVerificationView'
  ) as HostComponent<DocumentVerificationRequest>;

export default class SmileIDEnhancedDocumentVerificationView extends Component<DocumentVerificationRequest> {
  private viewRef = React.createRef<any>(); //

  componentDidMount() {
    const parameters = {
      ...this.props,
    };

    // Obtain the command identifier
    const commandId = UIManager.getViewManagerConfig(
      'SmileIDEnhancedDocumentVerificationView'
    ).Commands.setParams;

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
    return (
      <SmileIDEnhancedDocumentVerificationComponent
        ref={this.viewRef}
        {...this.props}
      />
    );
  }
}
