//
//  SmileIDSmartSelfieCaptureView.swift
//  SmileIDShared
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID
import SwiftUI

/// Shared SmartSelfieCapture view that uses SmileIDViewConfig
/// This view handles both strict mode and regular mode, similar to Android
@available(iOS 13.0, *)
public struct SmileIDSmartSelfieCaptureView: View {
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
            if config.useStrictMode {
                // Use enhanced mode for strict mode
                SmartSelfieEnrollmentEnhancedForCapture(
                    config: config,
                    onResult: onResult
                )
            } else {
                // Use regular capture mode
                SmartSelfieCaptureContent(
                    config: config,
                    onResult: onResult
                )
            }
        }
    }
}

/// Enhanced mode wrapper for strict mode
@available(iOS 13.0, *)
private struct SmartSelfieEnrollmentEnhancedForCapture: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        SmileID.smartSelfieEnrollmentScreenEnhanced(
            userId: config.userId ?? SmileID.randomUserId(),
            showAttribution: config.showAttribution,
            showInstructions: config.showInstructions,
            skipApiSubmission: true,  // Always skip API submission for capture
            extraPartnerParams: config.extraPartnerParams,
            delegate: SmartSelfieResultHandler(onResult: onResult)
        )
    }
}

/// Regular capture mode content
@available(iOS 13.0, *)
private struct SmartSelfieCaptureContent: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    @StateObject private var viewModel = SelfieViewModel(
        isEnroll: false,
        userId: "",
        jobId: "",
        allowNewEnroll: false,
        skipApiSubmission: true,
        metadata: []
    )
    
    @State private var acknowledgedInstructions = false
    
    var body: some View {
        Group {
            if config.showInstructions && !acknowledgedInstructions {
                SmartSelfieInstructionsScreen(
                    showAttribution: config.showAttribution,
                    onInstructionsAcknowledged: {
                        acknowledgedInstructions = true
                    }
                )
            } else if viewModel.processingState != nil {
                // Processing state - handle completion
                Color.clear
                    .onAppear {
                        handleProcessingState()
                    }
            } else if let selfieToConfirm = viewModel.selfieToConfirm {
                // Confirmation state
                if config.showConfirmation {
                    ImageCaptureConfirmationDialog(
                        title: SmileIDResourcesHelper.localizedString(for: "Confirmation.GoodSelfie"),
                        subtitle: SmileIDResourcesHelper.localizedString(for: "Confirmation.OutOf"),
                        image: selfieToConfirm,
                        confirmationButtonText: SmileIDResourcesHelper.localizedString(for: "Confirmation.ContinueButton"),
                        onConfirm: {
                            viewModel.submitJob()
                        },
                        retakeButtonText: SmileIDResourcesHelper.localizedString(for: "Confirmation.RetakeButton"),
                        onRetake: viewModel.onSelfieRejected,
                        scaleFactor: 1.25
                    )
                } else {
                    // Auto-confirm if confirmation is disabled
                    Color.clear
                        .onAppear {
                            viewModel.submitJob()
                        }
                }
            } else {
                // Capture screen
                SelfieCaptureScreen(
                    userId: config.userId ?? SmileID.randomUserId(),
                    jobId: config.jobId ?? SmileID.randomJobId(),
                    isEnroll: false,
                    allowAgentMode: config.allowAgentMode,
                    allowNewEnroll: false,
                    skipApiSubmission: true,
                    viewModel: viewModel
                )
            }
        }
        .onAppear {
            setupViewModel()
        }
    }
    
    private func setupViewModel() {
        viewModel.userId = config.userId ?? SmileID.randomUserId()
        viewModel.jobId = config.jobId ?? SmileID.randomJobId()
    }
    
    private func handleProcessingState() {
        viewModel.onFinished { result in
            switch result {
            case .success(let data):
                onResult(.success(data))
            case .error(let error):
                onResult(.withError(cause: error))
            }
        }
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