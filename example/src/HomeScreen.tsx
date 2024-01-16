import * as React from 'react';

import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import type {
  BiometricKYCRequest,
  ConsentRequest,
  DocumentVerificationRequest,
  SmartSelfieAuthenticationRequest,
  SmartSelfieEnrollmentRequest,
} from '@smile_identity/react-native';

import { SmileID } from '@smile_identity/react-native';
import type { Product } from './types/Product';
import { SmileButton } from './SmileButton';
export const HomeScreen = ({ navigation }: { navigation: any }) => {
  React.useEffect(() => {
    SmileID.initialize(true);
  }, []);

  const defaultProduct = {
    allowAgentMode: true,
    showInstructions: true,
  };

  const smartSelfieEnrollment: SmartSelfieEnrollmentRequest = {
    ...defaultProduct,
    // userId: 'user-e88a4d68-0c86-4a2a-a9ab-aed5fac8dsds8',
  };

  const smartSelfieAuthentication: SmartSelfieAuthenticationRequest = {
    ...defaultProduct,
    userId: 'user-e88a4d68-0c86-4a2a-a9ab-aed5fac8dsds7',
  };

  const documentVerification: DocumentVerificationRequest = {
    ...defaultProduct,
    countryCode: 'ZW',
    documentType: 'PASSPORT',
    captureBothSides: true,
    allowGalleryUpload: false,
  };

  const biometricKYC: BiometricKYCRequest = {
    ...defaultProduct,
    idInfo: {
      country: 'NG',
      idType: 'NIN_V2',
      idNumber: '00000000000',
      entered: true,
    },
    partnerIcon: Platform.OS === 'android' ? 'si_logo_with_text' : 'smile_logo',
    partnerName: 'Smile React',
    productName: 'NIN_SLIP',
    partnerPrivacyPolicy: 'https://docs.usesmileid.com',
  };

  const consentScreen: ConsentRequest = {
    partnerIcon: Platform.OS === 'android' ? 'si_logo_with_text' : 'smile_logo',
    partnerName: 'Smile React',
    productName: 'BVN',
    partnerPrivacyPolicy: 'https://docs.usesmileid.com',
    showAttribution: true,
  };

  const smileProducts: Array<Product> = [
    {
      title: 'SmartSelfie Enrollment',
      product: smartSelfieEnrollment,
    },
    {
      title: 'SmartSelfie Authentication',
      product: smartSelfieAuthentication,
    },
    {
      title: 'Document Verification',
      product: documentVerification,
    },
    {
      title: 'Enhanced Document Verification',
      product: documentVerification,
    },
    {
      title: 'Biometric KYC',
      product: biometricKYC,
    },
    {
      title: 'Consent Screen',
      product: consentScreen,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Our Products</Text>
      <FlatList
        numColumns={2}
        data={smileProducts}
        renderItem={({ item }) => (
          <SmileButton navigation={navigation} smileProduct={item} />
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDBDBC4',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
  productButton: {
    margin: 20,
    width: '40%',
    height: 150,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 10,
    borderRadius: 20,
  },
  productButtonText: {
    color: 'white',
    backgroundColor: 'blue',
  },
  smileView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
