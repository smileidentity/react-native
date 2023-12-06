import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface SmileIDService extends TurboModule {
  authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse>;

  prepUpload(request: PrepUploadRequest): Promise<PrepUploadResponse>;

  upload(url: string, request: UploadRequest): Promise<void>;

  doEnhancedKyc(request: EnhancedKycRequest): Promise<EnhancedKycResponse>;

  doEnhancedKycAsync(request: EnhancedKycRequest): Promise<EnhancedKycAsyncResponse>;

  getSmartSelfieJobStatus(request: JobStatusRequest): Promise<SmartSelfieJobStatusResponse>;

  getDocumentVerificationJobStatus(request: JobStatusRequest): Promise<DocumentVerificationJobStatusResponse>;

  getBiometricKycJobStatus(request: JobStatusRequest): Promise<BiometricKycJobStatusResponse>;

  getEnhancedDocumentVerificationJobStatus(request: JobStatusRequest): Promise<EnhancedDocumentVerificationJobStatusResponse>;

  getProductsConfig(request: ProductsConfigRequest): Promise<ProductsConfigResponse>;

  getValidDocuments(request: ProductsConfigRequest): Promise<ValidDocumentsResponse>;

  getServices(): Promise<ServicesResponse>;
}

export default TurboModuleRegistry.getEnforcing<SmileIDService>(
  'SmileIDService'
);

enum JobType {
  BiometricKyc = 1,
  SmartSelfieAuthentication = 2,
  SmartSelfieEnrollment = 4,
  EnhancedKyc = 5,
  DocumentVerification = 6,
  BVN = 7,
  EnhancedDocumentVerification = 11,
}

/**
 * Custom values specific to partners can be placed in [extras]
 */
class PartnerParams {
  jobType?: JobType;
  jobId: string;
  userId: string;
  extras?: [string: string];

  constructor(jobType: JobType, jobId: string, userId: string, extras?: [string: string]) {
    this.jobType = jobType;
    this.jobId = jobId;
    this.userId = userId;
    this.extras = extras;
  }
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
class AuthenticationRequest {
  jobType: JobType;
  country?: string;
  idType?: string;
  updateEnrolledImage?: boolean;
  jobId?: string;
  userId?: string;

  constructor(
    jobType: JobType,
    country?: string,
    idType?: string,
    updateEnrolledImage?: boolean,
    jobId?: string,
    userId?: string
  ) {
    this.jobType = jobType;
    this.country = country;
    this.idType = idType;
    this.updateEnrolledImage = updateEnrolledImage;
    this.jobId = jobId;
    this.userId = userId;
  }
}

/**
 * [canAccess] Whether the ID type is enabled for the partner
 * [consentRequired] Whether consent is required for the ID type
 */
class ConsentInfo {
  canAccess: boolean;
  consentRequired: boolean;

  constructor(canAccess: boolean, consentRequired: boolean) {
    this.canAccess = canAccess;
    this.consentRequired = consentRequired;
  }
}

class AuthenticationResponse {
  success: boolean;
  signature: string;
  timestamp: string;
  partnerParams: PartnerParams;
  callbackUrl?: string;
  consentInfo?: ConsentInfo;

  constructor(
    success: boolean,
    signature: string,
    timestamp: string,
    partnerParams: PartnerParams,
    callbackUrl?: string,
    consentInfo?: ConsentInfo
  ) {
    this.success = success;
    this.signature = signature;
    this.timestamp = timestamp;
    this.partnerParams = partnerParams;
    this.callbackUrl = callbackUrl;
    this.consentInfo = consentInfo;
  }
}

class PrepUploadRequest {
  partnerParams: PartnerParams;
  callbackUrl?: string;
  partnerId: string;
  timestamp: string;
  signature: string;

