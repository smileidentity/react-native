/**
 * Shared constants for SmileID SDK
 * This module contains all constants used across Expo and React Native platforms
 */
/**
 * SDK Configuration Constants
 */
export declare const SDK_CONFIG: {
    /** Default polling interval in milliseconds */
    readonly DEFAULT_POLLING_INTERVAL: 5000;
    /** Maximum polling attempts */
    readonly MAX_POLLING_ATTEMPTS: 100;
    /** Minimum polling interval in milliseconds */
    readonly MIN_POLLING_INTERVAL: 1000;
    /** SDK version for headers and identification */
    readonly VERSION: "10.3.3";
    /** User agent string for API requests */
    readonly USER_AGENT: "SmileID React Native SDK";
};
/**
 * Error codes used throughout the SDK
 */
export declare const ERROR_CODES: {
    /** General SDK error */
    readonly SDK_ERROR: "SDK_ERROR";
    /** Unknown error occurred */
    readonly UNKNOWN_ERROR: "UNKNOWN_ERROR";
    /** Network related error */
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    /** Validation error */
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    /** Authentication error */
    readonly AUTH_ERROR: "AUTH_ERROR";
    /** Configuration error */
    readonly CONFIG_ERROR: "CONFIG_ERROR";
    /** Platform not supported error */
    readonly PLATFORM_NOT_SUPPORTED: "PLATFORM_NOT_SUPPORTED";
    /** Module not linked error */
    readonly MODULE_NOT_LINKED: "MODULE_NOT_LINKED";
};
/**
 * API endpoints and URL patterns
 */
export declare const API_ENDPOINTS: {
    /** Base URL for sandbox environment */
    readonly SANDBOX_BASE_URL: "https://3eydmgh10d.execute-api.us-west-2.amazonaws.com/test";
    /** Base URL for production environment */
    readonly PRODUCTION_BASE_URL: "https://3eydmgh10d.execute-api.us-west-2.amazonaws.com/prod";
    /** Authentication endpoint */
    readonly AUTH_ENDPOINT: "/v1/auth_smile";
    /** Upload preparation endpoint */
    readonly PREP_UPLOAD_ENDPOINT: "/v1/prep_upload";
    /** Enhanced KYC endpoint */
    readonly ENHANCED_KYC_ENDPOINT: "/v1/async_id_verification";
    /** Job status endpoint pattern */
    readonly JOB_STATUS_ENDPOINT: "/v1/job_status";
    /** Products config endpoint */
    readonly PRODUCTS_CONFIG_ENDPOINT: "/v1/products_config";
    /** Valid documents endpoint */
    readonly VALID_DOCUMENTS_ENDPOINT: "/v1/valid_documents";
    /** Services endpoint */
    readonly SERVICES_ENDPOINT: "/v1/services";
};
/**
 * Default configuration values
 */
export declare const DEFAULTS: {
    /** Default sandbox flag */
    readonly USE_SANDBOX: false;
    /** Default crash reporting flag */
    readonly ENABLE_CRASH_REPORTING: false;
    /** Default offline mode flag */
    readonly ALLOW_OFFLINE_MODE: false;
    /** Default include image links flag */
    readonly INCLUDE_IMAGE_LINKS: false;
    /** Default include history flag */
    readonly INCLUDE_HISTORY: false;
    /** Default agent mode flag */
    readonly ALLOW_AGENT_MODE: false;
    /** Default show instructions flag */
    readonly SHOW_INSTRUCTIONS: true;
    /** Default show attribution flag */
    readonly SHOW_ATTRIBUTION: true;
    /** Default allow new enroll flag */
    readonly ALLOW_NEW_ENROLL: false;
    /** Default show confirmation flag */
    readonly SHOW_CONFIRMATION: true;
    /** Default skip API submission flag */
    readonly SKIP_API_SUBMISSION: false;
    /** Default capture both sides flag */
    readonly CAPTURE_BOTH_SIDES: false;
    /** Default allow gallery upload flag */
    readonly ALLOW_GALLERY_UPLOAD: false;
    /** Default strict mode flag */
    readonly USE_STRICT_MODE: false;
};
/**
 * Platform detection constants
 */
export declare const PLATFORM_DETECTION: {
    /** Expo modules core package name for detection */
    readonly EXPO_MODULES_CORE: "expo-modules-core";
    /** React Native package name */
    readonly REACT_NATIVE: "react-native";
    /** Platform types */
    readonly PLATFORMS: {
        readonly EXPO: "expo";
        readonly REACT_NATIVE: "react-native";
    };
};
/**
 * Job type validation constants
 */
export declare const VALID_JOB_TYPES: readonly [1, 2, 4, 5, 6, 7, 11];
/**
 * Country code validation pattern
 */
