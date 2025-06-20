import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewFactoryInterface } from '../../core/SmileIDViewFactory';

/**
 * Native props interface for SmileID views
 */
interface NativeProps<T> {
  config: [T];
  onSmileIDResult?: (event: any) => void;
  onSmileIDError?: (event: any) => void;
}

/**
 * React Native implementation of the view factory
 */
export class ReactNativeViewFactory implements ViewFactoryInterface {
  createView<T extends { onResult?: (event: any) => void }>(
    viewName: string
  ): React.ComponentType<T> {
    // Create the native component using codegen
    const NativeComponent = codegenNativeComponent<NativeProps<T>>(
      viewName
    ) as HostComponent<NativeProps<T>>;

    // Return a component that maps props to native props
    return function SmileIDView(props: T) {
      const { onResult, ...configProps } = props;
      
      const nativeProps: NativeProps<T> = {
        config: configProps as [T],
        onSmileIDResult: onResult,
        onSmileIDError: onResult,
      };

      return <NativeComponent {...nativeProps} />;
    };
  }
}