  constructor(
    partnerParams: PartnerParams,
    partnerId: string,
    timestamp: string,
    signature: string,
    callbackUrl?: string
  ) {
    this.partnerParams = partnerParams;
    this.partnerId = partnerId;
    this.timestamp = timestamp;
    this.signature = signature;
    this.callbackUrl = callbackUrl;
  }
}

class PrepUploadResponse {
  code: string;
  refId: string;
  uploadUrl: string;
  smileJobId: string;

  constructor(code: string, refId: string, uploadUrl: string, smileJobId: string) {
    this.code = code;
    this.refId = refId;
    this.uploadUrl = uploadUrl;
    this.smileJobId = smileJobId;
  }
}

class IdInfo {
  country: string;
  idType?: string;
  idNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  bankCode?: string;
  entered?: boolean;

  constructor(
    country: string,
    idType?: string,
    idNumber?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    dob?: string,
    bankCode?: string,
    entered?: boolean
  ) {
    this.country = country;
    this.idType = idType;
    this.idNumber = idNumber;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.dob = dob;
    this.bankCode = bankCode;
    this.entered = entered;
  }
}

enum ImageType {
  SelfieJpgFile,
  IdCardJpgFile,
  SelfieJpgBase64,
  IdCardJpgBase64,
  LivenessJpgFile,
  IdCardRearJpgFile,
  LivenessJpgBase64,
  IdCardRearJpgBase64,
}

class UploadImageInfo {
  imageTypeId: ImageType;
  imageName: string;

  constructor(imageTypeId: ImageType, imageName: string) {
    this.imageTypeId = imageTypeId;
    this.imageName = imageName;
  }
}

class UploadRequest {
  images: UploadImageInfo[];
  idInfo?: IdInfo;

  constructor(images: UploadImageInfo[], idInfo?: IdInfo) {
    this.images = images;
    this.idInfo = idInfo;
  }
}

enum ActionResult {
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

class Actions {
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

  constructor(
    documentCheck: ActionResult = ActionResult.NotApplicable,
    humanReviewCompare: ActionResult = ActionResult.NotApplicable,
    humanReviewDocumentCheck: ActionResult = ActionResult.NotApplicable,
    humanReviewLivenessCheck: ActionResult = ActionResult.NotApplicable,
    humanReviewSelfieCheck: ActionResult = ActionResult.NotApplicable,
    humanReviewUpdateSelfie: ActionResult = ActionResult.NotApplicable,
    livenessCheck: ActionResult = ActionResult.NotApplicable,
    registerSelfie: ActionResult = ActionResult.NotApplicable,
    returnPersonalInfo: ActionResult = ActionResult.NotApplicable,
    selfieCheck: ActionResult = ActionResult.NotApplicable,
    selfieProvided: ActionResult = ActionResult.NotApplicable,
    selfieToIdAuthorityCompare: ActionResult = ActionResult.NotApplicable,
    selfieToIdCardCompare: ActionResult = ActionResult.NotApplicable,
    selfieToRegisteredSelfieCompare: ActionResult = ActionResult.NotApplicable,
    updateRegisteredSelfieOnFile: ActionResult = ActionResult.NotApplicable,
    verifyDocument: ActionResult = ActionResult.NotApplicable,
    verifyIdNumber: ActionResult = ActionResult.NotApplicable
  ) {
    this.documentCheck = documentCheck;
    this.humanReviewCompare = humanReviewCompare;
    this.humanReviewDocumentCheck = humanReviewDocumentCheck;
    this.humanReviewLivenessCheck = humanReviewLivenessCheck;
    this.humanReviewSelfieCheck = humanReviewSelfieCheck;
    this.humanReviewUpdateSelfie = humanReviewUpdateSelfie;
    this.livenessCheck = livenessCheck;
    this.registerSelfie = registerSelfie;
    this.returnPersonalInfo = returnPersonalInfo;
    this.selfieCheck = selfieCheck;
    this.selfieProvided = selfieProvided;
    this.selfieToIdAuthorityCompare = selfieToIdAuthorityCompare;
    this.selfieToIdCardCompare = selfieToIdCardCompare;
    this.selfieToRegisteredSelfieCompare = selfieToRegisteredSelfieCompare;
    this.updateRegisteredSelfieOnFile = updateRegisteredSelfieOnFile;
    this.verifyDocument = verifyDocument;
    this.verifyIdNumber = verifyIdNumber;
  }
}

class EnhancedKycResponse {
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

