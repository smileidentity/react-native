import SmileID

@objc(RNSmileID)
class RNSmileID: NSObject {
    @objc(initialize:withResolver:withRejecter:)
    func initialize(useSandBox: Bool, resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
        SmileID.initialize(useSandbox: useSandBox)
        resolve(nil)
    }

    @objc(setCallbackUrl:withResolver:withRejecter:)
    func setCallbackUrl(callbackUrl: String, resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
        SmileID.setCallbackUrl(url: URL(string: callbackUrl))
        resolve(nil)
    }

    @objc(setAllowOfflineMode:withResolver:withRejecter:)
    func setAllowOfflineMode(allowOfflineMode: Bool, resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
        SmileID.setAllowOfflineMode(allowOfflineMode: allowOfflineMode)
        resolve(nil)
    }

    @objc(submitJob:withResolver:withRejecter:)
    func submitJob(jobId: String, resolve: @escaping RCTPromiseResolveBlock, reject : @escaping RCTPromiseRejectBlock) {
        do {
            try SmileID.submitJob(jobId: jobId)
            resolve(nil)
        } catch let error as NSError {
            reject("Error", error.localizedDescription, error)
        }
    }

    @objc(getSubmittedJobs:withRejecter:)
    func getSubmittedJobs(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        do {
            let jobs: [String] =  SmileID.getUnsubmittedJobs()
            resolve(jobs)
        } catch let error as NSError {
            reject("Error", error.localizedDescription, error)
        }
    }

    @objc(getUnsubmittedJobs:withRejecter:)
    func getUnsubmittedJobs(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        do {
            let jobs: [String] =  SmileID.getUnsubmittedJobs()
            resolve(jobs)
        } catch let error as NSError {
            reject("Error", error.localizedDescription, error)
        }
    }

    @objc(cleanup:withResolver:withRejecter:)
    func cleanup(jobId: String, resolve: @escaping RCTPromiseResolveBlock, reject : @escaping RCTPromiseRejectBlock) {
        do {
            try SmileID.cleanup(jobId: jobId)
            resolve(nil)
        } catch let error as NSError {
            reject("Error", error.localizedDescription, error)
        }
    }

