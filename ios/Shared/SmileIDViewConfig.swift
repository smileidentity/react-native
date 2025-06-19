//
//  SmileIDViewConfig.swift
//  SmileIDExtReactNative
//
//  Created by Japhet Ndhlovu on 6/19/25.
//
import Foundation
import SmileID

/**
 * Shared properties for all SmileID views
 * Eliminates duplication across the 12 different view types
 */
struct SmileIDViewConfig {
    var userId: String?
    var jobId: String?
    var allowAgentMode: Bool = false
    var allowNewEnroll: Bool = false
    var showInstructions: Bool = true
    var skipApiSubmission: Bool = false
    var showAttribution: Bool = true
    var extraPartnerParams: [String: String] = [:]
    
    // Document-specific properties
    var countryCode: String?
    var documentType: String?
    var captureBothSides: Bool = true
    var allowGalleryUpload: Bool = false
    var showConfirmation: Bool = true
    var idAspectRatio: Float?
    var isDocumentFrontSide: Bool = true
    var bypassSelfieCaptureWithFilePath: String?
    
    // Capture-specific properties
    var useStrictMode: Bool = false
    
    // Consent-specific properties
    var partnerName: String?
    var partnerPrivacyPolicy: String?
    var logoResName: String?
    var productName: String?
    
    // KYC-specific properties
    var idInfo: IdInfo?
    var consentInformation: ConsentInformation?
    
    /**
     * Validates required properties for authentication/enrollment views
     */
    func validateSelfieProperties() -> Bool {
        return userId != nil // jobId will be auto-generated if null
    }
    
    /**
     * Validates required properties for document views
     */
    func validateDocumentProperties() -> Bool {
        return userId != nil && countryCode != nil
    }
    
    /**
     * Validates required properties for enhanced document verification views
     */
    func validateEnhancedDocumentProperties() -> Bool {
        return validateDocumentProperties() && consentInformation != nil
    }
    
    /**
     * Validates required properties for consent views
     */
    func validateConsentProperties() -> Bool {
        return partnerName != nil && partnerPrivacyPolicy != nil &&
               logoResName != nil && productName != nil
    }
    
    /**
     * Validates required properties for KYC views
     */
    func validateKYCProperties() -> Bool {
        return userId != nil && idInfo != nil
    }
    
    /**
     * Validates required properties for Biometric KYC views
     */
    func validateBiometricKYCProperties() -> Bool {
        return validateKYCProperties() && consentInformation != nil
    }
    
    /**
     * Generates random IDs if not provided
     */
    func ensureIds() -> SmileIDViewConfig {
        var copy = self
        copy.userId = userId ?? SmileID.randomUserId()
        copy.jobId = jobId ?? SmileID.randomJobId()
        return copy
    }
}

