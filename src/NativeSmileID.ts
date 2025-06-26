import { NativeModules, type TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
const { SmileIDModule } = NativeModules;

interface SmileIDInterface {
  initialize(config: any): Promise<void>;
  getVersion(): Promise<string>;
}

export const SmileID = SmileIDModule as SmileIDInterface;

// noinspection JSUnusedGlobalSymbols
export enum JobType {
  BiometricKyc = 1,
  SmartSelfieAuthentication = 2,
  SmartSelfieEnrollment = 4,
  EnhancedKyc = 5,
  DocumentVerification = 6,
  BVN = 7,
  EnhancedDocumentVerification = 11,
}
/**
 * Config class used to pass the smile config to initialize method
 */
export interface Config {
  partnerId: string;
  authToken: string;
  prodLambdaUrl: string;
  testLambdaUrl: string;
}
/**
 * Custom values specific to partners can be placed in [extras]
 */
export interface PartnerParams {
  jobType?: JobType;
  jobId: string;
  userId: string;
  extras?: string[];
}

/**
 * The Auth Smile request. Auth Smile serves multiple purposes:
 *
 * - It is used to fetch the signature needed for subsequent API requests.
 * - It indicates the type of job that will be performed.
 * - It is used to fetch consent information for the partner.
 *
 * @param jobType The type of job that will be performed.
 * @param country The country code of the country where the job is being performed. This value is
 *                required in order to get back consent information for the partner.
 * @param idType The type of ID that will be used for the job. This value is required in order to
 *               get back consent information for the partner.
 * @param updateEnrolledImage Whether or not the enrolled image should be updated with the image
 *                            submitted for this job.
 * @param jobId The job ID to associate with the job. Most often, this will correspond to a unique
 *              Job ID within your own system. If not provided, a random job ID will be generated.
 * @param userId The user ID to associate with the job. Most often, this will correspond to a unique
 *               User ID within your own system. If not provided, a random user ID will be generated.
 */
export interface AuthenticationRequest {
  jobType: JobType;
  country?: string;
  idType?: string;
  updateEnrolledImage?: boolean;
  jobId?: string;
  userId?: string;
}

/**
 * [canAccess] Whether the ID type is enabled for the partner
 * [consentRequired] Whether consent is required for the ID type
 */
export interface ConsentInfo {
  canAccess: boolean;
  consentRequired: boolean;
}

export interface AuthenticationResponse {
  success: boolean;
  signature: string;
  timestamp: string;
  partnerParams: PartnerParams;
  callbackUrl?: string;
  consentInfo?: ConsentInfo;
}

export interface PrepUploadRequest {
  partnerParams: PartnerParams;
  callbackUrl?: string;
  partnerId: string;
  timestamp: string;
  signature: string;
  allowNewEnroll?: boolean;
}

export interface PrepUploadResponse {
  code: string;
  refId: string;
  uploadUrl: string;
  smileJobId: string;
}

/*
 * The consent information for the user
 * required for Biometric KYC and Enhanced Document Verification
 */
export interface ConsentInformation {
  /**
   * The date the user granted consent
   */
  consentGrantedDate: string;

  /**
   * Whether the user has granted consent for personal details
   */
  personalDetails: boolean;

  /**
   * Whether the user has granted consent for contact information
   */
  contactInformation: boolean;

  /**
   * Whether the user has granted consent for document information
   */
  documentInformation: boolean;
}

export interface IdInfo {
  country: string;
  idType?: string;
  idNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  bankCode?: string;
  entered?: boolean;
}

// noinspection JSUnusedGlobalSymbols
export enum ImageType {
  SelfieJpgFile,
  IdCardJpgFile,
  SelfieJpgBase64,
  IdCardJpgBase64,
  LivenessJpgFile,
  IdCardRearJpgFile,
  LivenessJpgBase64,
  IdCardRearJpgBase64,
}

export interface UploadImageInfo {
  imageTypeId: ImageType;
  imageName: string;
}

export interface UploadRequest {
  images: UploadImageInfo[];
  idInfo?: IdInfo;
}

// noinspection JSUnusedGlobalSymbols
export enum ActionResult {
  Passed,
  Completed,
  Approved,
  Verified,
  ProvisionallyApproved,
  Returned,
  NotReturned,
  Failed,
  Rejected,
  UnderReview,
  UnableToDetermine,
  NotApplicable,
  NotVerified,
  NotDone,
  IssuerUnavailable,
  Unknown, // Placeholder for unsupported values
}

export interface Actions {
  documentCheck: ActionResult;
  humanReviewCompare: ActionResult;
  humanReviewDocumentCheck: ActionResult;
  humanReviewLivenessCheck: ActionResult;
  humanReviewSelfieCheck: ActionResult;
  humanReviewUpdateSelfie: ActionResult;
  livenessCheck: ActionResult;
  registerSelfie: ActionResult;
  returnPersonalInfo: ActionResult;
  selfieCheck: ActionResult;
  selfieProvided: ActionResult;
  selfieToIdAuthorityCompare: ActionResult;
  selfieToIdCardCompare: ActionResult;
  selfieToRegisteredSelfieCompare: ActionResult;
  updateRegisteredSelfieOnFile: ActionResult;
  verifyDocument: ActionResult;
  verifyIdNumber: ActionResult;
}

export interface EnhancedKycResponse {
  smileJobId: string;
  partnerParams: PartnerParams;
  resultText: string;
  resultCode: string;
  actions: Actions;
  country: string;
  idType: string;
  idNumber: string;
  fullName?: string;
  expirationDate?: string;
  dob?: string;
  base64Photo?: string;

}

export interface EnhancedKycRequest {
  country: string;
  idType: string;
  idNumber: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  phoneNumber?: string;
  bankCode?: string;
  callbackUrl?: string;
  partnerParams: PartnerParams;
  timestamp: string;
  signature: string;
  consentInformation?: ConsentInformation;
}

export interface EnhancedKycAsyncResponse {
  success: boolean;
}

export interface ImageLinks {
  selfieImageUrl?: string;
  error?: string;
}

export interface SuspectUser {
  reason: string;
  userId: string;
}

export interface Antifraud {
  suspectUsers: SuspectUser[];
}

export interface JobStatusRequest {
  userId: string;
  jobId: string;
  includeImageLinks: boolean;
  includeHistory: boolean;
  partnerId: string;
  timestamp: string;
  signature: string;
  interval?: number;
  numAttempts?: number;
}

export interface SmartSelfieJobResult {
  actions: Actions;
  resultCode: string;
  resultText: string;
  smileJobId: string;
  partnerParams: PartnerParams;
  confidence?: number;
}

export interface SmartSelfieJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: SmartSelfieJobResult;
  resultString?: string;
  history?: SmartSelfieJobResult[];
  imageLinks?: ImageLinks;
}

