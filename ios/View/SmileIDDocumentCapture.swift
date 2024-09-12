import Foundation
import SmileID
import SwiftUI

struct SmileIDDocumentCapture: View {
    let showInstructions: Bool
    let showAttribution: Bool
    let allowGallerySelection: Bool
    let showSkipButton: Bool
    let instructionsHeroImage: UIImage
    let instructionsTitleText: String
    let instructionsSubtitleText: String
    let captureTitleText: String
    let knownIdAspectRatio: Double?
    let showConfirmation: Bool
    @ObservedObject var viewModel: SelfieViewModel
    var body: some View {
        NavigationView {
            DocumentCaptureScreen(
                showInstructions: self.showInstructions,
                showAttribution: self.showAttribution,
                allowGallerySelection: self.allowGallerySelection,
                showSkipButton: self.showSkipButton,
                instructionsHeroImage: self.instructionsHeroImage,
                instructionsTitleText: self.instructionsTitleText,
                instructionsSubtitleText: self.instructionsSubtitleText,
                captureTitleText: self.captureTitleText,
                knownIdAspectRatio: self.knownIdAspectRatio,
                showConfirmation: self.showConfirmation,
                onConfirm :{ data in
                    
                },
                onError: { error in
                    
                },
                onSkip: {
                    
                })
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

