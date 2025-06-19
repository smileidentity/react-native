//
//  SmileIDEnhancedDocumentVerificationView.swift
//  SmileIDShared
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID
import SwiftUI

/// Shared EnhancedDocumentVerification view that uses SmileIDViewConfig
@available(iOS 13.0, *)
public struct SmileIDEnhancedDocumentVerificationView: View {
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
            if !config.validateEnhancedDocumentProperties() {
                // Return error immediately if validation fails
                Text("")
                    .onAppear {
                        let error = NSError(
                            domain: "SmileIDEnhancedDocumentVerificationView",
                            code: -1,
                            userInfo: [NSLocalizedDescriptionKey: "Required properties for EnhancedDocumentVerification are missing"]
                        )
                        onResult(.withError(cause: error))
                    }
            } else {
                // Configuration is valid, show the EnhancedDocumentVerification screen
                EnhancedDocumentVerificationContent(
                    config: config,
                    onResult: onResult
                )
            }
        }
    }
}

@available(iOS 13.0, *)
private struct EnhancedDocumentVerificationContent: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        SmileID.enhancedDocumentVerificationScreen(
            countryCode: config.countryCode!,
            documentType: config.documentType,
            userId: config.userId ?? SmileID.randomUserId(),
            jobId: config.jobId ?? SmileID.randomJobId(),
            allowNewEnroll: config.allowNewEnroll,
            allowAgentMode: config.allowAgentMode,
            showAttribution: config.showAttribution,
            allowGallerySelection: config.allowGalleryUpload,
            showInstructions: config.showInstructions,
            idAspectRatio: config.idAspectRatio,
            captureBothSides: config.captureBothSides,
            skipApiSubmission: config.skipApiSubmission,
            useStrictMode: config.useStrictMode,
            extraPartnerParams: config.extraPartnerParams,
            consentInformation: config.consentInformation!,
            delegate: EnhancedDocumentVerificationResultHandler(onResult: onResult)
        )
    }
}

/// Result handler that converts SDK results to shared results
private class EnhancedDocumentVerificationResultHandler: EnhancedDocumentVerificationResultDelegate {
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    init(onResult: @escaping (SmileIDSharedResult<Any>) -> Void) {
        self.onResult = onResult
    }
    
    func didSucceed(selfieImage: URL, documentFrontImage: URL, documentBackImage: URL?, didSubmitEnhancedDocVJob: Bool) {
        let result: [String: Any] = [
            "selfieFile": selfieImage.path,
            "documentFrontFile": documentFrontImage.path,
            "documentBackFile": documentBackImage?.path as Any,
            "didSubmitEnhancedDocVJob": didSubmitEnhancedDocVJob
        ]
        onResult(.success(result))
    }
    
    func didError(error: Error) {
        onResult(.withError(cause: error))
    }
}