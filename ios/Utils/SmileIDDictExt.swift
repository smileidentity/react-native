import Foundation
import SmileID

extension NSDictionary {
    func toIdInfo() -> IdInfo? {
        guard let country = self["country"] as? String else {
            return nil
        }

        let idType = self["id_type"] as? String
        let idNumber = self["id_number"] as? String
        let firstName = self["first_name"] as? String
        let middleName = self["middle_name"] as? String
        let lastName = self["last_name"] as? String
        let dob = self["dob"] as? String
        let bankCode = self["bank_code"] as? String
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
