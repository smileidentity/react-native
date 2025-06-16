/**
 * Shared constants for SmileID SDK
 * This module contains all constants used across Expo and React Native platforms
 */

/**
 * SDK Configuration Constants
 */
export const SDK_CONFIG = {
  /** Default polling interval in milliseconds */
  DEFAULT_POLLING_INTERVAL: 5000,

  /** Maximum polling attempts */
  MAX_POLLING_ATTEMPTS: 100,

  /** Minimum polling interval in milliseconds */
  MIN_POLLING_INTERVAL: 1000,

  /** SDK version for headers and identification */
  VERSION: '10.3.3',

  /** User agent string for API requests */
  USER_AGENT: 'SmileID React Native SDK',
} as const;

/**
 * Error codes used throughout the SDK
 */
export const ERROR_CODES = {
  /** General SDK error */
  SDK_ERROR: 'SDK_ERROR',

  /** Unknown error occurred */
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',

  /** Network related error */
  NETWORK_ERROR: 'NETWORK_ERROR',

  /** Validation error */
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  /** Authentication error */
  AUTH_ERROR: 'AUTH_ERROR',

  /** Configuration error */
  CONFIG_ERROR: 'CONFIG_ERROR',

  /** Platform not supported error */
  PLATFORM_NOT_SUPPORTED: 'PLATFORM_NOT_SUPPORTED',

  /** Module not linked error */
  MODULE_NOT_LINKED: 'MODULE_NOT_LINKED',
} as const;

/**
 * API endpoints and URL patterns
 */
export const API_ENDPOINTS = {
  /** Base URL for sandbox environment */
  SANDBOX_BASE_URL:
    'https://3eydmgh10d.execute-api.us-west-2.amazonaws.com/test',

  /** Base URL for production environment */
  PRODUCTION_BASE_URL:
    'https://3eydmgh10d.execute-api.us-west-2.amazonaws.com/prod',

  /** Authentication endpoint */
  AUTH_ENDPOINT: '/v1/auth_smile',

  /** Upload preparation endpoint */
  PREP_UPLOAD_ENDPOINT: '/v1/prep_upload',

  /** Enhanced KYC endpoint */
  ENHANCED_KYC_ENDPOINT: '/v1/async_id_verification',

  /** Job status endpoint pattern */
  JOB_STATUS_ENDPOINT: '/v1/job_status',

  /** Products config endpoint */
  PRODUCTS_CONFIG_ENDPOINT: '/v1/products_config',

  /** Valid documents endpoint */
  VALID_DOCUMENTS_ENDPOINT: '/v1/valid_documents',

  /** Services endpoint */
  SERVICES_ENDPOINT: '/v1/services',
} as const;

/**
 * Default configuration values
 */
export const DEFAULTS = {
  /** Default sandbox flag */
  USE_SANDBOX: false,

  /** Default crash reporting flag */
  ENABLE_CRASH_REPORTING: false,

  /** Default offline mode flag */
  ALLOW_OFFLINE_MODE: false,

  /** Default include image links flag */
  INCLUDE_IMAGE_LINKS: false,

  /** Default include history flag */
  INCLUDE_HISTORY: false,

  /** Default agent mode flag */
  ALLOW_AGENT_MODE: false,

  /** Default show instructions flag */
  SHOW_INSTRUCTIONS: true,

  /** Default show attribution flag */
  SHOW_ATTRIBUTION: true,

  /** Default allow new enroll flag */
  ALLOW_NEW_ENROLL: false,

  /** Default show confirmation flag */
  SHOW_CONFIRMATION: true,

  /** Default skip API submission flag */
  SKIP_API_SUBMISSION: false,

  /** Default capture both sides flag */
  CAPTURE_BOTH_SIDES: false,

  /** Default allow gallery upload flag */
  ALLOW_GALLERY_UPLOAD: false,

  /** Default strict mode flag */
  USE_STRICT_MODE: false,
} as const;

/**
 * Platform detection constants
 */
export const PLATFORM_DETECTION = {
  /** Expo modules core package name for detection */
  EXPO_MODULES_CORE: 'expo-modules-core',

  /** React Native package name */
  REACT_NATIVE: 'react-native',

  /** Platform types */
  PLATFORMS: {
    EXPO: 'expo',
    REACT_NATIVE: 'react-native',
  },
} as const;

/**
 * Job type validation constants
 */
export const VALID_JOB_TYPES = [1, 2, 4, 5, 6, 7, 11] as const;

/**
 * Country code validation pattern
 */
export const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/i;

/**
 * Required fields for different request types
 */
