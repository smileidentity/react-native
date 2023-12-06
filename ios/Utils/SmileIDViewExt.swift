import SwiftUI

extension View {
    func validateData(_ data: AnyObject?, message: String) throws {
        guard let _ = data else {
            throw SmileIDError.missingRequiredData(message)
        }
    }
}
