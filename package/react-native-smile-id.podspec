require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

# Check if we should use Expo or Legacy implementation
useExpo = false
Pod::UI.puts "[SmileID] $useSmileIDExpo is starting"
if defined?($useSmileIDExpo)
  Pod::UI.puts "[SmileID] $useSmileIDExpo is set to #{$useSmileIDExpo}!"
  useExpo = $useSmileIDExpo
else
  # Auto-detect Expo if variable not set
  begin
    require 'expo-modules-core'
    useExpo = true
    Pod::UI.puts "[SmileID] Expo modules detected, using Expo implementation"
  rescue LoadError
    Pod::UI.puts "[SmileID] Using React Native legacy implementation"
  end
end

Pod::Spec.new do |s|
  s.name         = "react-native-smile-id"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://docs.usesmileid.com/.git", :tag => "#{s.version}" }

  # Shared subspec - Always included
  s.subspec 'Shared' do |shared|
    shared.source_files = "ios/Shared/**/*.{h,m,mm,swift}"
    shared.dependency "SmileID", "11.0.0"
    # for development alongside example/ios/Podfile uncomment the version and specify
    # tag or branch in example/ios/Podfile
    # shared.dependency "SmileID"
  end

  # Expo subspec
  s.subspec 'SIDExpo' do |expo|
    expo.source_files = "ios/expo/**/*.{h,m,mm,swift}"
    expo.dependency "react-native-smile-id/Shared"
    expo.dependency 'ExpoModulesCore'

    # Swift/Objective-C compatibility
    expo.pod_target_xcconfig = {
      'DEFINES_MODULE' => 'YES',
    }
  end

  # React Native subspec
  s.subspec 'SIDReactNative' do |rn|
    rn.source_files = "ios/legacy/**/*.{h,m,mm,swift}"
    rn.dependency "react-native-smile-id/Shared"

    # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
    # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
    if respond_to?(:install_modules_dependencies, true)
      install_modules_dependencies(rn)
    else
      rn.dependency "React-Core"

      # Handle architecture-specific dependencies
      if ENV["RCT_NEW_ARCH_ENABLED"] == "1"
        rn.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
        rn.pod_target_xcconfig = {
            "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
            "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
            "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
            "GCC_PREPROCESSOR_DEFINITIONS" => "SMILE_ID_VERSION=\\\"#{package["version"]}\\\""
        }
        rn.dependency "React-Codegen"
        rn.dependency "RCT-Folly"
        rn.dependency "RCTRequired"
        rn.dependency "RCTTypeSafety"
        rn.dependency "ReactCommon/turbomodule/core"
      else
        rn.pod_target_xcconfig = {
          "GCC_PREPROCESSOR_DEFINITIONS" => "SMILE_ID_VERSION=\\\"#{package["version"]}\\\""
        }
      end
    end
  end

  # Default subspecs based on useExpo flag
  if useExpo
    Pod::UI.puts "[SmileID] Default subspecs: Shared, SIDExpo"
    s.default_subspecs = 'Shared', 'SIDExpo'
  else
    Pod::UI.puts "[SmileID] Default subspecs: Shared, SIDReactNative"
    s.default_subspecs = 'Shared', 'SIDReactNative'
  end
end