  constructor(
    smileJobId: string,
    partnerParams: PartnerParams,
    resultText: string,
    resultCode: string,
    actions: Actions,
    country: string,
    idType: string,
    idNumber: string,
    fullName?: string,
    expirationDate?: string,
    dob?: string,
    base64Photo?: string
  ) {
    this.smileJobId = smileJobId;
    this.partnerParams = partnerParams;
    this.resultText = resultText;
    this.resultCode = resultCode;
    this.actions = actions;
    this.country = country;
    this.idType = idType;
    this.idNumber = idNumber;
    this.fullName = fullName;
    this.expirationDate = expirationDate;
    this.dob = dob;
    this.base64Photo = base64Photo;
  }
}

class EnhancedKycRequest {
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

  constructor(
    country: string,
    idType: string,
    idNumber: string,
    partnerParams: PartnerParams,
    timestamp: string,
    signature: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    dob?: string,
    phoneNumber?: string,
    bankCode?: string,
    callbackUrl?: string
  ) {
    this.country = country;
    this.idType = idType;
    this.idNumber = idNumber;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.dob = dob;
    this.phoneNumber = phoneNumber;
    this.bankCode = bankCode;
    this.callbackUrl = callbackUrl;
    this.partnerParams = partnerParams;
    this.timestamp = timestamp;
    this.signature = signature;
  }
}

class EnhancedKycAsyncResponse {
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}

class ImageLinks {
  selfieImageUrl?: string;
  error?: string;

  constructor(selfieImageUrl?: string, error?: string) {
    this.selfieImageUrl = selfieImageUrl;
    this.error = error;
  }
}

class SuspectUser {
  reason: string;
  userId: string;

  constructor(reason: string, userId: string) {
    this.reason = reason;
    this.userId = userId;
  }
}

class Antifraud {
  suspectUsers: SuspectUser[];

  constructor(suspectUsers: SuspectUser[]) {
    this.suspectUsers = suspectUsers;
  }
}

class JobStatusRequest {
  userId: string;
  jobId: string;
  includeImageLinks: boolean;
  includeHistory: boolean;
  partnerId: string;
  timestamp: string;
  signature: string;

  constructor(
    userId: string,
    jobId: string,
    includeImageLinks: boolean,
    includeHistory: boolean,
    partnerId: string,
    timestamp: string,
    signature: string
  ) {
    this.userId = userId;
    this.jobId = jobId;
    this.includeImageLinks = includeImageLinks;
    this.includeHistory = includeHistory;
    this.partnerId = partnerId;
    this.timestamp = timestamp;
    this.signature = signature;
  }
}

class SmartSelfieJobResult {
  actions: Actions;
  resultCode: string;
  resultText: string;
  smileJobId: string;
  partnerParams: PartnerParams;
  confidence?: number;

  constructor(
    actions: Actions,
    resultCode: string,
    resultText: string,
    smileJobId: string,
    partnerParams: PartnerParams,
    confidence?: number
  ) {
    this.actions = actions;
    this.resultCode = resultCode;
    this.resultText = resultText;
    this.smileJobId = smileJobId;
    this.partnerParams = partnerParams;
    this.confidence = confidence;
  }
}

class SmartSelfieJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: SmartSelfieJobResult;
  resultString?: string;
  history?: SmartSelfieJobResult[];
  imageLinks?: ImageLinks;

