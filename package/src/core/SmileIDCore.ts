/**
 * Core business logic for SmileID React Native SDK
 * This module contains shared functionality between Expo and React Native platforms
 */

export interface SmileIDError {
  code: string;
  message: string;
  details?: any;
}

export class SmileIDCore {
  /**
   * Process and standardize responses from native modules
   * @param response Raw response from native module
   * @param responseType Type of response for error context
   * @returns Processed response
   */
  static async processResponse<T>(
    response: any,
    responseType: string
  ): Promise<T> {
    try {
      // Handle string JSON responses (common from Expo modules)
      if (typeof response === 'string') {
        try {
          return JSON.parse(response);
        } catch (parseError) {
          throw new Error(
            `Failed to parse ${responseType} response as JSON: ${parseError}`
          );
        }
      }

      // Handle object responses (common from React Native modules)
      if (response && typeof response === 'object') {
        return response;
      }

      // Handle null/undefined responses
      if (response === null || response === undefined) {
        return response;
      }

      return response;
    } catch (error) {
      throw new Error(
        `Failed to process ${responseType} response: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Validate request parameters to ensure required fields are present
   * @param request Request object to validate
   * @param requiredFields Array of required field names
   */
  static async validateRequest(
    request: any,
    requiredFields: string[]
  ): Promise<void> {
    if (!request || typeof request !== 'object') {
      throw new Error('Request must be a valid object');
    }

    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (
        request[field] === undefined ||
        request[field] === null ||
        request[field] === ''
      ) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }

  /**
   * Format errors consistently across platforms
   * @param error Original error
   * @returns Standardized error format
   */
  static formatError(error: any): SmileIDError {
    if (error && typeof error === 'object' && error.code && error.message) {
      // Already formatted error
      return {
        code: error.code,
        message: error.message,
        details: error.details || null,
      };
    }

    if (error instanceof Error) {
      return {
        code: 'SDK_ERROR',
        message: error.message,
        details: error.stack || null,
      };
    }

    if (typeof error === 'string') {
      return {
        code: 'SDK_ERROR',
        message: error,
        details: null,
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
      details: error,
    };
  }
}
