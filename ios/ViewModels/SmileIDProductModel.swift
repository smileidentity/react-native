import Foundation
import Combine

class SmileIDProductModel: ObservableObject {
    @Published var userId: String?
    @Published var jobId: String?
    @Published var allowAgentMode: Bool = false
    @Published var showAttribution: Bool = true
    @Published var showInstructions: Bool = true
    @Published var extraPartnerParams: NSDictionary = [:]
    @Published var delegate: (any RNSmileIDDelegate)?
}
