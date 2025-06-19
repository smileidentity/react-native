//
//  SmileIDDocumentVerificationView.swift
//  SmileIDShared
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID
import SwiftUI

/// Shared DocumentVerification view that uses SmileIDViewConfig
@available(iOS 13.0, *)
public struct SmileIDDocumentVerificationView: View {
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
            if !config.validateDocumentProperties() {
                // Return error immediately if validation fails
                Text("")
                    .onAppear {
                        let error = NSError(
                            domain: "SmileIDDocumentVerificationView",
                            code: -1,
                            userInfo: [NSLocalizedDescriptionKey: "Required properties for DocumentVerification are missing"]
                        )
                        onResult(.withError(cause: error))
                    }
            } else {
                // Configuration is valid, show the DocumentVerification screen
                DocumentVerificationContent(
                    config: config,
                    onResult: onResult
                )
            }
        }
    }
}

@available(iOS 13.0, *)
private struct DocumentVerificationContent: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        SmileID.documentVerificationScreen(
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
            delegate: DocumentVerificationResultHandler(onResult: onResult)
        )
    }
}

/// Result handler that converts SDK results to shared results
private class DocumentVerificationResultHandler: DocumentVerificationResultDelegate {
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    init(onResult: @escaping (SmileIDSharedResult<Any>) -> Void) {
        self.onResult = onResult
    }
    
    func didSucceed(selfieImage: URL, documentFrontImage: URL, documentBackImage: URL?, didSubmitDocumentVerificationJob: Bool) {
        let result: [String: Any] = [
            "selfieFile": selfieImage.path,
            "documentFrontFile": documentFrontImage.path,
            "documentBackFile": documentBackImage?.path as Any,
            "didSubmitDocumentVerificationJob": didSubmitDocumentVerificationJob
        ]
        onResult(.success(result))
    }
    
    func didError(error: Error) {
        onResult(.withError(cause: error))
    }
}
