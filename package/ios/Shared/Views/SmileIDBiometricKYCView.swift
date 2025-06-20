//
//  SmileIDBiometricKYCView.swift
//  SmileIDShared
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID
import SwiftUI

/// Type alias for cleaner code
public typealias SmileIDSharedResult = SmileIDSharedCore.SmileIDSharedResult

/// Shared BiometricKYC view that uses SmileIDViewConfig
/// This follows the same pattern as the Android implementation
@available(iOS 13.0, *)
public struct SmileIDBiometricKYCView: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    public init(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) {
        self.config = config
        self.onResult = onResult
    }
    
    public var body: some View {
        Group {
            // Use SmileIDViewConfig's built-in validation
            if !config.validateBiometricKYCProperties() {
                // Return error immediately if validation fails
                Text("")
                    .onAppear {
                        let error = NSError(
                            domain: "SmileIDBiometricKYCView",
                            code: -1,
                            userInfo: [NSLocalizedDescriptionKey: "Required properties for BiometricKYC are missing"]
                        )
                        onResult(.withError(cause: error))
                    }
            } else {
                // Configuration is valid, show the BiometricKYC screen
                BiometricKYCContent(
                    config: config,
                    onResult: onResult
                )
            }
        }
    }
}

@available(iOS 13.0, *)
private struct BiometricKYCContent: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        SmileID.biometricKycScreen(
            idInfo: config.idInfo!,
            userId: config.userId ?? SmileID.randomUserId(),
            jobId: config.jobId ?? SmileID.randomJobId(),
            allowNewEnroll: config.allowNewEnroll,
            allowAgentMode: config.allowAgentMode,
            showAttribution: config.showAttribution,
            showInstructions: config.showInstructions,
            useStrictMode: config.useStrictMode,
            extraPartnerParams: config.extraPartnerParams,
            consentInformation: config.consentInformation!,
            delegate: BiometricKycResultHandler(onResult: onResult)
        )
    }
}

/// Result handler that converts SDK results to shared results
private class BiometricKycResultHandler: BiometricKycResultDelegate {
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    init(onResult: @escaping (SmileIDSharedResult<Any>) -> Void) {
        self.onResult = onResult
    }
    
    func didSucceed(selfieImage: URL, livenessImages: [URL], didSubmitBiometricJob: Bool) {
        let result: [String: Any] = [
            "selfieFile": selfieImage.path,
            "livenessFiles": livenessImages.map { $0.path },
            "didSubmitBiometricKycJob": didSubmitBiometricJob
        ]
        
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: result, options: .prettyPrinted)
            if let jsonString = String(data: jsonData, encoding: .utf8) {
                onResult(.success(jsonString))
            } else {
                onResult(.error(
                    code: "ENCODING_ERROR",
                    message: "Failed to encode result to JSON string",
                    cause: nil
                ))
            }
        } catch {
            onResult(.error(
                code: "ENCODING_ERROR",
                message: "Failed to encode result: \(error.localizedDescription)",
                cause: error
            ))
        }
    }
    
    func didError(error: Error) {
        onResult(.withError(cause: error))
    }
}