  constructor(
    timestamp: string,
    jobComplete: boolean,
    jobSuccess: boolean,
    code: string,
    result?: SmartSelfieJobResult,
    resultString?: string,
    history?: SmartSelfieJobResult[],
    imageLinks?: ImageLinks
  ) {
    this.timestamp = timestamp;
    this.jobComplete = jobComplete;
    this.jobSuccess = jobSuccess;
    this.code = code;
    this.result = result;
    this.resultString = resultString;
    this.history = history;
    this.imageLinks = imageLinks;
  }
}

class DocumentVerificationJobResult {
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

  constructor(
    actions: Actions,
    resultCode: string,
    resultText: string,
    smileJobId: string,
    partnerParams: PartnerParams,
    country?: string,
    idType?: string,
    idNumber?: string,
    fullName?: string,
    dob?: string,
    gender?: string,
    expirationDate?: string,
    documentImageBase64?: string,
    phoneNumber?: string,
    phoneNumber2?: string,
    address?: string
  ) {
    this.actions = actions;
    this.resultCode = resultCode;
    this.resultText = resultText;
    this.smileJobId = smileJobId;
    this.partnerParams = partnerParams;
    this.country = country;
    this.idType = idType;
    this.idNumber = idNumber;
    this.fullName = fullName;
    this.dob = dob;
    this.gender = gender;
    this.expirationDate = expirationDate;
    this.documentImageBase64 = documentImageBase64;
    this.phoneNumber = phoneNumber;
    this.phoneNumber2 = phoneNumber2;
    this.address = address;
  }
}

class DocumentVerificationJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: DocumentVerificationJobResult;
  resultString?: string;
  history?: DocumentVerificationJobResult[];
  imageLinks?: ImageLinks;

  constructor(
    timestamp: string,
    jobComplete: boolean,
    jobSuccess: boolean,
    code: string,
    result?: DocumentVerificationJobResult,
    resultString?: string,
    history?: DocumentVerificationJobResult[],
    imageLinks?: ImageLinks
  ) {
    this.timestamp = timestamp;
    this.jobComplete = jobComplete;
    this.jobSuccess = jobSuccess;
    this.code = code;
    this.result = result;
    this.resultString = resultString;
    this.history = history;
    this.imageLinks = imageLinks;
  }
}

class BiometricKycJobResult {
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
  fullData?: Map<string, string>;
  fullName?: string;
  idNumber?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  expirationDate?: string;
  secondaryIdNumber?: string;
  idNumberPreviouslyRegistered?: boolean;
  previousRegistrantsUserIds?: string[];

  constructor(
    actions: Actions,
    resultCode: string,
    resultText: string,
    resultType: string,
    smileJobId: string,
    partnerParams: PartnerParams,
    antifraud?: Antifraud,
    dob?: string,
    photoBase64?: string,
    gender?: string,
    idType?: string,
    address?: string,
    country?: string,
    documentImageBase64?: string,
    fullData?: Map<string, string>,
    fullName?: string,
    idNumber?: string,
    phoneNumber?: string,
    phoneNumber2?: string,
    expirationDate?: string,
    secondaryIdNumber?: string,
    idNumberPreviouslyRegistered?: boolean,
    previousRegistrantsUserIds?: string[]
  ) {
    this.actions = actions;
    this.resultCode = resultCode;
    this.resultText = resultText;
    this.resultType = resultType;
    this.smileJobId = smileJobId;
    this.partnerParams = partnerParams;
    this.antifraud = antifraud;
    this.dob = dob;
    this.photoBase64 = photoBase64;
    this.gender = gender;
    this.idType = idType;
    this.address = address;
    this.country = country;
    this.documentImageBase64 = documentImageBase64;
    this.fullData = fullData;
    this.fullName = fullName;
    this.idNumber = idNumber;
    this.phoneNumber = phoneNumber;
    this.phoneNumber2 = phoneNumber2;
    this.expirationDate = expirationDate;
    this.secondaryIdNumber = secondaryIdNumber;
    this.idNumberPreviouslyRegistered = idNumberPreviouslyRegistered;
    this.previousRegistrantsUserIds = previousRegistrantsUserIds;
  }
}

class BiometricKycJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: BiometricKycJobResult;
  resultString?: string;
  history?: BiometricKycJobResult[];
  imageLinks?: ImageLinks;

  constructor(
    timestamp: string,
    jobComplete: boolean,
    jobSuccess: boolean,
    code: string,
    result?: BiometricKycJobResult,
    resultString?: string,
    history?: BiometricKycJobResult[],
    imageLinks?: ImageLinks
  ) {
    this.timestamp = timestamp;
    this.jobComplete = jobComplete;
    this.jobSuccess = jobSuccess;
    this.code = code;
    this.result = result;
    this.resultString = resultString;
    this.history = history;
    this.imageLinks = imageLinks;
  }
}

class EnhancedDocumentVerificationJobResult {
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
  fullData?: Map<string, string>;
  fullName?: string;
  idNumber?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  expirationDate?: string;
  secondaryIdNumber?: string;
  idNumberPreviouslyRegistered?: boolean;
  previousRegistrantsUserIds?: string[];

  constructor(
    actions: Actions,
    resultCode: string,
    resultText: string,
    resultType: string,
    smileJobId: string,
    partnerParams: PartnerParams,
    antifraud?: Antifraud,
    dob?: string,
    photoBase64?: string,
    gender?: string,
    idType?: string,
    address?: string,
    country?: string,
    documentImageBase64?: string,
    fullData?: Map<string, string>,
    fullName?: string,
    idNumber?: string,
    phoneNumber?: string,
    phoneNumber2?: string,
    expirationDate?: string,
    secondaryIdNumber?: string,
    idNumberPreviouslyRegistered?: boolean,
    previousRegistrantsUserIds?: string[]
  ) {
    this.actions = actions;
    this.resultCode = resultCode;
    this.resultText = resultText;
    this.resultType = resultType;
    this.smileJobId = smileJobId;
    this.partnerParams = partnerParams;
    this.antifraud = antifraud;
    this.dob = dob;
    this.photoBase64 = photoBase64;
    this.gender = gender;
    this.idType = idType;
    this.address = address;
    this.country = country;
    this.documentImageBase64 = documentImageBase64;
    this.fullData = fullData;
    this.fullName = fullName;
    this.idNumber = idNumber;
    this.phoneNumber = phoneNumber;
    this.phoneNumber2 = phoneNumber2;
    this.expirationDate = expirationDate;
    this.secondaryIdNumber = secondaryIdNumber;
    this.idNumberPreviouslyRegistered = idNumberPreviouslyRegistered;
    this.previousRegistrantsUserIds = previousRegistrantsUserIds;
  }
}

class EnhancedDocumentVerificationJobStatusResponse {
  timestamp: string;
  jobComplete: boolean;
  jobSuccess: boolean;
  code: string;
  result?: EnhancedDocumentVerificationJobResult;
  resultString?: string;
  history?: EnhancedDocumentVerificationJobResult[];
  imageLinks?: ImageLinks;

  constructor(
    timestamp: string,
    jobComplete: boolean,
    jobSuccess: boolean,
    code: string,
    result?: EnhancedDocumentVerificationJobResult,
    resultString?: string,
    history?: EnhancedDocumentVerificationJobResult[],
    imageLinks?: ImageLinks
  ) {
    this.timestamp = timestamp;
    this.jobComplete = jobComplete;
    this.jobSuccess = jobSuccess;
    this.code = code;
    this.result = result;
    this.resultString = resultString;
    this.history = history;
    this.imageLinks = imageLinks;
  }
}

class ProductsConfigRequest {
  partnerId: string;
  timestamp: string;
  signature: string;

  constructor(partnerId: string, timestamp: string, signature: string) {
    this.partnerId = partnerId;
    this.timestamp = timestamp;
    this.signature = signature;
  }
}

