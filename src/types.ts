import type { ConsentInformation, IdInfo } from './NativeSmileID';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

//todo add types for the native events
export type ResultEvent = {
  error: string | null;
  result: string//find ways to create types for the result like Array<{string, string}>
}

export type SmileIDViewProps = {
  /**
   * The user ID to associate with the Document Verification. Most often, this will
   * correspond to a unique User ID within your system. If not provided, a random user ID will
   * be generated.
   */
  userId?: string;
  /**
   * The job ID to associate with the Document Verification. Most often, this will
   * correspond to a unique Job ID within your system. If not provided, a random job ID will
   * be generated.
   */
  jobId?: string;
  /**
   * Custom values specific to partners.
   * todo values must result to explicit types
   * codegen wont work with Record<string,any>
   */
  extraPartnerParams?:  Array<{
    key: string;
    value: string
  }>
  /**
   * The delegate object that receives the result of the native events
   */
  onResult?: DirectEventHandler<{
    error: string | null;
    result: string
  }>;
};

export type SmartSelfieRequest = SmileIDViewProps & {

  /**
   * Whether to allow Agent Mode or not. If allowed, a switch will be
   * displayed allowing toggling between the back camera and front camera. If not allowed, only
   * the front camera will be used.
   */
  allowAgentMode: boolean;
  /**
   * Whether to deactivate capture screen's instructions before selfie of document capture
   */
  showInstructions?: boolean;
  /**
   * Whether to show the Smile ID attribution on the Instructions screen.
   */
  showAttribution?: boolean;
  /**
   * Whether to allow the user to reentoll
   */
  allowNewEnroll?: boolean;

  /**
   * Used for selfie capture screens to show the confirmation dialog
   */
  showConfirmation?: boolean;

  /**
   * Used to capture selfie and or documents and will not submit to SmileID
   * but return the file paths to the captured jobs
   */
  skipApiSubmission?: boolean;
};

export type SmartSelfieEnrollmentRequest = Omit<SmartSelfieRequest, 'jobId'>;
export type SmartSelfieEnrollmentEnhancedRequest = Omit<
  SmartSelfieRequest,
  'jobId'
>;
export type SmartSelfieAuthenticationEnhancedRequest = Omit<
  SmartSelfieRequest,
  'jobId'
>;
export type SmartSelfieAuthenticationRequest = Omit<
  SmartSelfieRequest,
  'jobId'
>;

export type DocumentVerificationRequest = SmartSelfieRequest & {
  /**
   * The country of issuance of the ID type to be captured.
   */
  countryCode: string;
  /**
   * The ID type of the document ID to be captured.
   */
  documentType: string;
  /**
   * An optional value for the aspect ratio of the document. If no value is
   * supplied, image analysis is done to calculate the document's aspect ratio.
   */
  idAspectRatio?: number;
  /**
   * Whether to capture both sides of the ID or not. Otherwise, only the
   * front side will be captured. If this is true, an option to skip back side will still be
   * shown.
   */
  captureBothSides?: boolean;
  /**
   * Whether to allow the user to upload images from their gallery or not.
   */
  allowGalleryUpload?: boolean;
  /**
   * If provided, selfie capture will be bypassed using this image.
   */
  bypassSelfieCaptureWithFile?: string;

  /**
   * If true, document capture instruction and prompts
   * will be for front side of the document
   */
  isDocumentFrontSide?: boolean;

  /*jobId The job ID to associate with the job. Most often, this will correspond to a unique
  Job ID within your own system. If not provided, a random job ID will be generated.*/
  jobId?: string;

  /*
   * Will use Enhanced SmartSelfie™ capture for the selfie capture
   * if set to true, if false will use the default SmartSelfie™ capture
   */
  useStrictMode?: boolean;
};

export type EnhancedDocumentVerificationRequest =
  DocumentVerificationRequest & {
  /**
   * The consentInformation for the request
   */
  consentInformation?: ConsentInformation;
};

export type ConsentRequest = Omit<SmartSelfieRequest, 'allowAgentMode'> & {
  /**
   * String value of the resource in the app's drawable folder to use as the partner icon.
   */
  partnerIcon: string;
  /**
   * The name of the partner to display on the consent screen.
   */
  partnerName: string;

  /**
   * The privacy policy URL of the partner to display on the consent screen.
   */
  partnerPrivacyPolicy: string;
  /**
   * The product being requested consent for
   */
  productName: string;
};

export type BiometricKYCRequest = SmartSelfieRequest & {
  /*
   * The user id information for KYC
   */
  idInfo: IdInfo;
  /*
   * The consent information for the partner
   */
  consentInformation?: ConsentInformation;
  /*
   * Will use Enhanced SmartSelfie™ capture for the selfie capture
   * if set to true, if false will use the default SmartSelfie™ capture
   */
  useStrictMode?: boolean;
};
