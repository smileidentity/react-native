import Foundation
import Combine
import SmileID

//
class SmileIDProductModel: ObservableObject {
    @Published var userId: String?
    @Published var jobId: String?
    @Published var partnerIcon: String?
    @Published var partnerName: String?
    @Published var productName: String?
    @Published var partnerPrivacyPolicy: String?
    @Published var allowAgentMode: Bool = false
    @Published var showAttribution: Bool = true
    @Published var showInstructions: Bool = true
    @Published var extraPartnerParams: [String: String] = [:]
    @Published var idAspectRatio: Double?
    @Published var countryCode: String?
    @Published var documentType: String?
    @Published var captureBothSides: Bool = false
    @Published var allowGalleryUpload: Bool = false
    @Published var idInfo: IdInfo?
    @Published var bypassSelfieCaptureWithFilePath: String?
    
    var computedBypassSelfieCaptureWithFile: URL? {
        get {
            guard let filePath = bypassSelfieCaptureWithFilePath else { return nil }
            return URL(fileURLWithPath: filePath)
        }
        set {
            bypassSelfieCaptureWithFilePath = newValue?.path
        }
    }
}
