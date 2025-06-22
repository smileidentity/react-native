//
//  SmileIDDocumentCaptureView.swift
//  SmileIDShared
//
//  Created by Japhet Ndhlovu on 6/19/25.
//

import Foundation
import SmileID
import SwiftUI

/// Shared DocumentCapture view that uses SmileIDViewConfig
@available(iOS 13.0, *)
public struct SmileIDDocumentCaptureView: View {
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
        DocumentCaptureContent(
            config: config,
            onResult: onResult
        )
    }
}

@available(iOS 13.0, *)
private struct DocumentCaptureContent: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        SmileID.documentCaptureScreen(
            side: config.isDocumentFrontSide ? .front : .back,
            showAttribution: config.showAttribution,
            allowGallerySelection: config.allowGalleryUpload,
            showSkipButton: false,
            instructionsHeroImage: config.isDocumentFrontSide ? "si_hero_image_front" : "si_hero_image_back",
            delegate: DocumentCaptureResultHandler(onResult: onResult)
        )
    }
}

/// Result handler that converts SDK results to shared results
private class DocumentCaptureResultHandler: DocumentCaptureResultDelegate {
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    init(onResult: @escaping (SmileIDSharedResult<Any>) -> Void) {
        self.onResult = onResult
    }
    
    func didCaptureDocumentImage(documentImage: URL, imageType: ImageType) {
        let result: [String: Any] = [
            "documentFile": documentImage.path,
            "documentType": imageType == .documentFront ? "FRONT" : "BACK"
        ]
        onResult(.success(result))
    }
    
    func didError(error: Error) {
        onResult(.withError(cause: error))
    }
}