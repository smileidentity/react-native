import { useEffect, useRef } from 'react';
import {
  DeviceEventEmitter,
  Platform,
  UIManager,
  findNodeHandle,
} from 'react-native';

interface SmileIDProps {
  onResult?: (event: { nativeEvent: { error: any; result: any } }) => void;
  [key: string]: any;
}

export const useSmileIDView = (viewName: string, props: SmileIDProps) => {
  const viewRef = useRef<any>(null);

  useEffect(() => {
    const eventListener = DeviceEventEmitter.addListener(
      'onSmileResult',
      (event) => {
        if (props.onResult) {
          const nativeEvent = {
            nativeEvent: {
              error: event.error,
              result: event.result,
            },
          };
          props.onResult(nativeEvent);
        }
      }
    );

    return () => {
      eventListener.remove();
    };
  }, [props]);

  useEffect(() => {
    const viewId = findNodeHandle(viewRef.current);
    const commandId = UIManager.getViewManagerConfig(viewName).Commands.create;

    // Ensure the commandId is defined and is a number
    if (typeof commandId !== 'undefined') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(viewRef.current),
        Platform.OS === 'android' ? commandId.toString() : commandId,
        [viewId]
      );
    } else {
      throw new Error(
        'Command "setParams" is not defined for MyNativeComponent'
      );
    }
  }, [viewName]);

  useEffect(() => {
    const parameters = {
      ...props,
    };

    const viewId = findNodeHandle(viewRef.current);
    const commandId =
      UIManager.getViewManagerConfig(viewName).Commands.setParams;

    // Ensure the commandId is defined and is a number
    if (typeof commandId !== 'undefined') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(viewRef.current),
        Platform.OS === 'android' ? commandId.toString() : commandId,
        [viewId, parameters]
      );
    } else {
      throw new Error(
        'Command "setParams" is not defined for MyNativeComponent'
      );
    }
  }, [props, viewName]);

  return viewRef;
};