// MARK: - Companion Object Methods
extension SmileIDViewConfig {
    /**
     * Validates and creates SmileIDViewConfig for BiometricKYC from Dictionary
     * - Throws: NSError if required fields are missing
     */
    static func fromBiometricKYCMap(_ map: [String: Any]) throws -> SmileIDViewConfig {
        guard let idInfoMap = map["idInfo"] as? [String: Any] else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "idInfo is required to run Biometric KYC"])
        }
        
        return SmileIDViewConfig(
            userId: map["userId"] as? String,
            jobId: map["jobId"] as? String,
            allowAgentMode: (map["allowAgentMode"] as? Bool) ?? false,
            allowNewEnroll: (map["allowNewEnroll"] as? Bool) ?? false,
            showInstructions: (map["showInstructions"] as? Bool) ?? true,
            skipApiSubmission: false,
            showAttribution: (map["showAttribution"] as? Bool) ?? true,
            extraPartnerParams: (map["extraPartnerParams"] as? [String: String]) ?? [:],
            countryCode: nil,
            documentType: nil,
            captureBothSides: true,
            allowGalleryUpload: false,
            showConfirmation: true,
            idAspectRatio: nil,
            isDocumentFrontSide: true,
            bypassSelfieCaptureWithFilePath: nil,
            useStrictMode: (map["useStrictMode"] as? Bool) ?? false,
            partnerName: nil,
            partnerPrivacyPolicy: nil,
            logoResName: nil,
            productName: nil,
            idInfo: try idInfoFromMap(idInfoMap),
            consentInformation: try? consentInfoFromMap(map["consentInformation"] as? [String: Any])
        )
    }
    
    /**
     * Validates and creates SmileIDViewConfig for DocumentVerification from Dictionary
     * - Throws: NSError if required fields are missing
     */
    static func fromDocumentVerificationMap(_ map: [String: Any]) throws -> SmileIDViewConfig {
        guard let countryCode = map["countryCode"] as? String else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "countryCode is required to run Document Verification"])
        }
        
        return SmileIDViewConfig(
            userId: map["userId"] as? String,
            jobId: map["jobId"] as? String,
            allowAgentMode: (map["allowAgentMode"] as? Bool) ?? false,
            allowNewEnroll: (map["allowNewEnroll"] as? Bool) ?? false,
            showInstructions: (map["showInstructions"] as? Bool) ?? true,
            skipApiSubmission: false,
            showAttribution: (map["showAttribution"] as? Bool) ?? true,
            extraPartnerParams: (map["extraPartnerParams"] as? [String: String]) ?? [:],
            countryCode: countryCode,
            documentType: map["documentType"] as? String,
            captureBothSides: (map["captureBothSides"] as? Bool) ?? false,
            allowGalleryUpload: (map["allowGalleryUpload"] as? Bool) ?? false,
            showConfirmation: true,
            idAspectRatio: map["idAspectRatio"] as? Float,
            isDocumentFrontSide: true,
            bypassSelfieCaptureWithFilePath: map["bypassSelfieCaptureWithFilePath"] as? String,
            useStrictMode: (map["useStrictMode"] as? Bool) ?? false,
            partnerName: nil,
            partnerPrivacyPolicy: nil,
            logoResName: nil,
            productName: nil,
            idInfo: nil,
            consentInformation: nil
        )
    }
    
    /**
     * Validates and creates SmileIDViewConfig for EnhancedDocumentVerification from Dictionary
     * - Throws: NSError if required fields are missing
     */
    static func fromEnhancedDocumentVerificationMap(_ map: [String: Any]) throws -> SmileIDViewConfig {
        guard let countryCode = map["countryCode"] as? String else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "countryCode is required to run Enhanced Document Verification"])
        }
        
        return SmileIDViewConfig(
            userId: map["userId"] as? String,
            jobId: map["jobId"] as? String,
            allowAgentMode: (map["allowAgentMode"] as? Bool) ?? false,
            allowNewEnroll: (map["allowNewEnroll"] as? Bool) ?? false,
            showInstructions: (map["showInstructions"] as? Bool) ?? true,
            skipApiSubmission: false,
            showAttribution: (map["showAttribution"] as? Bool) ?? true,
            extraPartnerParams: (map["extraPartnerParams"] as? [String: String]) ?? [:],
            countryCode: countryCode,
            documentType: map["documentType"] as? String,
            captureBothSides: (map["captureBothSides"] as? Bool) ?? false,
            allowGalleryUpload: (map["allowGalleryUpload"] as? Bool) ?? false,
            showConfirmation: true,
            idAspectRatio: map["idAspectRatio"] as? Float,
            isDocumentFrontSide: true,
            bypassSelfieCaptureWithFilePath: nil,
            useStrictMode: (map["useStrictMode"] as? Bool) ?? false,
            partnerName: nil,
            partnerPrivacyPolicy: nil,
            logoResName: nil,
            productName: nil,
            idInfo: nil,
            consentInformation: try? consentInfoFromMap(map["consentInformation"] as? [String: Any])
        )
    }
    
    /**
     * Validates and creates SmileIDViewConfig for Consent from Dictionary
     * - Throws: NSError if required fields are missing
     */
    static func fromConsentMap(_ map: [String: Any]) throws -> SmileIDViewConfig {
        guard let partnerName = map["partnerName"] as? String else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "partnerName is required to show Consent Screen"])
        }
        guard let partnerPrivacyPolicy = map["partnerPrivacyPolicy"] as? String else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "partnerPrivacyPolicy is required to show Consent Screen"])
        }
        guard let logoResName = map["partnerIcon"] as? String else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "partnerIcon is required to show Consent Screen"])
        }
        guard let productName = map["productName"] as? String else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "productName is required to show Consent Screen"])
        }
        
        return SmileIDViewConfig(
            userId: map["userId"] as? String,
            jobId: map["jobId"] as? String,
            allowAgentMode: (map["allowAgentMode"] as? Bool) ?? false,
            allowNewEnroll: false,
            showInstructions: (map["showInstructions"] as? Bool) ?? true,
            skipApiSubmission: false,
            showAttribution: (map["showAttribution"] as? Bool) ?? true,
            extraPartnerParams: (map["extraPartnerParams"] as? [String: String]) ?? [:],
            countryCode: nil,
            documentType: nil,
            captureBothSides: true,
            allowGalleryUpload: false,
            showConfirmation: true,
            idAspectRatio: nil,
            isDocumentFrontSide: true,
            bypassSelfieCaptureWithFilePath: nil,
            useStrictMode: false,
            partnerName: partnerName,
            partnerPrivacyPolicy: partnerPrivacyPolicy,
            logoResName: logoResName,
            productName: productName,
            idInfo: nil,
            consentInformation: nil
        )
    }
    
    /**
     * Validates and creates SmileIDViewConfig for SmartSelfie from Dictionary
     */
    static func fromSmartSelfieMap(_ map: [String: Any]) -> SmileIDViewConfig {
        return SmileIDViewConfig(
            userId: map["userId"] as? String,
            jobId: map["jobId"] as? String,
            allowAgentMode: (map["allowAgentMode"] as? Bool) ?? false,
            allowNewEnroll: (map["allowNewEnroll"] as? Bool) ?? false,
            showInstructions: (map["showInstructions"] as? Bool) ?? true,
            skipApiSubmission: (map["skipApiSubmission"] as? Bool) ?? false,
            showAttribution: (map["showAttribution"] as? Bool) ?? true,
            extraPartnerParams: (map["extraPartnerParams"] as? [String: String]) ?? [:],
            countryCode: nil,
            documentType: nil,
            captureBothSides: true,
            allowGalleryUpload: false,
            showConfirmation: true,
            idAspectRatio: nil,
            isDocumentFrontSide: true,
            bypassSelfieCaptureWithFilePath: nil,
            useStrictMode: false,
            partnerName: nil,
            partnerPrivacyPolicy: nil,
            logoResName: nil,
            productName: nil,
            idInfo: nil,
            consentInformation: nil
        )
    }
    
    /**
     * Validates and creates SmileIDViewConfig for SmartSelfieCapture from Dictionary
     */
    static func fromSmartSelfieCaptureMap(_ map: [String: Any]) -> SmileIDViewConfig {
        return SmileIDViewConfig(
            userId: map["userId"] as? String,
            jobId: map["jobId"] as? String,
            allowAgentMode: (map["allowAgentMode"] as? Bool) ?? false,
            allowNewEnroll: false,
            showInstructions: (map["showInstructions"] as? Bool) ?? true,
            skipApiSubmission: (map["skipApiSubmission"] as? Bool) ?? false,
            showAttribution: (map["showAttribution"] as? Bool) ?? true,
            extraPartnerParams: (map["extraPartnerParams"] as? [String: String]) ?? [:],
            countryCode: nil,
            documentType: nil,
            captureBothSides: true,
            allowGalleryUpload: false,
            showConfirmation: (map["showConfirmation"] as? Bool) ?? true,
            idAspectRatio: nil,
            isDocumentFrontSide: true,
            bypassSelfieCaptureWithFilePath: nil,
            useStrictMode: (map["useStrictMode"] as? Bool) ?? false,
            partnerName: nil,
            partnerPrivacyPolicy: nil,
            logoResName: nil,
            productName: nil,
            idInfo: nil,
            consentInformation: nil
        )
    }
    
    /**
     * Validates and creates SmileIDViewConfig for DocumentCapture from Dictionary
     */
    static func fromDocumentCaptureMap(_ map: [String: Any]) -> SmileIDViewConfig {
        return SmileIDViewConfig(
            userId: map["userId"] as? String,
            jobId: map["jobId"] as? String,
            allowAgentMode: false,
            allowNewEnroll: false,
            showInstructions: (map["showInstructions"] as? Bool) ?? true,
            skipApiSubmission: false,
            showAttribution: (map["showAttribution"] as? Bool) ?? true,
            extraPartnerParams: (map["extraPartnerParams"] as? [String: String]) ?? [:],
            countryCode: map["countryCode"] as? String,
            documentType: map["documentType"] as? String,
            captureBothSides: (map["captureBothSides"] as? Bool) ?? true,
            allowGalleryUpload: (map["allowGalleryUpload"] as? Bool) ?? false,
            showConfirmation: (map["showConfirmation"] as? Bool) ?? true,
            idAspectRatio: map["idAspectRatio"] as? Float,
            isDocumentFrontSide: (map["isDocumentFrontSide"] as? Bool) ?? true,
            bypassSelfieCaptureWithFilePath: nil,
            useStrictMode: false,
            partnerName: nil,
            partnerPrivacyPolicy: nil,
            logoResName: nil,
            productName: nil,
            idInfo: nil,
            consentInformation: nil
        )
    }
    
    /**
     * Creates SmileIDViewConfig from a generic Dictionary
     * This is useful for Expo and other platforms that use Dictionary
     */
    static func fromMap(_ map: [String: Any], viewType: ViewType) throws -> SmileIDViewConfig {
        switch viewType {
        case .biometricKYC:
            return try fromBiometricKYCMap(map)
        case .documentVerification:
            return try fromDocumentVerificationMap(map)
        case .enhancedDocumentVerification:
            return try fromEnhancedDocumentVerificationMap(map)
        case .consent:
            return try fromConsentMap(map)
        case .smartSelfieAuthentication,
             .smartSelfieEnrollment,
             .smartSelfieAuthenticationEnhanced,
             .smartSelfieEnrollmentEnhanced:
            return fromSmartSelfieMap(map)
        case .smartSelfieCapture:
            return fromSmartSelfieCaptureMap(map)
        case .documentCapture:
            return fromDocumentCaptureMap(map)
        }
    }
}

