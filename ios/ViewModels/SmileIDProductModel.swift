//
//  SmileIDProductModel.swift
//  react-native-smile-id
//
//  Created by Japhet Ndhlovu on 2023/11/30.
//

import Foundation
import Combine

class SmileIDProductModel: ObservableObject {
    @Published var userId: String?
    @Published var jobId: String?
    @Published var allowAgentMode: Bool = false
    @Published var showAttribution: Bool = true
    @Published var showInstructions: Bool = true
    @Published var extraPartnerParams: NSDictionary = [:]
    @Published var delegate: RNSmileIDDelegate?
}
