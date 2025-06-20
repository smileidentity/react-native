import React from 'react';
import { requireNativeView } from 'expo';

/**
 * Common event types for all SmileID Expo views
 */
export interface SmileIDEventHandlers {
  onSmileIDResult?: (event: { nativeEvent: { result: string } }) => void;
  onSmileIDError?: (event: { nativeEvent: { error: string; code: string } }) => void;
}

/**
 * Creates a SmileID Expo view component with event handling
 * @param viewName The native view name to require
 * @returns A component that handles SmileID events
 */
export function createSmileIDView<T extends { onResult?: (event: any) => void }>(
  viewName: string
) {
  type ViewProps = T & SmileIDEventHandlers;
  
  const NativeView: React.ComponentType<ViewProps> = requireNativeView(viewName);

  return function SmileIDView(props: T) {
    const handleResult = (event: { nativeEvent: { result: string } }) => {
      props.onResult?.(event.nativeEvent);
    };

    const handleError = (event: { nativeEvent: { error: string; code: string } }) => {
      props.onResult?.(event.nativeEvent);
    };

    return (
      <NativeView
        {...props}
        onSmileIDResult={handleResult}
        onSmileIDError={handleError}
      />
    );
  };
}