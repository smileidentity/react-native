//
//  SmileIDConsentView.swift
//  SmileIDShared
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID
import SwiftUI

/// Shared Consent view that uses SmileIDViewConfig
@available(iOS 13.0, *)
public struct SmileIDConsentView: View {
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
            if !config.validateConsentProperties() {
                // Return error immediately if validation fails
                Text("")
                    .onAppear {
                        let error = NSError(
                            domain: "SmileIDConsentView",
                            code: -1,
                            userInfo: [NSLocalizedDescriptionKey: "Required properties for Consent are missing"]
                        )
                        onResult(.withError(cause: error))
                    }
            } else {
                // Configuration is valid, show the Consent screen
                ConsentContent(
                    config: config,
                    onResult: onResult
                )
            }
        }
    }
}

@available(iOS 13.0, *)
private struct ConsentContent: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        SmileID.consentScreen(
            partnerIcon: config.logoResName!,
            partnerName: config.partnerName!,
            productName: config.productName!,
            partnerPrivacyPolicy: URL(string: config.partnerPrivacyPolicy!)!,
            showAttribution: config.showAttribution,
            delegate: ConsentResultHandler(onResult: onResult)
        )
    }
}

/// Result handler that converts SDK results to shared results
private class ConsentResultHandler: ConsentDelegate {
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    init(onResult: @escaping (SmileIDSharedResult<Any>) -> Void) {
        self.onResult = onResult
    }
    
    func didGrantConsent() {
        onResult(.success(true))
    }
    
    func didDenyConsent() {
        onResult(.success(false))
    }
    
    func didError(error: Error) {
        onResult(.withError(cause: error))
    }
}