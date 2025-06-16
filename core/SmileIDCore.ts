/**
 * Core business logic for SmileID React Native SDK
 * This module contains shared functionality between Expo and React Native platforms
 */

export interface SmileIDError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
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

  /**
   * Validate configuration object
   * @param config Configuration to validate
   * @returns Validated configuration
   */
  static async validateConfig(config: any): Promise<any> {
    if (!config) {
      return null;
    }

    if (typeof config !== 'object') {
      throw new Error('Config must be an object');
    }

    // Basic config validation - ensure required fields if config is provided
    const requiredConfigFields = ['partnerId'];
    const missingFields = requiredConfigFields.filter(
      (field) =>
        config[field] === undefined ||
        config[field] === null ||
        config[field] === ''
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Config missing required fields: ${missingFields.join(', ')}`
      );
    }

    return config;
  }

  /**
   * Validate job status request parameters
   * @param request Job status request
   */
  static async validateJobStatusRequest(request: any): Promise<void> {
    await this.validateRequest(request, [
      'userId',
      'jobId',
      'partnerId',
      'timestamp',
      'signature',
    ]);

    // Additional validation for boolean fields
    if (
      request.includeImageLinks !== undefined &&
      typeof request.includeImageLinks !== 'boolean'
    ) {
      throw new Error('includeImageLinks must be a boolean');
    }

    if (
      request.includeHistory !== undefined &&
      typeof request.includeHistory !== 'boolean'
    ) {
      throw new Error('includeHistory must be a boolean');
    }
  }

  /**
   * Validate polling parameters
   * @param interval Polling interval in milliseconds
   * @param numAttempts Number of polling attempts
   */
  static validatePollingParams(interval: number, numAttempts: number): void {
    if (!Number.isInteger(interval) || interval <= 0) {
      throw new Error('interval must be a positive integer');
    }

    if (!Number.isInteger(numAttempts) || numAttempts <= 0) {
      throw new Error('numAttempts must be a positive integer');
    }

    if (interval < 1000) {
      throw new Error('interval must be at least 1000ms (1 second)');
    }

    if (numAttempts > 100) {
      throw new Error('numAttempts must not exceed 100');
    }
  }

  /**
   * Create a standardized timestamp
   * @returns ISO timestamp string
   */
  static createTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Validate authentication request
   * @param request Authentication request to validate
   */
  static async validateAuthenticationRequest(request: any): Promise<void> {
    await this.validateRequest(request, ['jobType']);

    // Validate jobType is a valid enum value
    const validJobTypes = [1, 2, 4, 5, 6, 7, 11]; // JobType enum values
    if (!validJobTypes.includes(request.jobType)) {
      throw new Error(
        `Invalid jobType: ${request.jobType}. Must be one of: ${validJobTypes.join(', ')}`
      );
    }
  }

  /**
   * Validate Enhanced KYC request
   * @param request Enhanced KYC request to validate
   */
  static async validateEnhancedKycRequest(request: any): Promise<void> {
    await this.validateRequest(request, [
      'country',
      'idType',
      'idNumber',
      'partnerParams',
      'timestamp',
      'signature',
    ]);

    // Validate country code format (2-letter ISO)
    if (!/^[A-Z]{2}$/i.test(request.country)) {
      throw new Error('country must be a 2-letter ISO country code');
    }
  }

  /**
   * Sanitize user input to prevent injection attacks
   * @param input User input to sanitize
   * @returns Sanitized input
   */
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return String(input);
    }

    // Basic sanitization - remove potentially dangerous characters
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .trim();
  }

  /**
   * Generate a random job ID
   * @returns Random job ID string
   */
  static generateJobId(): string {
    return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate a random user ID
   * @returns Random user ID string
   */
  static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
