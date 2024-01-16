import Foundation
import SmileID

extension NSDictionary {
    func toAuthenticationRequest() -> AuthenticationRequest? {
        guard let jobTypeValue = self["jobType"] as? Int,
              let jobType = JobType(rawValue: jobTypeValue),
              let country = self["country"] as? String,
              let idType = self["idType"] as? String,
              let updateEnrolledImage = self["updateEnrolledImage"] as? Bool,
              let jobId = self["jobId"] as? String,
              let userId = self["userId"] as? String else {
            return nil
        }

        return AuthenticationRequest(
            jobType: jobType,
            updateEnrolledImage: updateEnrolledImage,
            jobId: jobId,
            userId: userId,
            country: country,
            idType: idType
        )
    }

    func toPrepUploadRequest() -> PrepUploadRequest? {
        guard let partnerParamsDict = self["partnerParams"] as? NSDictionary,
              let partnerParams = partnerParamsDict.toPartnerParams(),
              let callbackUrl = self["callbackUrl"] as? String,
              let partnerId = self["partnerId"] as? String,
              let timestamp = self["timestamp"] as? String,
              let signature = self["signature"] as? String else {
            return nil
        }

        return PrepUploadRequest(
            partnerParams: partnerParams,
            callbackUrl: callbackUrl,
            partnerId: partnerId,
            sourceSdk: self["sourceSdk"] as? String ?? "ios (react-native)",
            timestamp: timestamp,
            signature: signature
        )
    }

    func toUploadRequest() -> UploadRequest? {
        guard let imagesArray = self["images"] as? [NSDictionary] else {
            return nil
        }
        let images = imagesArray.compactMap { $0.toUploadImageInfo() }
        let idInfo = (self["idInfo"] as? NSDictionary)?.toIdInfo()

        return UploadRequest(
            images: images,
            idInfo: idInfo
        )
    }

    func toUploadImageInfo() -> UploadImageInfo? {
        guard let imageTypeIdValue = self["imageTypeId"] as? String,
              let imageTypeId = ImageType(rawValue: imageTypeIdValue),
              let imageName = self["imageName"] as? String else {
            return nil
        }

        return UploadImageInfo(
            imageTypeId: imageTypeId,
            fileName: imageName
        )
    }

    func toIdInfo() -> IdInfo? {
        guard let country = self["country"] as? String else {
            return nil
        }

        let idType = self["idType"] as? String
        let idNumber = self["idNumber"] as? String
        let firstName = self["firstName"] as? String
        let middleName = self["middleName"] as? String
        let lastName = self["lastName"] as? String
        let dob = self["dob"] as? String
        let bankCode = self["bankCode"] as? String
        let entered = self["entered"] as? Bool

        return IdInfo(
            country: country,
            idType: idType,
            idNumber: idNumber,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dob: dob,
            bankCode: bankCode,
            entered: entered
        )
    }

    func toEnhancedKycRequest() -> EnhancedKycRequest? {
        guard let country = self["country"] as? String,
              let idType = self["idType"] as? String,
              let idNumber = self["idNumber"] as? String,
              let firstName = self["firstName"] as? String,
              let middleName = self["middleName"] as? String,
              let lastName = self["lastName"] as? String,
              let dob = self["dob"] as? String,
              let phoneNumber = self["phoneNumber"] as? String,
              let bankCode = self["bankCode"] as? String,
              let callbackUrl = self["callbackUrl"] as? String,
              let partnerParamsDict = self["partnerParams"] as? NSDictionary,
              let partnerParams = partnerParamsDict.toPartnerParams(),
              let timestamp = self["timestamp"] as? String,
              let signature = self["signature"] as? String else {
            return nil
        }

        return EnhancedKycRequest(
            country: country,
            idType: idType,
            idNumber: idNumber,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dob: dob,
            phoneNumber: phoneNumber,
            bankCode: bankCode,
            callbackUrl: callbackUrl,
            partnerParams: partnerParams,
            sourceSdk: self["sourceSdk"] as? String ?? "ios (react-native)",
            timestamp: timestamp,
            signature: signature
        )
    }

    func toJobStatusRequest() -> JobStatusRequest? {
        guard let userId = self["userId"] as? String,
              let jobId = self["jobId"] as? String,
              let includeImageLinks = self["includeImageLinks"] as? Bool,
              let includeHistory = self["includeHistory"] as? Bool,
              let partnerId = self["partnerId"] as? String,
              let timestamp = self["timestamp"] as? String,
              let signature = self["signature"] as? String else {
            return nil
        }

        return JobStatusRequest(
            userId: userId,
            jobId: jobId,
            includeImageLinks: includeImageLinks,
            includeHistory: includeHistory,
            partnerId: partnerId,
            timestamp: timestamp,
            signature: signature
        )
    }

    func toProductsConfigRequest() -> ProductsConfigRequest? {
        guard let partnerId = self["partnerId"] as? String,
              let timestamp = self["timestamp"] as? String,
              let signature = self["signature"] as? String else {
            return nil
        }

        return ProductsConfigRequest(
            timestamp: timestamp,
            signature: signature,
            partnerId: partnerId
        )
    }

    func toPartnerParams() -> PartnerParams? {
        guard let country = self["country"] as? String else {
            return nil
        }
        var jobType: JobType?
        let jobId = self["jobId"] as? String
        let userId = self["userId"] as? String
        if let jobTypeValue = self["jobType"] as? Int {
            jobType = JobType(rawValue: jobTypeValue)
        }
        let extras = self["extras"] as? [String: String] ?? [:]
        return PartnerParams(
            jobId: jobId ?? generateJobId(),
            userId: userId ?? generateUserId(),
            jobType: jobType,
            extras: extras
        )
    }
}
