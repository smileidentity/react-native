require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "react-native-smile-id"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://docs.usesmileid.com/.git", :tag => "#{s.version}" }

  # Check if we should use Expo or Legacy implementation
  useExpo = false
  if defined?($SmileIDUseExpo)
    Pod::UI.puts "[SmileID] $SmileIDUseExpo is set to #{$SmileIDUseExpo}!"
    useExpo = $SmileIDUseExpo
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

  # Set source files based on implementation type
  if useExpo
    Pod::UI.puts "[SmileID] Including Expo source files"
    s.source_files = [
      "ios/expo/**/*.{h,m,mm,swift}",
      "ios/Shared/**/*.{h,m,mm,swift}",
    ]
    s.exclude_files = "ios/legacy/**/*"
  else
    Pod::UI.puts "[SmileID] Including React Native legacy source files"
    s.source_files = [
      "ios/legacy/**/*.{h,m,mm,swift}",
      "ios/Shared/**/*.{h,m,mm,swift}",
    ]
    s.exclude_files = "ios/expo/**/*"
  end

  s.dependency "SmileID", "11.0.0"
  # for development alongside example/ios/Podfile uncomment the version and specify
  # tag or branch in example/ios/Podfile
  # s.dependency "SmileID"

  # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"

    # Handle architecture-specific dependencies
    if ENV["RCT_NEW_ARCH_ENABLED"] == "1"
      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
      s.pod_target_xcconfig = {
          "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
          "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
          "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
          "GCC_PREPROCESSOR_DEFINITIONS" => "SMILE_ID_VERSION=\\\"#{package["version"]}\\\""
      }
      s.dependency "React-Codegen"
      s.dependency "RCT-Folly"
      s.dependency "RCTRequired"
      s.dependency "RCTTypeSafety"
      s.dependency "ReactCommon/turbomodule/core"
    else
      s.pod_target_xcconfig = {
        "GCC_PREPROCESSOR_DEFINITIONS" => "SMILE_ID_VERSION=\\\"#{package["version"]}\\\""
      }
    end
  end
end
