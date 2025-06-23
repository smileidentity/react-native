import React from 'react';
import { PlatformDetector } from './PlatformDetector';

/**
 * Platform-agnostic view factory interface
 */
export interface ViewFactoryInterface {
  createView<T>(viewName: string): React.ComponentType<T>;
}

/**
 * Factory for creating SmileID view components that work across platforms
 */
export class SmileIDViewFactory {
  private static viewFactory: ViewFactoryInterface | null = null;

  /**
   * Initialize the view factory for the current platform
   */
  private static async getViewFactory(): Promise<ViewFactoryInterface> {
    if (this.viewFactory) {
      return this.viewFactory;
    }

    const platform = PlatformDetector.getPlatform();

    if (platform === 'expo') {
      // Dynamically import Expo factory
      const { ExpoViewFactory } = await import(
        '../platforms/expo/ExpoViewFactory'
      );
      this.viewFactory = new ExpoViewFactory();
    } else {
      // Dynamically import React Native factory
      const { ReactNativeViewFactory } = await import(
        '../platforms/react-native/ReactNativeViewFactory'
      );
      this.viewFactory = new ReactNativeViewFactory();
    }

    return this.viewFactory;
  }

  /**
   * Create a SmileID view component for the current platform
   * @param viewName The native view name
   * @returns A React component
   */
  static async createView<T extends { onResult?: (event: any) => void }>(
    viewName: string
  ): Promise<React.ComponentType<T>> {
    const factory = await this.getViewFactory();
    return factory.createView<T>(viewName);
  }

  /**
   * Create a SmileID view component synchronously (requires pre-initialization)
   * @param viewName The native view name
   * @returns A React component
   */
  static createViewSync<T extends { onResult?: (event: any) => void }>(
    viewName: string
  ): React.ComponentType<T> {
    if (!this.viewFactory) {
      throw new Error(
        'SmileIDViewFactory not initialized. Call getViewFactory() first or use createView() for async initialization.'
      );
    }
    return this.viewFactory.createView<T>(viewName);
  }
}
