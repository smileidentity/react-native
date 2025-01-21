import * as React from 'react';

import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import {
  // Config, import for config
  type BiometricKYCRequest,
  type ConsentRequest,
  type DocumentVerificationRequest,
  type SmartSelfieAuthenticationRequest,
  type SmartSelfieEnrollmentRequest,
} from '@smile_identity/react-native';

import { SmileID } from '@smile_identity/react-native';
import type { Product } from './types/Product';
import { SmileButton } from './SmileButton';
import { useEffect, useRef, useState } from 'react';

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const generateUuid = (prefix: 'job_' | 'user_'): string => {
    return (
      prefix +
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
    );
  };

  const defaultProductRef = useRef({
    userId: '',
    jobId: '',
    allowAgentMode: true,
    showInstructions: true,
    showAttribution: true,
    showConfirmation: true,
    isDocumentFrontSide: true,
    allowGalleryUpload: true,
  });
  const [userId, setUserId] = useState(generateUuid('user_'));
  const [jobId, setJobId] = useState(generateUuid('job_'));
  const [smartSelfieEnrollment, setSmartSelfieEnrollment] =
    useState<SmartSelfieEnrollmentRequest>({
      ...defaultProductRef.current,
      extraPartnerParams: {
        optionalThingKey: 'optionalThingValue',
      },
    });
  const [smartselfieCapture, setSmartselfieCapture] =
    useState<SmartSelfieEnrollmentRequest>({
      ...defaultProductRef.current,
    });
  const [documentCapture, setDocumentCapture] =
    useState<SmartSelfieEnrollmentRequest>({
      ...defaultProductRef.current,
    });
  const [smartSelfieAuthentication, setSmartSelfieAuthentication] =
    useState<SmartSelfieAuthenticationRequest>({
      ...defaultProductRef.current,
      userId: 'user_0ffc7e8b-9b31-41bc-8131-03103a45d944',
    });
  const [documentVerification, setDocumentVerification] =
    useState<DocumentVerificationRequest>({
      ...defaultProductRef.current,
      countryCode: 'ZW',
      documentType: 'PASSPORT',
      captureBothSides: true,
      allowGalleryUpload: false,
    });
  const [biometricKYC, setBiometricKYC] = useState<BiometricKYCRequest>({
    ...defaultProductRef.current,
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
  });
  const [consentScreen, setConsentScreen] = useState<ConsentRequest>({
    partnerIcon: Platform.OS === 'android' ? 'si_logo_with_text' : 'smile_logo',
    partnerName: 'Smile React',
    productName: 'BVN',
    partnerPrivacyPolicy: 'https://docs.usesmileid.com',
    showAttribution: true,
  });
  const [smileProducts, setSmileProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    SmileID.initialize(false);
    // const config = new Config(
    //   'PARTNER ID',
    //   'AUTH KEY',
    //   'https://api.smileidentity.com/v1/',
    //   'https://api.smileidentity.com/v1/'
    // );
    //with api key
    // SmileID.initializeWithApiKey('YOUR API KEY', config, false, false);
    //with the config
    // SmileID.initializeWithConfig(config, false, false);
    SmileID.disableCrashReporting();
    setUserId(generateUuid('user_'));
    setJobId(generateUuid('job_'));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUserId(generateUuid('user_'));
      setJobId(generateUuid('job_'));
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    defaultProductRef.current = {
      ...defaultProductRef.current,
      userId,
      jobId,
    };

    setSmartselfieCapture({
      ...defaultProductRef.current,
    });

    setDocumentCapture({
      ...defaultProductRef.current,
    });

    setSmartSelfieEnrollment({
      ...defaultProductRef.current,
      extraPartnerParams: {
        optionalThingKey: 'optionalThingValue',
        job_id: 'thisismytestjobwithxyzandroid',
      },
    });

    setSmartSelfieAuthentication({
      ...defaultProductRef.current,
      userId: 'user_0ffc7e8b-9b31-41bc-8131-03103a45d944',
      extraPartnerParams: {
        optionalThingKey: 'optionalThingValue',
        job_id: 'thisismytestjobwithxyzandroid22',
      },
    });

    setDocumentVerification({
      ...defaultProductRef.current,
      countryCode: 'ZW',
      documentType: 'PASSPORT',
      captureBothSides: true,
      allowGalleryUpload: false,
    });

    setBiometricKYC({
      ...defaultProductRef.current,
      idInfo: {
        country: 'NG',
        idType: 'NIN_V2',
        idNumber: '00000000000',
        entered: true,
      },
      partnerIcon:
        Platform.OS === 'android' ? 'si_logo_with_text' : 'smile_logo',
      partnerName: 'Smile React',
      productName: 'NIN_SLIP',
      partnerPrivacyPolicy: 'https://docs.usesmileid.com',
    });

    setConsentScreen({
      partnerIcon:
        Platform.OS === 'android' ? 'si_logo_with_text' : 'smile_logo',
      partnerName: 'Smile React',
      productName: 'BVN',
      partnerPrivacyPolicy: 'https://docs.usesmileid.com',
      showAttribution: true,
    });
  }, [userId, jobId]);

  useEffect(() => {
    setSmileProducts([
      {
        title: 'SmartSelfie Capture',
        product: smartselfieCapture,
      },
      {
        title: 'Document Capture',
        product: documentCapture,
      },
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
    ]);
  }, [
    smartselfieCapture,
    documentCapture,
    smartSelfieEnrollment,
    smartSelfieAuthentication,
    documentVerification,
    biometricKYC,
    consentScreen,
  ]);

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
