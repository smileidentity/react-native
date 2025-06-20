import React from 'react';
import { requireNativeView } from 'expo';
import type { ViewFactoryInterface } from '../../core/SmileIDViewFactory';

/**
 * Common event types for all SmileID Expo views
 */
interface SmileIDEventHandlers {
  onSmileIDResult?: (event: { nativeEvent: { result: string } }) => void;
  onSmileIDError?: (event: { nativeEvent: { error: string; code: string } }) => void;
}

/**
 * Expo implementation of the view factory
 */
export class ExpoViewFactory implements ViewFactoryInterface {
  createView<T extends { onResult?: (event: any) => void }>(
    viewName: string
  ): React.ComponentType<T> {
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
}