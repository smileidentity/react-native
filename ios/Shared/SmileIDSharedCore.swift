//
//  SmileIDSharedCore.swift
//  Pods
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID

/**
 * Shared business logic for SmileID SDK operations
 * Used by both React Native and Expo implementations to avoid code duplication
 * 
 * This is a Swift equivalent of the Kotlin SmileIDSharedCore object
 */
public class SmileIDSharedCore {
    
    // MARK: - Singleton
    public static let shared = SmileIDSharedCore()
    
    private init() {}
    
    // MARK: - Result Type
    
    /// Result wrapper for SmileID operations with generic support
    public enum SmileIDSharedResult<T> {
        case success(T)
        case error(code: String, message: String, cause: Error?)
        case withError(cause: Error)
    }
    
    // MARK: - Basic Operations
    
    /// Initialize SmileID SDK with various configuration options
    public func initialize(
        useSandBox: Bool,
        enableCrashReporting: Bool,
        config: Config? = nil,
        apiKey: String? = nil
    ) -> SmileIDSharedResult<Void> {
        do {
            if let apiKey = apiKey, let config = config {
                // Initialize with API key and config
                SmileID.initialize(
                    apiKey: apiKey,
                    config: config,
                    useSandbox: useSandBox
                )
            } else if let config = config {
                // Initialize with just config
                SmileID.initialize(
                    config: config,
                    useSandbox: useSandBox
                )
            } else {
                // Basic initialization
                SmileID.initialize(useSandbox: useSandBox)
            }
            
            // Note: Crash reporting is handled separately in iOS SDK
            // enableCrashReporting parameter is maintained for API compatibility
            
            return .success(())
        } catch {
            return .error(
                code: "SMILEID_INIT_ERROR",
                message: "Failed to initialize SmileID SDK: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    /// Set callback URL
    public func setCallbackUrl(callbackUrl: String) -> SmileIDSharedResult<Void> {
        guard let url = URL(string: callbackUrl) else {
            return .error(
                code: "CALLBACK_URL_ERROR",
                message: "Invalid callback URL format",
                cause: nil
            )
        }
        
        SmileID.setCallbackUrl(url: url)
        return .success(())
    }
    
    /// Disable crash reporting
    public func disableCrashReporting() -> SmileIDSharedResult<Void> {
        // Note: iOS SDK doesn't have a direct equivalent to SmileIDCrashReporting.disable()
        // This is maintained for API parity with Android
        return .success(())
    }
    
    /// Set allow offline mode
    public func setAllowOfflineMode(allowOfflineMode: Bool) -> SmileIDSharedResult<Void> {
        SmileID.setAllowOfflineMode(allowOfflineMode: allowOfflineMode)
        return .success(())
    }
    
    /// Submit a job
    public func submitJob(jobId: String) async -> SmileIDSharedResult<Void> {
        do {
            try SmileID.submitJob(jobId: jobId)
            return .success(())
        } catch {
            return .error(
                code: "SUBMIT_JOB_ERROR",
                message: "Failed to submit job: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    /// Get unsubmitted jobs
    public func getUnsubmittedJobs() -> SmileIDSharedResult<[String]> {
        do {
            let jobs = SmileID.getUnsubmittedJobs()
            return .success(jobs)
        } catch {
            return .error(
                code: "GET_UNSUBMITTED_JOBS_ERROR",
                message: "Failed to get unsubmitted jobs: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    /// Get submitted jobs
    public func getSubmittedJobs() -> SmileIDSharedResult<[String]> {
        do {
            let jobs = SmileID.getSubmittedJobs()
            return .success(jobs)
        } catch {
            return .error(
                code: "GET_SUBMITTED_JOBS_ERROR",
                message: "Failed to get submitted jobs: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    /// Cleanup a job
    public func cleanup(jobId: String) -> SmileIDSharedResult<Void> {
        do {
            try SmileID.cleanup(jobId: jobId)
            return .success(())
        } catch {
            return .error(
                code: "CLEANUP_ERROR",
                message: "Failed to cleanup job: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    // MARK: - API Operations
    
    public func authenticate(request: AuthenticationRequest) async -> SmileIDSharedResult<AuthenticationResponse> {
        do {
            let response = try await SmileID.api.authenticate(request: request)
            return .success(response)
        } catch {
            return .error(
                code: "AUTHENTICATION_ERROR",
                message: "Authentication failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func prepUpload(request: PrepUploadRequest) async -> SmileIDSharedResult<PrepUploadResponse> {
        do {
            let response = try await SmileID.api.prepUpload(request: request)
            return .success(response)
        } catch {
            return .error(
                code: "PREP_UPLOAD_ERROR",
                message: "Prep upload failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func upload(url: String, request: UploadRequest) async -> SmileIDSharedResult<Void> {
        do {
            guard let zipData = try? LocalStorage.toZip(uploadRequest: request) else {
                return .error(
                    code: "UPLOAD_ERROR",
                    message: "Unable to zip file",
                    cause: nil
                )
            }
            try await SmileID.api.upload(zip: zipData, to: url)
            return .success(())
        } catch {
            return .error(
                code: "UPLOAD_ERROR",
                message: "Upload failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func doEnhancedKyc(request: EnhancedKycRequest) async -> SmileIDSharedResult<EnhancedKycResponse> {
        do {
            let response = try await SmileID.api.doEnhancedKyc(request: request)
            return .success(response)
        } catch {
            return .error(
                code: "ENHANCED_KYC_ERROR",
                message: "Enhanced KYC failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func doEnhancedKycAsync(request: EnhancedKycRequest) async -> SmileIDSharedResult<EnhancedKycAsyncResponse> {
        do {
            let response = try await SmileID.api.doEnhancedKycAsync(request: request)
            return .success(response)
        } catch {
            return .error(
                code: "ENHANCED_KYC_ASYNC_ERROR",
                message: "Enhanced KYC Async failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func getSmartSelfieJobStatus(request: JobStatusRequest) async -> SmileIDSharedResult<SmartSelfieJobStatusResponse> {
        do {
            let response = try await SmileID.api.getJobStatus(request: request) as SmartSelfieJobStatusResponse
            return .success(response)
        } catch {
            return .error(
                code: "SMART_SELFIE_STATUS_ERROR",
                message: "Smart Selfie status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func getDocumentVerificationJobStatus(request: JobStatusRequest) async -> SmileIDSharedResult<DocumentVerificationJobStatusResponse> {
        do {
            let response = try await SmileID.api.getJobStatus(request: request) as DocumentVerificationJobStatusResponse
            return .success(response)
        } catch {
            return .error(
                code: "DOCUMENT_VERIFICATION_STATUS_ERROR",
                message: "Document verification status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func getBiometricKycJobStatus(request: JobStatusRequest) async -> SmileIDSharedResult<BiometricKycJobStatusResponse> {
        do {
            let response = try await SmileID.api.getJobStatus(request: request) as BiometricKycJobStatusResponse
            return .success(response)
        } catch {
            return .error(
                code: "BIOMETRIC_KYC_STATUS_ERROR",
                message: "Biometric KYC status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func getEnhancedDocumentVerificationJobStatus(request: JobStatusRequest) async -> SmileIDSharedResult<EnhancedDocumentVerificationJobStatusResponse> {
        do {
            let response = try await SmileID.api.getJobStatus(request: request) as EnhancedDocumentVerificationJobStatusResponse
            return .success(response)
        } catch {
            return .error(
                code: "ENHANCED_DOCUMENT_VERIFICATION_STATUS_ERROR",
                message: "Enhanced document verification status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func getProductsConfig(request: ProductsConfigRequest) async -> SmileIDSharedResult<ProductsConfigResponse> {
        do {
            let response = try await SmileID.api.getProductsConfig(request: request)
            return .success(response)
        } catch {
            return .error(
                code: "PRODUCTS_CONFIG_ERROR",
                message: "Products config failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func getValidDocuments(request: ProductsConfigRequest) async -> SmileIDSharedResult<ValidDocumentsResponse> {
        do {
            let response = try await SmileID.api.getValidDocuments(request: request)
            return .success(response)
        } catch {
            return .error(
                code: "VALID_DOCUMENTS_ERROR",
                message: "Valid documents failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func getServices() async -> SmileIDSharedResult<ServicesResponse> {
        do {
            let response = try await SmileID.api.getServices()
            return .success(response)
        } catch {
            return .error(
                code: "SERVICES_ERROR",
                message: "Get services failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    // MARK: - Polling Operations
    
    /// Generic polling function that matches Android implementation
    private func pollJobStatus<RequestType, ResponseType>(
        apiCall: @escaping (RequestType, TimeInterval, Int) async throws -> AsyncThrowingStream<ResponseType, Error>,
        request: RequestType,
        interval: Int64,
        numAttempts: Int64
    ) async throws -> ResponseType {
        // Convert milliseconds to TimeInterval (seconds)
        let intervalInSeconds = convertToTimeInterval(milliSeconds: interval)
        
        // Convert Int64 to Int for numAttempts
        let attempts = Int(numAttempts)
        
        let pollStream = try await apiCall(request, intervalInSeconds, attempts)
        var result: ResponseType?
        
        for try await res in pollStream {
            result = res
        }
        
        guard let finalResult = result else {
            throw NSError(domain: "SmileIDSharedCore", code: -1, userInfo: [NSLocalizedDescriptionKey: "Polling completed without a result"])
        }
        
        return finalResult
    }
    
    public func pollSmartSelfieJobStatus(
        request: JobStatusRequest,
        interval: Int64,
        numAttempts: Int64
    ) async -> SmileIDSharedResult<SmartSelfieJobStatusResponse> {
        do {
            let response = try await pollJobStatus(
                apiCall: SmileID.api.pollSmartSelfieJobStatus,
                request: request,
                interval: interval,
                numAttempts: numAttempts
            )
            return .success(response)
        } catch {
            return .error(
                code: "POLL_SMART_SELFIE_ERROR",
                message: "Poll Smart Selfie status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func pollDocumentVerificationJobStatus(
        request: JobStatusRequest,
        interval: Int64,
        numAttempts: Int64
    ) async -> SmileIDSharedResult<DocumentVerificationJobStatusResponse> {
        do {
            let response = try await pollJobStatus(
                apiCall: SmileID.api.pollDocumentVerificationJobStatus,
                request: request,
                interval: interval,
                numAttempts: numAttempts
            )
            return .success(response)
        } catch {
            return .error(
                code: "POLL_DOCUMENT_VERIFICATION_ERROR",
                message: "Poll Document Verification status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func pollBiometricKycJobStatus(
        request: JobStatusRequest,
        interval: Int64,
        numAttempts: Int64
    ) async -> SmileIDSharedResult<BiometricKycJobStatusResponse> {
        do {
            let response = try await pollJobStatus(
                apiCall: SmileID.api.pollBiometricKycJobStatus,
                request: request,
                interval: interval,
                numAttempts: numAttempts
            )
            return .success(response)
        } catch {
            return .error(
                code: "POLL_BIOMETRIC_KYC_ERROR",
                message: "Poll Biometric KYC status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    public func pollEnhancedDocumentVerificationJobStatus(
        request: JobStatusRequest,
        interval: Int64,
        numAttempts: Int64
    ) async -> SmileIDSharedResult<EnhancedDocumentVerificationJobStatusResponse> {
        do {
            let response = try await pollJobStatus(
                apiCall: SmileID.api.pollEnhancedDocumentVerificationJobStatus,
                request: request,
                interval: interval,
                numAttempts: numAttempts
            )
            return .success(response)
        } catch {
            return .error(
                code: "POLL_ENHANCED_DOCUMENT_VERIFICATION_ERROR",
                message: "Poll Enhanced Document Verification status failed: \(error.localizedDescription)",
                cause: error
            )
        }
    }
    
    // MARK: - Helper Methods
    
    /// Convert milliseconds to TimeInterval
    public func convertToTimeInterval(milliSeconds: Int64) -> TimeInterval {
        let seconds = milliSeconds / 1000
        return TimeInterval(seconds)
    }
    
    // MARK: - JSON Serialization
    
    /// Shared JSON serialization function
    public func toJson<T: Encodable>(_ object: T) throws -> String {
        let encoder = JSONEncoder()
        let jsonData = try encoder.encode(object)
        guard let jsonString = String(data: jsonData, encoding: .utf8) else {
            throw SmileIDError.unknown("Failed to convert JSON data to string")
        }
        return jsonString
    }
    
    /// Convert Encodable object to Dictionary
    public func toDictionary<T: Encodable>(_ object: T) throws -> [String: Any] {
        let encoder = JSONEncoder()
        let jsonData = try encoder.encode(object)
        guard let dictionary = try JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: Any] else {
            throw SmileIDError.unknown("Failed to convert object to dictionary")
        }
        return dictionary
    }
}

// MARK: - Helper Extensions

extension SmileIDSharedCore.SmileIDSharedResult {
    /// Unwrap the result or throw an error
    public func unwrap() throws -> T {
        switch self {
        case .success(let data):
            return data
        case .error(_, let message, let cause):
            throw cause ?? SmileIDError.unknown(message)
        case .withError(let cause):
            throw cause
        }
    }
    
    /// Convert to a dictionary representation for React Native/Expo
    public func toDictionary() -> [String: Any] {
        switch self {
        case .success(let data):
            if let voidData = data as? Void {
                return ["success": true]
            } else if let encodableData = data as? Encodable {
                do {
                    return try SmileIDSharedCore.shared.toDictionary(encodableData)
                } catch {
                    return ["success": false, "error": error.localizedDescription]
                }
            } else {
                return ["success": true, "data": "\(data)"]
            }
        case .error(let code, let message, let cause):
            return [
                "success": false,
                "code": code,
                "message": message,
                "error": cause?.localizedDescription ?? message
            ]
        case .withError(let cause):
            return [
                "success": false,
                "error": cause.localizedDescription
            ]
        }
    }
}

// MARK: - React Native Promise Helper

public extension SmileIDSharedCore {
    /// Helper method to resolve React Native promises
    func resolvePromise<T: Encodable>(
        _ result: SmileIDSharedResult<T>,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        switch result {
        case .success(let data):
            if data is Void {
                resolve(nil)
            } else {
                do {
                    let jsonString = try toJson(data)
                    resolve(jsonString)
                } catch {
                    reject("ENCODING_ERROR", "Failed to encode response", error)
                }
            }
        case .error(let code, let message, let cause):
            reject(code, message, cause)
        case .withError(let cause):
            reject("ERROR", cause.localizedDescription, cause)
        }
    }
}

// MARK: - Consent Information Helper

public extension SmileIDSharedCore {
    func getCurrentIsoTimestamp() -> String {
        let formatter = ISO8601DateFormatter()
        return formatter.string(from: Date())
    }
    
    func createDefaultConsentInfo() -> ConsentInformation {
        return ConsentInformation(
            consented: ConsentedInformation(
                consentGrantedDate: getCurrentIsoTimestamp(),
                personalDetails: false,
                contactInformation: false,
                documentInformation: false
            )
        )
    }
}
