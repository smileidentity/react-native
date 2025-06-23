import * as React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { NativeProps } from './NativeProps';

/**
 * Factory function to create SmileID view components with consistent event handling
 * @param viewName The native view name
 * @returns A React component that handles SmileID events
 */
export function createSmileIDView<
  T extends { onResult?: (event: any) => void },
>(viewName: string) {
  // Create the native component using codegen
  const NativeComponent = codegenNativeComponent<
    NativeProps<Omit<T, 'onResult'>>
  >(viewName) as HostComponent<NativeProps<Omit<T, 'onResult'>>>;

  // Return a component that maps props to native props
  return function SmileIDView(props: T) {
    const { onResult, ...configProps } = props;

    const nativeProps: NativeProps<Omit<T, 'onResult'>> = {
      config: [configProps],
      onSmileIDResult: onResult,
      onSmileIDError: onResult,
    };

    return <NativeComponent {...nativeProps} />;
  };
}
