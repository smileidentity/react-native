import Combine
import Foundation
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
    @Published var bypassSelfieCaptureWithFilePath: URL?
    @Published var onResult: RCTDirectEventBlock?
}