// MARK: - Helper Functions
extension SmileIDViewConfig {
    // Helper function to convert map to IdInfo
    private static func idInfoFromMap(_ map: [String: Any]) throws -> IdInfo {
        guard let country = map["country"] as? String else {
            throw NSError(domain: "SmileIDViewConfig", code: 0, userInfo: [NSLocalizedDescriptionKey: "country is required in idInfo"])
        }
        
        return IdInfo(
            country: country,
            idType: map["idType"] as? String,
            idNumber: map["idNumber"] as? String,
            firstName: map["firstName"] as? String,
            middleName: map["middleName"] as? String,
            lastName: map["lastName"] as? String,
            dob: map["dob"] as? String,
            bankCode: map["bankCode"] as? String,
            entered: (map["entered"] as? Bool) ?? true
        )
    }
    
    // Helper function to convert map to ConsentInformation
    private static func consentInfoFromMap(_ map: [String: Any]?) throws -> ConsentInformation? {
        guard let map = map else { return nil }
        
        let consentedMap = map["consented"] as? [String: Any]
        let consented: ConsentedInformation
        
        if let consentedMap = consentedMap {
            consented = ConsentedInformation(
                consentGrantedDate: consentedMap["consentGrantedDate"] as? String ?? "",
                personalDetails: (consentedMap["personalDetails"] as? Bool) ?? false,
                contactInformation: (consentedMap["contactInformation"] as? Bool) ?? false,
                documentInformation: (consentedMap["documentInformation"] as? Bool) ?? false
            )
        } else {
            consented = ConsentedInformation(
                consentGrantedDate: "",
                personalDetails: false,
                contactInformation: false,
                documentInformation: false
            )
        }
        
        return ConsentInformation(consented: consented)
    }
}

// MARK: - ViewType Enum
extension SmileIDViewConfig {
    enum ViewType {
        case biometricKYC
        case documentVerification
        case enhancedDocumentVerification
        case consent
        case smartSelfieAuthentication
        case smartSelfieEnrollment
        case smartSelfieAuthenticationEnhanced
        case smartSelfieEnrollmentEnhanced
        case smartSelfieCapture
        case documentCapture
    }
}

// MARK: - ConsentInformation
struct ConsentInformation {
    let consented: ConsentedInformation
}

// MARK: - ConsentedInformation
struct ConsentedInformation {
    let consentGrantedDate: String
    let personalDetails: Bool
    let contactInformation: Bool
    let documentInformation: Bool
}
