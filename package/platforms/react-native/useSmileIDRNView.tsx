import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {NativeProps} from "./NativeProps";

/**
 * Factory function to create SmileID view components with consistent event handling
 * @param viewName The native view name
 * @returns A React component that handles SmileID events
 */
export function createSmileIDView<T extends { onResult?: (event: any) => void }>(
  viewName: string
) {
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
