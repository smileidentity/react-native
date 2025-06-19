import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ConsentRequest } from './index';
import type { NativeProps } from './types/NativeProps';

const SmileIDConsentComponent = codegenNativeComponent<
  NativeProps<ConsentRequest>
>('SmileIDConsentView') as HostComponent<NativeProps<ConsentRequest>>;

const SmileIDConsentView: React.FC<ConsentRequest> = (props) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<ConsentRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDConsentComponent {...nativeProps} />;
};

export default SmileIDConsentView;
