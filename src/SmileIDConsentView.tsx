import React, { Component } from 'react';
import { HostComponent, UIManager, findNodeHandle } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { ConsentRequest } from './index';

const SmileIDConsentComponent = codegenNativeComponent<ConsentRequest>(
  'SmileIDConsentView'
) as HostComponent<ConsentRequest>;

export default class SmileIDConsentView extends Component<ConsentRequest> {
  private viewRef = React.createRef<any>(); //

  componentDidMount() {
    const parameters = {
      ...this.props,
    };

    // Obtain the command identifier
    const commandId =
      UIManager.getViewManagerConfig('SmileIDConsentView').Commands.setParams;

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
    return <SmileIDConsentComponent ref={this.viewRef} {...this.props} />;
  }
}
