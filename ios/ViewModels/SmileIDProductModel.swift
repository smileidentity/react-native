import Foundation
import Combine
import SmileID

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
    @Published var extraPartnerParams: NSDictionary = [:]
    @Published var delegate: (any RNSmileIDDelegate)?
    @Published var countryCode: String?
    @Published var documentType: String?
    @Published var captureBothSides: Bool = false
    @Published var allowGalleryUpload: Bool = false
    @Published var idInfo: IdInfo?
}
