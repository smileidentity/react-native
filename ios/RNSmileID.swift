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

    @objc(authenticate:withResolver:withRejecter:)
    func authenticate(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let authenticationRequest = request.toAuthenticationRequest() else {
            reject("Error", "Invalid request data", nil)
            return
        }

        SmileID.api.authenticate(request: authenticationRequest)
            .sink(receiveCompletion: { completion in
                self.handleCompletion(completion, reject: reject)
            }, receiveValue: { response in
                self.resolveResponse(response, resolve: resolve, reject: reject)
            }).store(in: &cancellables)
    }

    @objc(prepUpload:withResolver:withRejecter:)
    func prepUpload(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let prepUploadRequest = request.toPrepUploadRequest() else {
            reject("Error", "Invalid prep upload request", nil)
            return
        }

        SmileID.api.prepUpload(request: prepUploadRequest)
            .sink(
                receiveCompletion: { completion in self.handleCompletion(completion, reject: reject) },
                receiveValue: { response in self.resolveResponse(response, resolve: resolve, reject: reject)
            }).store(in: &cancellables)
    }

    @objc(upload:request:withResolver:withRejecter:)
    func upload(url: String, request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let uploadRequest = request.toUploadRequest() else {
            reject("Error", "Invalid upload request", nil)
            return
        }

        SmileID.api.upload(zip: toZip(uploadRequest: uploadRequest), to: url)
            .sink(receiveCompletion: { completion in handleCompletion(completion, reject: reject) },
                  receiveValue: { _ in resolve(nil) }) // Assuming no response to return
            .store(in: &cancellables)
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

    @objc(getSmartSelfieJobStatus:withResolver:withRejecter:)
    func getSmartSelfieJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        getJobStatus(request: request, resolve: resolve, reject: reject)
    }

    @objc(getDocumentVerificationJobStatus:withResolver:withRejecter:)
    func getDocumentVerificationJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        getJobStatus(request: request, resolve: resolve, reject: reject)
    }

    @objc(getBiometricKycJobStatus:withResolver:withRejecter:)
    func getBiometricKycJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        getJobStatus(request: request, resolve: resolve, reject: reject)
    }

    @objc(getEnhancedDocumentVerificationJobStatus:withResolver:withRejecter:)
    func getEnhancedDocumentVerificationJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        getJobStatus(request: request, resolve: resolve, reject: reject)
    }

    @objc(getProductsConfig:withResolver:withRejecter:)
    func getProductsConfig(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let productsConfigRequest = request.toProductsConfigRequest() else {
            reject("Error", "Invalid products config request", nil)
            return
        }

        SmileID.api.getProductsConfig(request: productsConfigRequest)
            .sink(
                receiveCompletion: { completion in self.handleCompletion(completion, reject: reject) },
                receiveValue: { response in self.resolveResponse(response, resolve: resolve, reject: reject)
            }).store(in: &cancellables)
    }

    @objc(getValidDocuments:withResolver:withRejecter:)
    func getValidDocuments(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let validDocumentsRequest = request.toProductsConfigRequest() else {
            reject("Error", "Invalid valid documents request", nil)
            return
        }

        SmileID.api.getValidDocuments(request: validDocumentsRequest)
            .sink(receiveCompletion: { completion in self.handleCompletion(completion, reject: reject) },
                  receiveValue: { response in self.resolveResponse(response, resolve: resolve, reject: reject) })
            .store(in: &cancellables)
    }

    @objc(getServicesWithResolver:withRejecter:)
    func getServices(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        SmileID.api.getServices()
            .sink(receiveCompletion: { completion in self.handleCompletion(completion, reject: reject) },
                  receiveValue: { response in self.resolveResponse(response, resolve: resolve, reject: reject) })
            .store(in: &cancellables)
    }

    private func getJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let jobStatusRequest = request.toJobStatusRequest() else {
            reject("Error", "Invalid job status request", nil)
            return
        }

        SmileID.api.getJobStatus(request: jobStatusRequest)
            .sink(receiveCompletion: { completion in self.handleCompletion(completion, reject: reject) },
                  receiveValue: { response in self.resolveResponse(response, resolve: resolve, reject: reject) })
            .store(in: &cancellables)
    }

    private func handleCompletion(_ completion: Subscribers.Completion<Error>, reject: @escaping RCTPromiseRejectBlock) {
        switch completion {
        case let .failure(error):
            reject("Error", error.localizedDescription, error)
        case .finished:
            break
        }
    }

    private func resolveResponse<T: Encodable>(_ response: T, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(response) else {
            reject("Error", "Encoding error", nil)
            return
        }
        resolve(String(data: jsonData, encoding: .utf8) ?? "")
    }
}
