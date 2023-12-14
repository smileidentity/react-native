import { ViewProps } from 'react-native';

export type SmileIDViewProps = ViewProps & {
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
   */
  extraPartnerParams?: Record<string, any>;
  /**
   * The delegate object that receives the result of the native events
   */
  onResult?: (event: any) => void;
};

export type IdInfo = {
  /**
   * The ISO 3166-1 alpha-3 country code of the document.
   */
  country: string;
  /**
   * Optional The id type of the number.
   */
  idType?: string;
  /**
   * Optional The id number
   */
  idNumber?: string;
  /**
   * First name of the user.
   */
  firstName?: string;
  /**
   * Middle name of the user
   */
  middleName?: string;
  /**
   * Last name of the user
   */
  lastName?: string;
  /**
   * Date of birth of the user
   */
  dob?: string;
  /**
   * Bank code
   */
  bankCode?: string;
  /**
   * Set true if the user has entered the id number
   */
  entered?: boolean;
};

type SmartSelfieRequest = SmileIDViewProps & {
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
};

export type SmartSelfieEnrollmentRequest = SmartSelfieRequest;
export type SmartSelfieAuthenticationRequest = SmartSelfieRequest;

export type EnhancedKycRequest = SmileIDViewProps & {
  /**
   * The ISO 3166-1 alpha-3 country code of the document.
   */
  country: string;
  /**
   * A string for the type of document to be captured.
   */
  idType: string;
  /**
   * A string for the id number to be validated
   */
  idNumber: string;
  /**
   * First name of the user.
   */
  firstName?: string;
  /**
   * Middle name of the user
   */
  middleName?: string;
  /**
   * Last name of the user
   */
  lastName?: string;
  /**
   * Date of birth of the user
   */
  dob?: string;
  /**
   * Phone number of the user
   */
  phoneNumber?: string;
  /**
   * Bank code
   */
  bankCode?: string;
  /**
   * Your callback url, results of jobs will be sent to the specified url. You can read more about callback urls here: https://docs.smileidentity.com/#callback-urls
   */
  callbackUrl?: string;
  /**
   * The timestamp used to calculate the signature in ISO date/time format
   */
  timestamp: string;
  /**
   * The outgoing signature, you can use this to verify that the response is from Smile ID
   */
  signature: string;
};

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

export type BiometricKYCRequest = ConsentRequest & {
  idInfo: IdInfo;
  productName: string;
};