class IdSelection {
  basicKyc: Map<string, string[]>;
  biometricKyc: Map<string, string[]>;
  enhancedKyc: Map<string, string[]>;
  documentVerification: Map<string, string[]>;

  constructor(
    basicKyc: Map<string, string[]>,
    biometricKyc: Map<string, string[]>,
    enhancedKyc: Map<string, string[]>,
    documentVerification: Map<string, string[]>
  ) {
    this.basicKyc = basicKyc;
    this.biometricKyc = biometricKyc;
    this.enhancedKyc = enhancedKyc;
    this.documentVerification = documentVerification;
  }
}

class ProductsConfigResponse {
  consentRequired: Map<string, string[]>;
  idSelection: IdSelection;

  constructor(consentRequired: Map<string, string[]>, idSelection: IdSelection) {
    this.consentRequired = consentRequired;
    this.idSelection = idSelection;
  }
}

class Country {
  code: string;
  continent: string;
  name: string;

  constructor(code: string, continent: string, name: string) {
    this.code = code;
    this.continent = continent;
    this.name = name;
  }
}

class IdType {
  code: string;
  example: string[];
  hasBack: boolean;
  name: string;

  constructor(code: string, example: string[], hasBack: boolean, name: string) {
    this.code = code;
    this.example = example;
    this.hasBack = hasBack;
    this.name = name;
  }
}

class ValidDocument {
  country: Country;
  idTypes: IdType[];

  constructor(country: Country, idTypes: IdType[]) {
    this.country = country;
    this.idTypes = idTypes;
  }
}

class ValidDocumentsResponse {
  validDocuments: ValidDocument[];

  constructor(validDocuments: ValidDocument[]) {
    this.validDocuments = validDocuments;
  }
}

class BankCode {
  name: string;
  code: string;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}

class AvailableIdType {
  idTypeKey: string;
  label: string;
  requiredFields: string[];
  testData?: string;
  idNumberRegex?: string;

  constructor(
    idTypeKey: string,
    label: string,
    requiredFields: string[],
    testData?: string,
    idNumberRegex?: string
  ) {
    this.idTypeKey = idTypeKey;
    this.label = label;
    this.requiredFields = requiredFields;
    this.testData = testData;
    this.idNumberRegex = idNumberRegex;
  }
}

class CountryInfo {
  countryCode: string;
  name: string;
  availableIdTypes: AvailableIdType[];

  constructor(countryCode: string, name: string, availableIdTypes: AvailableIdType[]) {
    this.countryCode = countryCode;
    this.name = name;
    this.availableIdTypes = availableIdTypes;
  }
}

class HostedWeb {
  basicKyc: Map<string, CountryInfo>;
  biometricKyc: Map<string, CountryInfo>;
  enhancedKyc: Map<string, CountryInfo>;
  documentVerification: Map<string, CountryInfo>;
  enhancedKycSmartSelfie: Map<string, CountryInfo>;
  enhancedDocumentVerification: Map<string, CountryInfo>;

  constructor(
    basicKyc: Map<string, CountryInfo>,
    biometricKyc: Map<string, CountryInfo>,
    enhancedKyc: Map<string, CountryInfo>,
    documentVerification: Map<string, CountryInfo>,
    enhancedKycSmartSelfie: Map<string, CountryInfo>,
    enhancedDocumentVerification: Map<string, CountryInfo>
  ) {
    this.basicKyc = basicKyc;
    this.biometricKyc = biometricKyc;
    this.enhancedKyc = enhancedKyc;
    this.documentVerification = documentVerification;
    this.enhancedKycSmartSelfie = enhancedKycSmartSelfie;
    this.enhancedDocumentVerification = enhancedDocumentVerification;
  }
}

class ServicesResponse {
  bankCodes: BankCode[];
  hostedWeb: HostedWeb;

  constructor(bankCodes: BankCode[], hostedWeb: HostedWeb) {
    this.bankCodes = bankCodes;
    this.hostedWeb = hostedWeb;
  }
}