    @objc(authenticate:withResolver:withRejecter:)
    func authenticate(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let authenticationRequest = request.toAuthenticationRequest() else {
            reject("Error", "Invalid request data", nil)
            return
        }

        Task {
            do {
                let response = try await SmileID.api.authenticate(request: authenticationRequest)
                self.resolveResponse(response, resolve: resolve, reject: reject)
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
    }

    @objc(prepUpload:withResolver:withRejecter:)
    func prepUpload(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let prepUploadRequest = request.toPrepUploadRequest() else {
            reject("Error", "Invalid prep upload request", nil)
            return
        }

        Task {
            do {
                let response = try await SmileID.api.prepUpload(request: prepUploadRequest)
                self.resolveResponse(response, resolve: resolve, reject: reject)
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
    }

    @objc(upload:request:withResolver:withRejecter:)
    func upload(url: String, request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let uploadRequest = request.toUploadRequest() else {
            reject("Error", "Invalid upload request", nil)
            return
        }

        guard let zipUrl = try? LocalStorage.toZip(uploadRequest: uploadRequest) else {
            reject("Error", "Unable to zip file", nil)
            return
        }

        guard let zipData = try? Data(contentsOf: zipUrl) else {
            reject("Error", "Unable to read zip file", nil)
            return
        }

        Task {
            do {
                try await SmileID.api.upload(zip: zipData, to: url)
                resolve(nil)
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
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

        Task {
            do {
                let response = try await SmileID.api.doEnhancedKyc(request: request)
                let encoder = JSONEncoder()
                guard let jsonData = try? encoder.encode(response) else {
                    throw SmileIDError.unknown("doEnhancedKyc encoding error")
                }
                // Assuming you have a method to convert response to a dictionary
                resolve(["result": String(data: jsonData, encoding: .utf8)!])
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
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

        Task {
          do {
              let response = try await SmileID.api.doEnhancedKycAsync(request: request)
              let encoder = JSONEncoder()
              guard let jsonData = try? encoder.encode(response) else {
                  throw SmileIDError.unknown("doEnhancedKyc encoding error")
              }
              // Assuming you have a method to convert response to a dictionary
              resolve(["result": String(data: jsonData, encoding: .utf8)!])
          } catch {
              reject("Error", error.localizedDescription, error)
          }
        }
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

        Task {
            do {
                let response = try await SmileID.api.getProductsConfig(request: productsConfigRequest)
                self.resolveResponse(response, resolve: resolve, reject: reject)
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
    }

    @objc(getValidDocuments:withResolver:withRejecter:)
    func getValidDocuments(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let validDocumentsRequest = request.toProductsConfigRequest() else {
            reject("Error", "Invalid valid documents request", nil)
            return
        }

        Task {
            do {
                let response = try await SmileID.api.getValidDocuments(request: validDocumentsRequest)
                self.resolveResponse(response, resolve: resolve, reject: reject)
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
    }

    @objc(getServicesWithResolver:withRejecter:)
    func getServices(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        Task {
            do {
                let response = try await SmileID.api.getServices()
                self.resolveResponse(response, resolve: resolve, reject: reject)
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
    }

    @objc(getJobStatus:withResolver:withRejecter:)
    func getJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let jobStatusRequest = request.toJobStatusRequest() else {
            reject("Error", "Invalid job status request", nil)
            return
        }

        Task {
            do {
                let response = try await SmileID.api.getJobStatus(request: jobStatusRequest)
                self.resolveResponse(response, resolve: resolve, reject: reject)
            } catch {
                reject("Error", error.localizedDescription, error)
            }
        }
    }

    @objc(pollSmartSelfieJobStatus:withResolver:withRejecter:)
    func pollSmartSelfieJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let jobStatusRequest = request.toJobStatusRequest() else {
            reject("Error", "Invalid job status request", nil)
            return
        }

        guard let interval = request["interval"] as? Int64  else {
            reject("Error", "interval is required", nil)
            return
        }

        guard let numAttempts = request["numAttempts"] as? Int64  else {
            reject("Error", "numAttempts is required", nil)
            return
        }

        pollJobStatus(
            apiCall: SmileID.api.pollSmartSelfieJobStatus,
            request: jobStatusRequest,
            interval: interval,
            numAttempts: numAttempts,
            resolve: resolve,
            reject: reject
        )
    }

    @objc(pollDocumentVerificationJobStatus:withResolver:withRejecter:)
    func pollDocumentVerificationJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let jobStatusRequest = request.toJobStatusRequest() else {
            reject("Error", "Invalid job status request", nil)
            return
        }

        guard let interval = request["interval"] as? Int64  else {
            reject("Error", "interval is required", nil)
            return
        }

        guard let numAttempts = request["numAttempts"] as? Int64  else {
            reject("Error", "numAttempts is required", nil)
            return
        }

        pollJobStatus(
            apiCall: SmileID.api.pollDocumentVerificationJobStatus,
            request: jobStatusRequest,
            interval: interval,
            numAttempts: numAttempts,
            resolve: resolve,
            reject: reject
        )
    }

    @objc(pollBiometricKycJobStatus:withResolver:withRejecter:)
    func pollBiometricKycJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let jobStatusRequest = request.toJobStatusRequest() else {
            reject("Error", "Invalid job status request", nil)
            return
        }

        guard let interval = request["interval"] as? Int64  else {
            reject("Error", "interval is required", nil)
            return
        }

        guard let numAttempts = request["numAttempts"] as? Int64  else {
            reject("Error", "numAttempts is required", nil)
            return
        }

        pollJobStatus(
            apiCall: SmileID.api.pollBiometricKycJobStatus,
            request: jobStatusRequest,
            interval: interval,
            numAttempts: numAttempts,
            resolve: resolve,
            reject: reject
        )
    }

    @objc(pollEnhancedDocumentVerificationJobStatus:withResolver:withRejecter:)
    func pollEnhancedDocumentVerificationJobStatus(request: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let jobStatusRequest = request.toJobStatusRequest() else {
            reject("Error", "Invalid job status request", nil)
            return
        }

        guard let interval = request["interval"] as? Int64  else {
            reject("Error", "interval is required", nil)
            return
        }

        guard let numAttempts = request["numAttempts"] as? Int64  else {
            reject("Error", "numAttempts is required", nil)
            return
        }

        pollJobStatus(
            apiCall: SmileID.api.pollEnhancedDocumentVerificationJobStatus,
            request: jobStatusRequest,
            interval: interval,
            numAttempts: numAttempts,
            resolve: resolve,
            reject: reject
        )
    }

    func pollJobStatus<RequestType, ResponseType: Encodable>(
        apiCall: @escaping (RequestType, TimeInterval, Int) async throws -> ResponseType,
        request: RequestType,
        interval: Int64,
        numAttempts: Int64,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        let timeInterval = convertToTimeInterval(milliSeconds: interval)
        guard let numAttemptsInt = Int(exactly: numAttempts) else {
            reject("InvalidNumAttempts", "Invalid numAttempts value", NSError(domain: "Invalid numAttempts value", code: -1, userInfo: nil))
            return
        }

        Task {
            do {
                let response = try await apiCall(request, timeInterval, numAttemptsInt)
                self.resolveResponse(response, resolve: resolve, reject: reject)
            } catch {
                reject("ApiCallFailure", "API call failed with error: \(error.localizedDescription)", error)
            }
        }
    }


    func convertToTimeInterval(milliSeconds:Int64) -> TimeInterval {
        let seconds = milliSeconds/1000
        return TimeInterval(seconds)
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
