/**
 * Shared type definitions for SmileID SDK
 * This module contains all types used across Expo and React Native platforms
 */
import type { ViewProps } from 'react-native';
/**
 * Config class used to pass the smile config to initialize method
 */
export declare class Config {
    partnerId: string;
    authToken: string;
    prodLambdaUrl: string;
    testLambdaUrl: string;
    constructor(partnerId: string, authToken: string, prodLambdaUrl: string, testLambdaUrl: string);
}
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
export type SmartSelfieEnrollmentEnhancedRequest = Omit<SmartSelfieRequest, 'jobId'>;
export type SmartSelfieAuthenticationEnhancedRequest = Omit<SmartSelfieRequest, 'jobId'>;
export type SmartSelfieAuthenticationRequest = Omit<SmartSelfieRequest, 'jobId'>;
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
    jobId?: string;
    useStrictMode?: boolean;
};
export type EnhancedDocumentVerificationRequest = DocumentVerificationRequest & {
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
    idInfo: IdInfo;
    consentInformation?: ConsentInformation;
    useStrictMode?: boolean;
};
export declare enum JobType {
    BiometricKyc = 1,
    SmartSelfieAuthentication = 2,
    SmartSelfieEnrollment = 4,
    EnhancedKyc = 5,
    DocumentVerification = 6,
    BVN = 7,
    EnhancedDocumentVerification = 11
}
/**
 * Custom values specific to partners can be placed in [extras]
 */