export const REQUIRED_FIELDS = {
  /** Required fields for authentication requests */
  AUTHENTICATION: ['jobType'],

  /** Required fields for job status requests */
  JOB_STATUS: ['userId', 'jobId', 'partnerId', 'timestamp', 'signature'],

  /** Required fields for enhanced KYC requests */
  ENHANCED_KYC: [
    'country',
    'idType',
    'idNumber',
    'partnerParams',
    'timestamp',
    'signature',
  ],

  /** Required fields for config objects */
  CONFIG: ['partnerId'],

  /** Required fields for partner params */
  PARTNER_PARAMS: ['jobId', 'userId'],

  /** Required fields for upload requests */
  UPLOAD: ['images'],

  /** Required fields for prep upload requests */
  PREP_UPLOAD: ['partnerParams', 'partnerId', 'timestamp', 'signature'],
} as const;

/**
 * View component constants
 */
export const VIEW_CONSTANTS = {
  /** Default view props */
  DEFAULT_VIEW_PROPS: {
    showInstructions: DEFAULTS.SHOW_INSTRUCTIONS,
    showAttribution: DEFAULTS.SHOW_ATTRIBUTION,
    allowNewEnroll: DEFAULTS.ALLOW_NEW_ENROLL,
    showConfirmation: DEFAULTS.SHOW_CONFIRMATION,
    skipApiSubmission: DEFAULTS.SKIP_API_SUBMISSION,
    allowAgentMode: DEFAULTS.ALLOW_AGENT_MODE,
  },

  /** Document verification specific defaults */
  DOCUMENT_VERIFICATION: {
    captureBothSides: DEFAULTS.CAPTURE_BOTH_SIDES,
    allowGalleryUpload: DEFAULTS.ALLOW_GALLERY_UPLOAD,
    useStrictMode: DEFAULTS.USE_STRICT_MODE,
  },
} as const;

/**
 * File and media constants
 */
export const MEDIA_CONSTANTS = {
  /** Supported image formats */
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png'],

  /** Maximum image file size in bytes (10MB) */
  MAX_IMAGE_SIZE: 10 * 1024 * 1024,

  /** Image quality settings */
  IMAGE_QUALITY: {
    HIGH: 0.9,
    MEDIUM: 0.7,
    LOW: 0.5,
  },
} as const;

/**
 * Validation constants
 */
export const VALIDATION = {
  /** Minimum ID number length */
  MIN_ID_LENGTH: 1,

  /** Maximum ID number length */
  MAX_ID_LENGTH: 50,

  /** Minimum name length */
  MIN_NAME_LENGTH: 1,

  /** Maximum name length */
  MAX_NAME_LENGTH: 100,

  /** Phone number pattern */
  PHONE_PATTERN: /^\+?[\d\s\-()]+$/,

  /** Email pattern */
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/**
 * Timeout constants in milliseconds
 */
export const TIMEOUTS = {
  /** Default network request timeout */
  NETWORK_REQUEST: 30000,

  /** File upload timeout */
  FILE_UPLOAD: 60000,

  /** Authentication timeout */
  AUTHENTICATION: 20000,

  /** Job status polling timeout */
  JOB_STATUS_POLLING: 10000,
} as const;

/**
 * Cache constants
 */
export const CACHE = {
  /** Default cache expiry time in milliseconds (5 minutes) */
  DEFAULT_EXPIRY: 5 * 60 * 1000,

  /** Services cache expiry time in milliseconds (1 hour) */
  SERVICES_EXPIRY: 60 * 60 * 1000,

  /** Config cache expiry time in milliseconds (30 minutes) */
  CONFIG_EXPIRY: 30 * 60 * 1000,
} as const;

/**
 * Logging constants
 */
export const LOGGING = {
  /** Log levels */
  LEVELS: {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
  },

  /** Default log level */
  DEFAULT_LEVEL: 'info',

  /** Maximum log entry length */
  MAX_LOG_LENGTH: 1000,
} as const;

/**
 * Feature flags and environment constants
 */
export const FEATURES = {
  /** Feature flag for enhanced logging */
  ENHANCED_LOGGING: false,

  /** Feature flag for offline mode */
  OFFLINE_MODE: false,

  /** Feature flag for experimental features */
  EXPERIMENTAL: false,

  /** Feature flag for metrics collection */
  METRICS_COLLECTION: false,
} as const;

/**
 * Type guards for constants
 */
export const isValidJobType = (
  jobType: number
): jobType is (typeof VALID_JOB_TYPES)[number] => {
  return VALID_JOB_TYPES.includes(jobType as (typeof VALID_JOB_TYPES)[number]);
};

export const isValidCountryCode = (countryCode: string): boolean => {
  return COUNTRY_CODE_PATTERN.test(countryCode);
};

export const isValidPlatform = (
  platform: string
): platform is keyof typeof PLATFORM_DETECTION.PLATFORMS => {
  return Object.values(PLATFORM_DETECTION.PLATFORMS).includes(platform as any);
};
