import Combine
import SmileID

@objc(RNSmileID)
class RNSmileID: NSObject {
    private var cancellables = Set<AnyCancellable>()

    @objc(initialize:withResolver:withRejecter:)
    func initialize(useSandBox: Bool, resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
        SmileID.initialize(useSandbox: useSandBox)
        resolve(nil)
    }

    @objc(doEnhancedKyc:withResolver:withRejecter:)
    func doEnhancedKyc(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let partnerParamsDict = request["partnerParams"] as? NSDictionary else {
            reject("doEnhancedKyc", "partnerParams is required", nil)
            return
        }
        guard let partnerParams = partnerParamsDict.toPartnerParams() else {
            reject("doEnhancedKyc", "partnerParams is missing required data", nil)
            return
        }
        guard let country = request["country"] as? String else {
            reject("doEnhancedKyc", "country is required", nil)
            return
        }
        guard let idType = request["idType"] as? String else {
            reject("doEnhancedKyc", "idType is required", nil)
            return
        }
        guard let idNumber = request["idNumber"] as? String else {
            reject("doEnhancedKyc", "idNumber is required", nil)
            return
        }
        guard let timestamp = request["timestamp"] as? String else {
            reject("doEnhancedKyc", "timestamp is required", nil)
            return
        }
        guard let signature = request["signature"] as? String else {
            reject("doEnhancedKyc", "signature is required", nil)
            return
        }

        let request = EnhancedKycRequest(
            country: country,
            idType: idType,
            idNumber: idNumber,
            firstName: request["firstName"] as? String,
            middleName: request["middleName"] as? String,
            lastName: request["lastName"] as? String,
            dob: request["dob"] as? String,
            phoneNumber: request["phoneNumber"] as? String,
            bankCode: request["bankCode"] as? String,
            callbackUrl: request["callbackUrl"] as? String,
            partnerParams: partnerParams,
            sourceSdk: "ios (react-native)",
            timestamp: timestamp,
            signature: signature
        )

        SmileID.api.doEnhancedKyc(request: request)
            .sink(receiveCompletion: { completion in
                switch completion {
                case let .failure(error):
                    reject("Error", error.localizedDescription, error)
                case .finished:
                    break
                }
            }, receiveValue: { response in
                let encoder = JSONEncoder()
                guard let jsonData = try? encoder.encode(response) else {
                    reject("Error", "doEnhancedKyc encoding error ",
                           SmileIDError.unknown("doEnhancedKyc encoding error "))
                    return
                }
                resolve(["result": String(data: jsonData, encoding: .utf8)!]) // Assuming you have a method to convert response to a dictionary
            }).store(in: &cancellables)
    }

    @objc(doEnhancedKycAsync:withResolver:withRejecter:)
    func doEnhancedKycAsync(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let partnerParamsDict = request["partnerParams"] as? NSDictionary else {
            reject("doEnhancedKyc", "partnerParams is required", nil)
            return
        }
        guard let partnerParams = partnerParamsDict.toPartnerParams() else {
            reject("doEnhancedKyc", "partnerParams is missing required data", nil)
            return
        }
        guard let country = request["country"] as? String else {
            reject("doEnhancedKyc", "country is required", nil)
            return
        }
        guard let idType = request["idType"] as? String else {
            reject("doEnhancedKyc", "idType is required", nil)
            return
        }
        guard let idNumber = request["idNumber"] as? String else {
            reject("doEnhancedKyc", "idNumber is required", nil)
            return
        }
        guard let timestamp = request["timestamp"] as? String else {
            reject("doEnhancedKyc", "timestamp is required", nil)
            return
        }
        guard let signature = request["signature"] as? String else {
            reject("doEnhancedKyc", "signature is required", nil)
            return
        }

        let request = EnhancedKycRequest(
            country: country,
            idType: idType,
            idNumber: idNumber,
            firstName: request["firstName"] as? String,
            middleName: request["middleName"] as? String,
            lastName: request["lastName"] as? String,
            dob: request["dob"] as? String,
            phoneNumber: request["phoneNumber"] as? String,
            bankCode: request["bankCode"] as? String,
            callbackUrl: request["callbackUrl"] as? String,
            partnerParams: partnerParams,
            sourceSdk: "ios (react-native)",
            timestamp: timestamp,
            signature: signature
        )

        SmileID.api.doEnhancedKycAsync(request: request)
            .sink(receiveCompletion: { completion in
                switch completion {
                case let .failure(error):
                    reject("Error", error.localizedDescription, error)
                case .finished:
                    break
                }
            }, receiveValue: { response in
                let encoder = JSONEncoder()
                guard let jsonData = try? encoder.encode(response) else {
                    reject("Error", "doEnhancedKyc encoding error ",
                           SmileIDError.unknown("doEnhancedKyc encoding error "))
                    return
                }
                resolve(["result": String(data: jsonData, encoding: .utf8)!]) // Assuming you have a method to convert response to a dictionary
            }).store(in: &cancellables)
    }
}