export declare const COUNTRY_CODE_PATTERN: RegExp;
/**
 * Required fields for different request types
 */
export declare const REQUIRED_FIELDS: {
    /** Required fields for authentication requests */
    readonly AUTHENTICATION: readonly ["jobType"];
    /** Required fields for job status requests */
    readonly JOB_STATUS: readonly ["userId", "jobId", "partnerId", "timestamp", "signature"];
    /** Required fields for enhanced KYC requests */
    readonly ENHANCED_KYC: readonly ["country", "idType", "idNumber", "partnerParams", "timestamp", "signature"];
    /** Required fields for config objects */
    readonly CONFIG: readonly ["partnerId"];
    /** Required fields for partner params */
    readonly PARTNER_PARAMS: readonly ["jobId", "userId"];
    /** Required fields for upload requests */
    readonly UPLOAD: readonly ["images"];
    /** Required fields for prep upload requests */
    readonly PREP_UPLOAD: readonly ["partnerParams", "partnerId", "timestamp", "signature"];
};
/**
 * View component constants
 */
export declare const VIEW_CONSTANTS: {
    /** Default view props */
    readonly DEFAULT_VIEW_PROPS: {
        readonly showInstructions: true;
        readonly showAttribution: true;
        readonly allowNewEnroll: false;
        readonly showConfirmation: true;
        readonly skipApiSubmission: false;
        readonly allowAgentMode: false;
    };
    /** Document verification specific defaults */
    readonly DOCUMENT_VERIFICATION: {
        readonly captureBothSides: false;
        readonly allowGalleryUpload: false;
        readonly useStrictMode: false;
    };
};
/**
 * File and media constants
 */
export declare const MEDIA_CONSTANTS: {
    /** Supported image formats */
    readonly SUPPORTED_IMAGE_FORMATS: readonly ["jpg", "jpeg", "png"];
    /** Maximum image file size in bytes (10MB) */
    readonly MAX_IMAGE_SIZE: number;
    /** Image quality settings */
    readonly IMAGE_QUALITY: {
        readonly HIGH: 0.9;
        readonly MEDIUM: 0.7;
        readonly LOW: 0.5;
    };
};
/**
 * Validation constants
 */
export declare const VALIDATION: {
    /** Minimum ID number length */
    readonly MIN_ID_LENGTH: 1;
    /** Maximum ID number length */
    readonly MAX_ID_LENGTH: 50;
    /** Minimum name length */
    readonly MIN_NAME_LENGTH: 1;
    /** Maximum name length */
    readonly MAX_NAME_LENGTH: 100;
    /** Phone number pattern */
    readonly PHONE_PATTERN: RegExp;
    /** Email pattern */
    readonly EMAIL_PATTERN: RegExp;
};
/**
 * Timeout constants in milliseconds
 */
export declare const TIMEOUTS: {
    /** Default network request timeout */
    readonly NETWORK_REQUEST: 30000;
    /** File upload timeout */
    readonly FILE_UPLOAD: 60000;
    /** Authentication timeout */
    readonly AUTHENTICATION: 20000;
    /** Job status polling timeout */
    readonly JOB_STATUS_POLLING: 10000;
};
/**
 * Cache constants
 */
export declare const CACHE: {
    /** Default cache expiry time in milliseconds (5 minutes) */
    readonly DEFAULT_EXPIRY: number;
    /** Services cache expiry time in milliseconds (1 hour) */
    readonly SERVICES_EXPIRY: number;
    /** Config cache expiry time in milliseconds (30 minutes) */
    readonly CONFIG_EXPIRY: number;
};
/**
 * Logging constants
 */
export declare const LOGGING: {
    /** Log levels */
    readonly LEVELS: {
        readonly ERROR: "error";
        readonly WARN: "warn";
        readonly INFO: "info";
        readonly DEBUG: "debug";
    };
    /** Default log level */
    readonly DEFAULT_LEVEL: "info";
    /** Maximum log entry length */
    readonly MAX_LOG_LENGTH: 1000;
};
/**
 * Feature flags and environment constants
 */
export declare const FEATURES: {
    /** Feature flag for enhanced logging */
    readonly ENHANCED_LOGGING: false;
    /** Feature flag for offline mode */
    readonly OFFLINE_MODE: false;
    /** Feature flag for experimental features */
    readonly EXPERIMENTAL: false;
    /** Feature flag for metrics collection */
    readonly METRICS_COLLECTION: false;
};
/**
 * Type guards for constants
 */
export declare const isValidJobType: (jobType: number) => jobType is (typeof VALID_JOB_TYPES)[number];
export declare const isValidCountryCode: (countryCode: string) => boolean;
export declare const isValidPlatform: (platform: string) => platform is keyof typeof PLATFORM_DETECTION.PLATFORMS;
//# sourceMappingURL=constants.d.ts.map