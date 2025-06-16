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
export declare class SmileIDCore {
    /**
     * Process and standardize responses from native modules
     * @param response Raw response from native module
     * @param responseType Type of response for error context
     * @returns Processed response
     */
    static processResponse<T>(response: any, responseType: string): Promise<T>;
    /**
     * Validate request parameters to ensure required fields are present
     * @param request Request object to validate
     * @param requiredFields Array of required field names
     */
    static validateRequest(request: any, requiredFields: string[]): Promise<void>;
    /**
     * Format errors consistently across platforms
     * @param error Original error
     * @returns Standardized error format
     */
    static formatError(error: any): SmileIDError;
    /**
     * Validate configuration object
     * @param config Configuration to validate
     * @returns Validated configuration
     */
    static validateConfig(config: any): Promise<any>;
    /**
     * Validate job status request parameters
     * @param request Job status request
     */
    static validateJobStatusRequest(request: any): Promise<void>;
    /**
     * Validate polling parameters
     * @param interval Polling interval in milliseconds
     * @param numAttempts Number of polling attempts
     */
    static validatePollingParams(interval: number, numAttempts: number): void;
    /**
     * Create a standardized timestamp
     * @returns ISO timestamp string
     */
    static createTimestamp(): string;
    /**
     * Validate authentication request
     * @param request Authentication request to validate
     */
    static validateAuthenticationRequest(request: any): Promise<void>;
    /**
     * Validate Enhanced KYC request
     * @param request Enhanced KYC request to validate
     */
    static validateEnhancedKycRequest(request: any): Promise<void>;
    /**
     * Sanitize user input to prevent injection attacks
     * @param input User input to sanitize
     * @returns Sanitized input
     */
    static sanitizeInput(input: string): string;
    /**
     * Generate a random job ID
     * @returns Random job ID string
     */
    static generateJobId(): string;
    /**
     * Generate a random user ID
     * @returns Random user ID string
     */
    static generateUserId(): string;
}
//# sourceMappingURL=SmileIDCore.d.ts.map