import Combine
import Foundation
import SmileID

//We're making this a central place to observe
//changes published after props have been updated
//from react native side the main thing being that
//when views are instantiated we don't have all the props
//also state could change
class SmileIDProductModel: ObservableObject {
    @Published var userId: String?
    @Published var jobId: String?
    @Published var partnerIcon: String?
    @Published var partnerName: String?
    @Published var productName: String?
    @Published var partnerPrivacyPolicy: String?
    @Published var allowAgentMode: Bool = false
    @Published var allowNewEnroll: Bool = false
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