export interface DocumentVerificationJobResult {
  actions: Actions;
  resultCode: string;
  resultText: string;
  smileJobId: string;
  partnerParams: PartnerParams;
  country?: string;
  idType?: string;
  idNumber?: string;
  fullName?: string;
  dob?: string;
  gender?: string;
  expirationDate?: string;
  documentImageBase64?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  address?: string;

}

export interface DocumentVerificationJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: DocumentVerificationJobResult;
  resultString?: string;
  history?: DocumentVerificationJobResult[];
  imageLinks?: ImageLinks;
}

export interface BiometricKycJobResult {
  actions: Actions;
  resultCode: string;
  resultText: string;
  resultType: string;
  smileJobId: string;
  partnerParams: PartnerParams;
  antifraud?: Antifraud;
  dob?: string;
  photoBase64?: string;
  gender?: string;
  idType?: string;
  address?: string;
  country?: string;
  documentImageBase64?: string;
  fullData?: { [key: string]: string };
  fullName?: string;
  idNumber?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  expirationDate?: string;
  secondaryIdNumber?: string;
  idNumberPreviouslyRegistered?: boolean;
  previousRegistrantsUserIds?: string[];
}

export interface BiometricKycJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: BiometricKycJobResult;
  resultString?: string;
  history?: BiometricKycJobResult[];
  imageLinks?: ImageLinks;
}

export interface EnhancedDocumentVerificationJobResult {
  actions: Actions;
  resultCode: string;
  resultText: string;
  resultType: string;
  smileJobId: string;
  partnerParams: PartnerParams;
  antifraud?: Antifraud;
  dob?: string;
  photoBase64?: string;
  gender?: string;
  idType?: string;
  address?: string;
  country?: string;
  documentImageBase64?: string;
  fullData?: { [key: string]: string };
  fullName?: string;
  idNumber?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  expirationDate?: string;
  secondaryIdNumber?: string;
  idNumberPreviouslyRegistered?: boolean;
  previousRegistrantsUserIds?: string[];
}

export interface EnhancedDocumentVerificationJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: EnhancedDocumentVerificationJobResult;
  resultString?: string;
  history?: EnhancedDocumentVerificationJobResult[];
  imageLinks?: ImageLinks;
}

export interface ProductsConfigRequest {
  partnerId: string;
  timestamp: string;
  signature: string;
}

