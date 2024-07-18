import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  SmileIDSmartSelfieEnrollmentView,
  SmileIDSmartSelfieAuthenticationView,
  SmileIDDocumentVerificationView,
  SmileIDBiometricKYCView,
  SmileIDEnhancedDocumentVerificationView,
  AuthenticationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  DocumentVerificationRequest,
  ConsentRequest,
  BiometricKYCRequest,
  JobType,
  SmileIDConsentView,
  SmileID,
  AuthenticationResponse,
  JobStatusRequest,
} from '@smile_identity/react-native';
import { useState } from 'react';
import { ResultView } from './ResultView';

interface SmileIDCaptureScreenProps {
  navigation: any; // Replace with the actual type of your navigation prop
  route: any; // Replace with the actual type of your route prop
}

export const SmileIDCaptureScreen: React.FC<SmileIDCaptureScreenProps> = ({
  navigation,
  route,
}) => {
  const title: string = route.params.title;
  const product:
    | SmartSelfieEnrollmentRequest
    | SmartSelfieAuthenticationRequest
    | ConsentRequest
    | BiometricKYCRequest
    | DocumentVerificationRequest = route.params.product;
  const [result, setResult] = useState<string | undefined>();
  const getAuthInfo = async () => {
    const request = new AuthenticationRequest(
      JobType.BiometricKyc,
      'NG',
      'NIN_V2',
      true,
      'job-3B8E3D47-51A6-4E71-9E8C-1D1DEF856CD8',
      'user-E79D81C9-B129-47BB-BA6F-665CE5F0A03C'
    );
    console.log('Japhet Ndhlovu start getAuthInfo');
    const response = await SmileID.authenticate(request);
    const parsedReponse = JSON.parse(response);
    console.log('Japhet Ndhlovu end getAuthInfo', parsedReponse);
    console.log('Japhet Ndhlovu end type of response', typeof parsedReponse);
    if (parsedReponse) {
      console.log('Japhet Ndhlovu start pollBiometricKyc');
      try {
        const pollingResult = await pollBiometricKyc(parsedReponse);
        console.log('Japhet Ndhlovu end pollBiometricKyc');
        console.log('Japhet Ndhlovu for polling results', pollingResult);
      } catch (e) {
        console.log('Japhet Ndhlovu for polling error', e);
      }
    }
  };

  const pollBiometricKyc = async (authResponse: AuthenticationResponse) => {
    const jobStatusRequest = new JobStatusRequest(
      'user-E79D81C9-B129-47BB-BA6F-665CE5F0A03C',
      'job-3B8E3D47-51A6-4E71-9E8C-1D1DEF856CD8',
      false,
      false,
      '210',
      authResponse.timestamp,
      authResponse.signature
    );
    const response = await SmileID.pollBiometricKycJobStatus(
      jobStatusRequest,
      1000,
      10
    );
    return response;
  };
  return (
    <View style={styles.container}>
      {title === 'SmartSelfie Enrollment' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieEnrollmentView
          {...product}
          style={styles.smileView}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              setResult(event.nativeEvent.error);
              return;
            }
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      {title === 'SmartSelfie Authentication' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieAuthenticationView
          {...product}
          style={styles.smileView}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              setResult(event.nativeEvent.error);
              return;
            }
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      {title === 'Document Verification' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDDocumentVerificationView
          {...product}
          style={styles.smileView}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              setResult(event.nativeEvent.error);
              return;
            }
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      {title === 'Enhanced Document Verification' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDEnhancedDocumentVerificationView
          {...product}
          style={styles.smileView}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              setResult(event.nativeEvent.error);
              return;
            }
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      {title === 'Biometric KYC' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDBiometricKYCView
          {...product}
          style={styles.smileView}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              setResult(event.nativeEvent.error);
              return;
            }
            getAuthInfo();
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      {title === 'Consent Screen' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDConsentView
          {...product}
          style={styles.smileView}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              setResult(event.nativeEvent.error);
              return;
            }
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      <ResultView
        result={result}
        setResult={setResult}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smileView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
