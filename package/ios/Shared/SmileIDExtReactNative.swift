//
//  SmileIDExtReactNative.swift
//  SmileIDShared
//
//  Extension methods for React Native integration
//

import Foundation
import SmileID
import SwiftUI

extension SmileID {
    
    /**
     * Builds SmartSelfieAuthentication with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNSmartSelfieAuthentication(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateSelfieProperties() else {
            fatalError("SmartSelfieAuthentication requires userId")
        }
        
        let view = SmileIDSmartSelfieAuthenticationView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds SmartSelfieEnrollment with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNSmartSelfieEnrollment(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateSelfieProperties() else {
            fatalError("SmartSelfieEnrollment requires userId")
        }
        
        let view = SmileIDSmartSelfieEnrollmentView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds SmartSelfieAuthenticationEnhanced with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNSmartSelfieAuthenticationEnhanced(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateSelfieProperties() else {
            fatalError("SmartSelfieAuthenticationEnhanced requires userId")
        }
        
        let view = SmileIDSmartSelfieAuthenticationEnhancedView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds SmartSelfieEnrollmentEnhanced with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNSmartSelfieEnrollmentEnhanced(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateSelfieProperties() else {
            fatalError("SmartSelfieEnrollmentEnhanced requires userId")
        }
        
        let view = SmileIDSmartSelfieEnrollmentEnhancedView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds BiometricKYC with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNBiometricKYC(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateBiometricKYCProperties() else {
            fatalError("BiometricKYC requires userId and idInfo")
        }
        
        let view = SmileIDBiometricKYCView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds DocumentCapture with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNDocumentCapture(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateDocumentProperties() else {
            fatalError("DocumentCapture requires countryCode")
        }
        
        let view = SmileIDDocumentCaptureView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds DocumentVerification with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNDocumentVerification(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateDocumentProperties() else {
            fatalError("DocumentVerification requires countryCode")
        }
        
        let view = SmileIDDocumentVerificationView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds EnhancedDocumentVerification with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNEnhancedDocumentVerification(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateEnhancedDocumentProperties() else {
            fatalError("EnhancedDocumentVerification requires countryCode and consentInformation")
        }
        
        let view = SmileIDEnhancedDocumentVerificationView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds SmartSelfieCapture with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNSmartSelfieCapture(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateSelfieProperties() else {
            fatalError("SmartSelfieCapture requires userId")
        }
        
        let view = SmileIDSmartSelfieCaptureView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    /**
     * Builds Consent with shared configuration
     */
    @available(iOS 13.0, *)
    public class func RNConsent(
        config: SmileIDViewConfig,
        onResult: @escaping (SmileIDSharedResult<Any>) -> Void
    ) -> UIView {
        let finalConfig = config.ensureIds()
        guard finalConfig.validateConsentProperties() else {
            fatalError("Consent requires consentInformation")
        }
        
        let view = SmileIDConsentView(config: finalConfig, onResult: onResult)
        return createUIView(from: view)
    }
    
    // MARK: - Helper Methods
    
    /**
     * Creates a UIView from a SwiftUI View
     */
    @available(iOS 13.0, *)
    private class func createUIView<Content: View>(from swiftUIView: Content) -> UIView {
        let hostingController = UIHostingController(rootView: swiftUIView)
        hostingController.view.backgroundColor = .clear
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        
        let containerView = UIView()
        containerView.backgroundColor = .clear
        containerView.addSubview(hostingController.view)
        
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: containerView.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: containerView.bottomAnchor)
        ])
        
        // Store reference to prevent deallocation
        objc_setAssociatedObject(
            containerView,
            "hostingController",
            hostingController,
            .OBJC_ASSOCIATION_RETAIN_NONATOMIC
        )
        
        return containerView
    }
}

// MARK: - SmileIDViewConfig Extension

extension SmileIDViewConfig {
    /**
     * Ensures the config has userId and jobId populated
     */
    func ensureIds() -> SmileIDViewConfig {
        var config = self
        
        if config.userId == nil || config.userId?.isEmpty == true {
            config.userId = SmileID.randomUserId()
        }
        
        if config.jobId == nil || config.jobId?.isEmpty == true {
            config.jobId = SmileID.randomJobId()
        }
        
        return config
    }
}