export interface IdSelection {
  basicKyc: { [key: string]: string[]};
  biometricKyc: { [key: string]: string[]};
  enhancedKyc: { [key: string]: string[]};
  documentVerification: { [key: string]: string[]};
}


export interface ProductsConfigResponse {
  consentRequired: { [key: string]: string[]};
  idSelection: IdSelection;
}

export interface Country {
  code: string;
  continent: string;
  name: string;
}

export interface IdType {
  code: string;
  example: string[];
  hasBack: boolean;
  name: string;
}

export interface ValidDocument {
  country: Country;
  idTypes: IdType[];
}

export interface ValidDocumentsResponse {
  validDocuments: ValidDocument[];
}

export interface BankCode {
  name: string;
  code: string;
}

export interface AvailableIdType {
  idTypeKey: string;
  label: string;
  requiredFields: string[];
  testData?: string;
  idNumberRegex?: string;
}

export interface CountryInfo {
  countryCode: string;
  name: string;
  availableIdTypes: AvailableIdType[];
}


export interface HostedWeb {
  basicKyc: { [key: string]: CountryInfo};
  biometricKyc: { [key: string]: CountryInfo};
  enhancedKyc:{ [key: string]: CountryInfo};
  documentVerification: { [key: string]: CountryInfo};
  enhancedKycSmartSelfie: { [key: string]: CountryInfo};
  enhancedDocumentVerification:{ [key: string]: CountryInfo};
}

export interface ServicesResponse {
  bankCodes: BankCode[];
  hostedWeb: HostedWeb;
}



export interface Spec extends TurboModule {
  /**
   * Initialize SmileID SDK with configuration
   * @param useSandBox - Configuration object for the SDK
   * @param apiKey - api key specific to the partner and also environment
   * @param config - Configuration object for the SDK
   * @param enableCrashReporting - Whether to enable crash reporting
   */
  initialize(
    useSandBox: boolean,
    enableCrashReporting: boolean,
    config?: Config,
    apiKey?: string
  ): Promise<void>;

  /**
   * The callback mechanism allows for asynchronous job requests and responses.
   * While the job_status API can be polled to get a result, a better method is to set up a
   * callback url and let the system POST a JSON response.
   */
  setCallbackUrl: (callbackUrl: string) => Promise<void>;

  /**
   * Sets allow offline mode which enables
   * the ability to capture jobs offline and submit later
   */
  setAllowOfflineMode: (allowOfflineMode: boolean) => Promise<void>;

  /**
   * Submits an already captured job id
   */
  submitJob: (jobId: string) => Promise<void>;

  /**
   * Returns all job ids from the submitted directory
   */
  getSubmittedJobs: () => Promise<string[]>;

  /**
   * Returns all job ids from the unsubmitted directory
   */
  getUnsubmittedJobs: () => Promise<string[]>;

  /**
   * Cleans up a job id from the submitted or unsubmitted
   * directory
   */
  cleanup: (jobId: string) => Promise<void>;
  /**
   * NB: Only available on Android
   * Disable crash reporting
   */
  disableCrashReporting: () => Promise<void>;

  authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse>;

  prepUpload(request: PrepUploadRequest): Promise<PrepUploadResponse>;

  upload(url: string, request: UploadRequest): Promise<void>;

  doEnhancedKyc(request: EnhancedKycRequest): Promise<EnhancedKycResponse>;

  doEnhancedKycAsync(
    request: EnhancedKycRequest
  ): Promise<EnhancedKycAsyncResponse>;

  getSmartSelfieJobStatus(
    request: JobStatusRequest
  ): Promise<SmartSelfieJobStatusResponse>;

  getDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<DocumentVerificationJobStatusResponse>;

  getBiometricKycJobStatus(
    request: JobStatusRequest
  ): Promise<BiometricKycJobStatusResponse>;

  getEnhancedDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<EnhancedDocumentVerificationJobStatusResponse>;

  getProductsConfig(
    request: ProductsConfigRequest
  ): Promise<ProductsConfigResponse>;

  getValidDocuments(
    request: ProductsConfigRequest
  ): Promise<ValidDocumentsResponse>;

  getServices(): Promise<ServicesResponse>;

  pollSmartSelfieJobStatus(
    request: JobStatusRequest
  ): Promise<SmartSelfieJobStatusResponse>;

  pollDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<DocumentVerificationJobStatusResponse>;

  pollBiometricKycJobStatus(
    request: JobStatusRequest
  ): Promise<BiometricKycJobStatusResponse>;

  pollEnhancedDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<EnhancedDocumentVerificationJobStatusResponse>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNSmileID');
