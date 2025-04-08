// swift-tools-version:5.7
import PackageDescription

let package = Package(
  name: "_umbrella_",
  dependencies: [
    .package(url: "https://github.com/smileidentity/ios.git", .upToNextMajor(from: "10.5.1"))
  ]
)
