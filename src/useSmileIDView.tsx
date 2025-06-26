import { useEffect, useRef, useState } from 'react';
import {
  Platform,
  UIManager,
  findNodeHandle,
} from 'react-native';
import type { SmileIDViewProps } from './types';

export const useSmileIDView = (viewName: string, props: SmileIDViewProps) => {
  const viewRef = useRef<any>(null);
  const [viewProps, _setViewProps] = useState<SmileIDViewProps>(props);
  const onResultRef = useRef(viewProps.onResult);

  useEffect(() => {
    onResultRef.current = viewProps.onResult;
  }, [viewProps.onResult]);

  useEffect(() => {
    const viewId = findNodeHandle(viewRef.current);
    const commandId = UIManager.getViewManagerConfig(viewName).Commands.create;

    if (typeof commandId !== 'undefined') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(viewRef.current),
        Platform.OS === 'android' ? commandId.toString() : commandId,
        [viewId]
      );
    } else {
      throw new Error('Command "create" is not defined for MyNativeComponent');
    }
  }, [viewName]);

  useEffect(() => {
    const parameters = {
      ...viewProps,
    };

    const viewId = findNodeHandle(viewRef.current);
    const commandId =
      UIManager.getViewManagerConfig(viewName).Commands.setParams;

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
  }, [viewProps, viewName]);

  return viewRef;
};
