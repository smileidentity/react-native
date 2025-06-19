//
//  SmileIDSmartSelfieAuthView.swift
//  SmileIDShared
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID
import SwiftUI

/// Shared SmartSelfieAuthentication view that uses SmileIDViewConfig
@available(iOS 13.0, *)
public struct SmileIDSmartSelfieAuthView: View {
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
            if !config.validateSelfieProperties() {
                // Return error immediately if validation fails
                Text("")
                    .onAppear {
                        let error = NSError(
                            domain: "SmileIDSmartSelfieAuthView",
                            code: -1,
                            userInfo: [NSLocalizedDescriptionKey: "Required properties for SmartSelfieAuthentication are missing"]
                        )
                        onResult(.withError(cause: error))
                    }
            } else {
                // Configuration is valid, show the SmartSelfieAuthentication screen
                SmartSelfieAuthContent(
                    config: config,
                    onResult: onResult
                )
            }
        }
    }
}

@available(iOS 13.0, *)
private struct SmartSelfieAuthContent: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        SmileID.smartSelfieAuthenticationScreen(
            userId: config.userId ?? SmileID.randomUserId(),
            jobId: config.jobId ?? SmileID.randomJobId(),
            allowNewEnroll: config.allowNewEnroll,
            allowAgentMode: config.allowAgentMode,
            showAttribution: config.showAttribution,
            showInstructions: config.showInstructions,
            skipApiSubmission: config.skipApiSubmission,
            extraPartnerParams: config.extraPartnerParams,
            delegate: SmartSelfieResultHandler(onResult: onResult)
        )
    }
}

/// Result handler that converts SDK results to shared results
private class SmartSelfieResultHandler: SmartSelfieResultDelegate {
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    init(onResult: @escaping (SmileIDSharedResult<Any>) -> Void) {
        self.onResult = onResult
    }
    
    func didSucceed(selfieImage: URL, livenessImages: [URL], didSubmitSmartSelfieJob: Bool) {
        let result: [String: Any] = [
            "selfieFile": selfieImage.path,
            "livenessFiles": livenessImages.map { $0.path },
            "didSubmitSmartSelfieJob": didSubmitSmartSelfieJob
        ]
        onResult(.success(result))
    }
    
    func didError(error: Error) {
        onResult(.withError(cause: error))
    }
}