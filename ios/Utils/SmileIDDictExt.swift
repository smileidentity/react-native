import Foundation
import SmileID

extension NSDictionary {
  func toConfig() -> Config {
    return Config(
      partnerId: (self["partnerId"] as? String)!,
      authToken: (self["authToken"] as? String)!,
      prodLambdaUrl: (self["prodLambdaUrl"] as? String)!,
      testLambdaUrl: (self["testLambdaUrl"] as? String)!
    )
  }
  
  func toAuthenticationRequest() -> AuthenticationRequest? {
    guard let jobTypeValue = self["jobType"] as? Int,
          let jobType = JobType(rawValue: jobTypeValue),
          let jobId = self["jobId"] as? String,
          let userId = self["userId"] as? String
    else {
      return nil
    }
    
    let country = self["country"] as? String
    let idType = self["idType"] as? String
    let updateEnrolledImage = self["updateEnrolledImage"] as? Bool
    
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
          let signature = self["signature"] as? String
    else {
      return nil
    }
    let allowNewEnroll = self["allowNewEnroll"] as? Bool ?? false
    
    return PrepUploadRequest(
      partnerParams: partnerParams,
      callbackUrl: callbackUrl,
      allowNewEnroll: allowNewEnroll,
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
          let imageName = self["imageName"] as? String
    else {
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
  
  func toConsentInfo() -> ConsentInformation {
    let consentGrantedDate = self["consentGrantedDate"] as? String ?? getCurrentIsoTimestamp()
    
    // Try the new property names first, fall back to old property names if new ones aren't present
    let personalDetailsConsentGranted: Bool
    if let newValue = self["personalDetailsConsentGranted"] as? Bool {
      personalDetailsConsentGranted = newValue
    } else {
      personalDetailsConsentGranted = self["personalDetails"] as? Bool ?? false
    }
    
    let contactInfoConsentGranted: Bool
    if let newValue = self["contactInfoConsentGranted"] as? Bool {
      contactInfoConsentGranted = newValue
    } else {
      contactInfoConsentGranted = self["contactInformation"] as? Bool ?? false
    }
    
    let documentInfoConsentGranted: Bool
    if let newValue = self["documentInfoConsentGranted"] as? Bool {
      documentInfoConsentGranted = newValue
    } else {
      documentInfoConsentGranted = self["documentInformation"] as? Bool ?? false
    }
    
    return ConsentInformation(
      consented: ConsentedInformation(
        consentGrantedDate: consentGrantedDate,
        personalDetails: personalDetailsConsentGranted,
        contactInformation: contactInfoConsentGranted,
        documentInformation: documentInfoConsentGranted
      )
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
          let signature = self["signature"] as? String
    else {
      return nil
    }
    
    let consentInfo: ConsentInformation
    if let consentInformation = self["consentInformation"] as? NSDictionary{
      consentInfo = consentInformation.toConsentInfo()
    } else  {
      consentInfo = ConsentInformation(
        consented: ConsentedInformation(
          consentGrantedDate: getCurrentIsoTimestamp(),
          personalDetails: false,
          contactInformation: false,
          documentInformation: false
        )
      )
    }
    
    return EnhancedKycRequest(
      country: country,
      idType: idType,
      idNumber: idNumber,
      consentInformation: consentInfo,
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
          let signature = self["signature"] as? String
    else {
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
          let signature = self["signature"] as? String
    else {
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

extension Dictionary where Key == String, Value == Any {
  func toJSONCompatibleDictionary() -> [String: Any] {
    var jsonCompatibleDict = [String: Any]()
    for (key, value) in self {
      if let arrayValue = value as? [Any] {
        jsonCompatibleDict[key] = arrayValue.map { convertToJSONCompatible($0) }
      } else {
        jsonCompatibleDict[key] = convertToJSONCompatible(value)
      }
    }
    return jsonCompatibleDict
  }
  
  private func convertToJSONCompatible(_ value: Any) -> Any {
    switch value {
    case let url as URL:
      return url.absoluteString
    case let bool as Bool:
      return bool
    case let string as String:
      return string
    case let number as NSNumber:
      return number
    case let dict as [String: Any]:
      return dict.toJSONCompatibleDictionary()
    default:
      return String(describing: value)
    }
  }
}