export declare class PartnerParams {
    jobType?: JobType;
    jobId: string;
    userId: string;
    extras?: [string: string];
    constructor(jobType: JobType, jobId: string, userId: string, extras?: [string: string]);
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
export declare class AuthenticationRequest {
    jobType: JobType;
    country?: string;
    idType?: string;
    updateEnrolledImage?: boolean;
    jobId?: string;
    userId?: string;
    constructor(jobType: JobType, country?: string, idType?: string, updateEnrolledImage?: boolean, jobId?: string, userId?: string);
}
/**
 * [canAccess] Whether the ID type is enabled for the partner
 * [consentRequired] Whether consent is required for the ID type
 */
export declare class ConsentInfo {
    canAccess: boolean;
    consentRequired: boolean;
    constructor(canAccess: boolean, consentRequired: boolean);
}
export declare class AuthenticationResponse {
    success: boolean;
    signature: string;
    timestamp: string;
    partnerParams: PartnerParams;
    callbackUrl?: string;
    consentInfo?: ConsentInfo;
    constructor(success: boolean, signature: string, timestamp: string, partnerParams: PartnerParams, callbackUrl?: string, consentInfo?: ConsentInfo);
}
export declare class PrepUploadRequest {
    partnerParams: PartnerParams;
    callbackUrl?: string;
    partnerId: string;
    timestamp: string;
    signature: string;
    allowNewEnroll?: boolean;
    constructor(partnerParams: PartnerParams, partnerId: string, timestamp: string, signature: string, callbackUrl?: string, allowNewEnroll?: boolean);
}
export declare class PrepUploadResponse {
    code: string;
    refId: string;
    uploadUrl: string;
    smileJobId: string;
    constructor(code: string, refId: string, uploadUrl: string, smileJobId: string);
}
export declare class ConsentInformation {
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
    constructor(consentGrantedDate: string, personalDetails: boolean, contactInformation: boolean, documentInformation: boolean);
    get personalDetailsConsentGranted(): boolean;
    set personalDetailsConsentGranted(value: boolean);
    get contactInfoConsentGranted(): boolean;
    set contactInfoConsentGranted(value: boolean);
    get documentInfoConsentGranted(): boolean;
    set documentInfoConsentGranted(value: boolean);
}
export declare class IdInfo {
    country: string;
    idType?: string;
    idNumber?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: string;
    bankCode?: string;
    entered?: boolean;
    constructor(country: string, idType?: string, idNumber?: string, firstName?: string, middleName?: string, lastName?: string, dob?: string, bankCode?: string, entered?: boolean);
}
export declare enum ImageType {
    SelfieJpgFile = 0,
    IdCardJpgFile = 1,
    SelfieJpgBase64 = 2,
    IdCardJpgBase64 = 3,
    LivenessJpgFile = 4,
    IdCardRearJpgFile = 5,
    LivenessJpgBase64 = 6,
    IdCardRearJpgBase64 = 7
}
export declare class UploadImageInfo {
    imageTypeId: ImageType;
    imageName: string;
    constructor(imageTypeId: ImageType, imageName: string);
}
export declare class UploadRequest {
    images: UploadImageInfo[];
    idInfo?: IdInfo;
    constructor(images: UploadImageInfo[], idInfo?: IdInfo);
}
export declare enum ActionResult {
    Passed = 0,
    Completed = 1,
    Approved = 2,
    Verified = 3,
    ProvisionallyApproved = 4,
    Returned = 5,
    NotReturned = 6,
    Failed = 7,
    Rejected = 8,
    UnderReview = 9,
    UnableToDetermine = 10,
    NotApplicable = 11,
    NotVerified = 12,
    NotDone = 13,
    IssuerUnavailable = 14,
    Unknown = 15
}
export declare class Actions {
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
    constructor(documentCheck?: ActionResult, humanReviewCompare?: ActionResult, humanReviewDocumentCheck?: ActionResult, humanReviewLivenessCheck?: ActionResult, humanReviewSelfieCheck?: ActionResult, humanReviewUpdateSelfie?: ActionResult, livenessCheck?: ActionResult, registerSelfie?: ActionResult, returnPersonalInfo?: ActionResult, selfieCheck?: ActionResult, selfieProvided?: ActionResult, selfieToIdAuthorityCompare?: ActionResult, selfieToIdCardCompare?: ActionResult, selfieToRegisteredSelfieCompare?: ActionResult, updateRegisteredSelfieOnFile?: ActionResult, verifyDocument?: ActionResult, verifyIdNumber?: ActionResult);
}
export declare class EnhancedKycResponse {
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
    constructor(smileJobId: string, partnerParams: PartnerParams, resultText: string, resultCode: string, actions: Actions, country: string, idType: string, idNumber: string, fullName?: string, expirationDate?: string, dob?: string, base64Photo?: string);
}
export declare class EnhancedKycRequest {
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
    constructor(country: string, idType: string, idNumber: string, partnerParams: PartnerParams, timestamp: string, signature: string, firstName?: string, middleName?: string, lastName?: string, dob?: string, phoneNumber?: string, bankCode?: string, callbackUrl?: string, consentInformation?: ConsentInformation);
}
export declare class EnhancedKycAsyncResponse {
    success: boolean;
    constructor(success: boolean);
}
export declare class ImageLinks {
    selfieImageUrl?: string;
    error?: string;
    constructor(selfieImageUrl?: string, error?: string);
}
export declare class SuspectUser {
    reason: string;
    userId: string;
    constructor(reason: string, userId: string);
}
export declare class Antifraud {
    suspectUsers: SuspectUser[];
    constructor(suspectUsers: SuspectUser[]);
}
export declare class JobStatusRequest {
    userId: string;
    jobId: string;
    includeImageLinks: boolean;
    includeHistory: boolean;
    partnerId: string;
    timestamp: string;
    signature: string;
    interval?: number;
    numAttempts?: number;
    constructor(userId: string, jobId: string, includeImageLinks: boolean, includeHistory: boolean, partnerId: string, timestamp: string, signature: string);
}
export declare class SmartSelfieJobResult {
    actions: Actions;
    resultCode: string;
    resultText: string;
    smileJobId: string;
    partnerParams: PartnerParams;
    confidence?: number;
    constructor(actions: Actions, resultCode: string, resultText: string, smileJobId: string, partnerParams: PartnerParams, confidence?: number);
}
export declare class SmartSelfieJobStatusResponse {
    timestamp: string;
    jobComplete: boolean;
    jobSuccess: boolean;
    code: string;
    result?: SmartSelfieJobResult;
    resultString?: string;
    history?: SmartSelfieJobResult[];
    imageLinks?: ImageLinks;
    constructor(timestamp: string, jobComplete: boolean, jobSuccess: boolean, code: string, result?: SmartSelfieJobResult, resultString?: string, history?: SmartSelfieJobResult[], imageLinks?: ImageLinks);
}
export declare class DocumentVerificationJobResult {
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
    constructor(actions: Actions, resultCode: string, resultText: string, smileJobId: string, partnerParams: PartnerParams, country?: string, idType?: string, idNumber?: string, fullName?: string, dob?: string, gender?: string, expirationDate?: string, documentImageBase64?: string, phoneNumber?: string, phoneNumber2?: string, address?: string);
}
export declare class DocumentVerificationJobStatusResponse {
    timestamp: string;
    jobComplete: boolean;
    jobSuccess: boolean;
    code: string;
    result?: DocumentVerificationJobResult;
    resultString?: string;
    history?: DocumentVerificationJobResult[];
    imageLinks?: ImageLinks;
    constructor(timestamp: string, jobComplete: boolean, jobSuccess: boolean, code: string, result?: DocumentVerificationJobResult, resultString?: string, history?: DocumentVerificationJobResult[], imageLinks?: ImageLinks);
}
export declare class BiometricKycJobResult {
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
    constructor(actions: Actions, resultCode: string, resultText: string, resultType: string, smileJobId: string, partnerParams: PartnerParams, antifraud?: Antifraud, dob?: string, photoBase64?: string, gender?: string, idType?: string, address?: string, country?: string, documentImageBase64?: string, fullData?: Map<string, string>, fullName?: string, idNumber?: string, phoneNumber?: string, phoneNumber2?: string, expirationDate?: string, secondaryIdNumber?: string, idNumberPreviouslyRegistered?: boolean, previousRegistrantsUserIds?: string[]);
}
export declare class BiometricKycJobStatusResponse {
    timestamp: string;
    jobComplete: boolean;
    jobSuccess: boolean;
    code: string;
    result?: BiometricKycJobResult;
    resultString?: string;
    history?: BiometricKycJobResult[];
    imageLinks?: ImageLinks;
    constructor(timestamp: string, jobComplete: boolean, jobSuccess: boolean, code: string, result?: BiometricKycJobResult, resultString?: string, history?: BiometricKycJobResult[], imageLinks?: ImageLinks);
}
export declare class EnhancedDocumentVerificationJobResult {
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
    constructor(actions: Actions, resultCode: string, resultText: string, resultType: string, smileJobId: string, partnerParams: PartnerParams, antifraud?: Antifraud, dob?: string, photoBase64?: string, gender?: string, idType?: string, address?: string, country?: string, documentImageBase64?: string, fullData?: Map<string, string>, fullName?: string, idNumber?: string, phoneNumber?: string, phoneNumber2?: string, expirationDate?: string, secondaryIdNumber?: string, idNumberPreviouslyRegistered?: boolean, previousRegistrantsUserIds?: string[]);
}
export declare class EnhancedDocumentVerificationJobStatusResponse {
    timestamp: string;
    jobComplete: boolean;
    jobSuccess: boolean;
    code: string;
    result?: EnhancedDocumentVerificationJobResult;
    resultString?: string;
    history?: EnhancedDocumentVerificationJobResult[];
    imageLinks?: ImageLinks;
    constructor(timestamp: string, jobComplete: boolean, jobSuccess: boolean, code: string, result?: EnhancedDocumentVerificationJobResult, resultString?: string, history?: EnhancedDocumentVerificationJobResult[], imageLinks?: ImageLinks);
}
export declare class ProductsConfigRequest {
    partnerId: string;
    timestamp: string;
    signature: string;
    constructor(partnerId: string, timestamp: string, signature: string);
}
export declare class IdSelection {
    basicKyc: Map<string, string[]>;
    biometricKyc: Map<string, string[]>;
    enhancedKyc: Map<string, string[]>;
    documentVerification: Map<string, string[]>;
    constructor(basicKyc: Map<string, string[]>, biometricKyc: Map<string, string[]>, enhancedKyc: Map<string, string[]>, documentVerification: Map<string, string[]>);
}
export declare class ProductsConfigResponse {
    consentRequired: Map<string, string[]>;
    idSelection: IdSelection;
    constructor(consentRequired: Map<string, string[]>, idSelection: IdSelection);
}
export declare class Country {
    code: string;
    continent: string;
    name: string;
    constructor(code: string, continent: string, name: string);
}
export declare class IdType {
    code: string;
    example: string[];
    hasBack: boolean;
    name: string;
    constructor(code: string, example: string[], hasBack: boolean, name: string);
}
export declare class ValidDocument {
    country: Country;
    idTypes: IdType[];
    constructor(country: Country, idTypes: IdType[]);
}
export declare class ValidDocumentsResponse {
    validDocuments: ValidDocument[];
    constructor(validDocuments: ValidDocument[]);
}
export declare class BankCode {
    name: string;
    code: string;
    constructor(name: string, code: string);
}
export declare class AvailableIdType {
    idTypeKey: string;
    label: string;
    requiredFields: string[];
    testData?: string;
    idNumberRegex?: string;
    constructor(idTypeKey: string, label: string, requiredFields: string[], testData?: string, idNumberRegex?: string);
}
export declare class CountryInfo {
    countryCode: string;
    name: string;
    availableIdTypes: AvailableIdType[];
    constructor(countryCode: string, name: string, availableIdTypes: AvailableIdType[]);
}
export declare class HostedWeb {
    basicKyc: Map<string, CountryInfo>;
    biometricKyc: Map<string, CountryInfo>;
    enhancedKyc: Map<string, CountryInfo>;
    documentVerification: Map<string, CountryInfo>;
    enhancedKycSmartSelfie: Map<string, CountryInfo>;
    enhancedDocumentVerification: Map<string, CountryInfo>;
    constructor(basicKyc: Map<string, CountryInfo>, biometricKyc: Map<string, CountryInfo>, enhancedKyc: Map<string, CountryInfo>, documentVerification: Map<string, CountryInfo>, enhancedKycSmartSelfie: Map<string, CountryInfo>, enhancedDocumentVerification: Map<string, CountryInfo>);
}
export declare class ServicesResponse {
    bankCodes: BankCode[];
    hostedWeb: HostedWeb;
    constructor(bankCodes: BankCode[], hostedWeb: HostedWeb);
}
export {};
//# sourceMappingURL=types.d.ts.map