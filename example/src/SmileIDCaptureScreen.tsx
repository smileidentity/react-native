import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  SmileIDSmartSelfieEnrollmentView,
  SmileIDSmartSelfieEnrollmentEnhancedView,
  SmileIDSmartSelfieAuthenticationView,
  SmileIDSmartSelfieAuthenticationEnhancedView,
  SmileIDDocumentVerificationView,
  SmileIDBiometricKYCView,
  SmileIDDocumentCaptureView,
  SmileIDEnhancedDocumentVerificationView,
  AuthenticationRequest,
  JobType,
  SmileIDConsentView,
  SmileID,
  IdInfo,
  JobStatusRequest,
  SmileIDSmartSelfieCaptureView,
} from '@smile_identity/react-native';

import type {
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  DocumentVerificationRequest,
  ConsentRequest,
  BiometricKYCRequest,
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
  const partnerId = '<YOUR PARTNER ID>';
  type SmileIDPollingFunction = keyof typeof SmileID;
  const getAuthInfo = async (
    jobType: JobType,
    userId: string,
    jobId: string,
    partnerId: string,
    pollingFunctionName: SmileIDPollingFunction,
    idInfo?: IdInfo | null,
    ...pollingArgs: any[]
  ) => {
    const request = new AuthenticationRequest(jobType);
    request.jobId = jobId;
    request.userId = userId;
    if (idInfo) {
      request.country = idInfo.country;
      request.idType = idInfo.idType;
    }
    const response = await SmileID.authenticate(request);
    // TODO: Fix and test all native method calls to make sure they return objects
    // @ts-ignore - this is a known issue with the type definitions
    const parsedResponse = JSON.parse(response);
    if (parsedResponse) {
      try {
        const pollingFunction = SmileID[pollingFunctionName] as (
          ...args: any[]
        ) => Promise<any>;
        if (typeof pollingFunction !== 'function') {
          throw new Error(
            `${pollingFunctionName} is not a function in SmileID`
          );
        }
        const jobStatusRequest = new JobStatusRequest(
          userId,
          jobId,
          false,
          false,
          partnerId,
          parsedResponse.timestamp,
          parsedResponse.signature
        );
        const pollingResult = await pollingFunction(
          jobStatusRequest,
          ...pollingArgs
        );
        console.log('Got polling results', pollingResult);
        return pollingResult;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  };

  const handleResponse = (
    jobType: JobType,
    pollingFunctionName?: SmileIDPollingFunction,
    response?: string,
    userId?: string,
    jobId?: string
  ) => {
    if (response && userId && jobId && pollingFunctionName) {
      getAuthInfo(
        jobType,
        userId,
        jobId,
        partnerId,
        pollingFunctionName,
        null,
        3000,
        5
      );
      console.log('Got response', response);
      setResult(response);
    }
  };

  const handleErrorResponse = (response?: string) => {
    console.log('Got error response', response);
    if (response) {
      setResult(response);
    }
  };

  return (
    <View style={styles.container}>
      {title === 'SmartSelfie Capture' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieCaptureView
          {...product}
          style={[styles.smileView]}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              handleErrorResponse(event.nativeEvent.error);
              return;
            }
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      {title === 'Document Capture' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDDocumentCaptureView
          {...product}
          style={[styles.smileView]}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              handleErrorResponse(event.nativeEvent.error);
              return;
            }
            setResult(event.nativeEvent.result);
          }}
        />
      )}
      {title === 'SmartSelfie Enrollment' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieEnrollmentView
          {...product}
          style={styles.smileView}
          onResult={(event) => {
            if (event.nativeEvent.error) {
              handleErrorResponse(event.nativeEvent.error);
              return;
            }
            const jobId =
              'jobId' in product
                ? product.jobId
                : product.extraPartnerParams?.job_id;
            handleResponse(
              JobType.SmartSelfieEnrollment,
              'pollSmartSelfieJobStatus',
              event.nativeEvent.result,
              product.userId,
              jobId
            );
          }}
        />
      )}
    {title === 'SmartSelfie Enrollment (Enhanced)' && (
            // @ts-ignore - this is a known issue with the type definitions
            <SmileIDSmartSelfieEnrollmentEnhancedView
              {...product}
              style={styles.smileView}
              onResult={(event) => {
                if (event.nativeEvent.error) {
                  handleErrorResponse(event.nativeEvent.error);
                  return;
                }
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
              handleErrorResponse(event.nativeEvent.error);
              return;
            }
            const jobId =
              'jobId' in product
                ? product.jobId
                : product.extraPartnerParams?.job_id;
            handleResponse(
              JobType.SmartSelfieAuthentication,
              'pollSmartSelfieJobStatus',
              event.nativeEvent.result,
              product.userId,
              jobId
            );
          }}
        />
      )}
    {title === 'SmartSelfie Authentication (Enhanced)' && (
            // @ts-ignore - this is a known issue with the type definitions
            <SmileIDSmartSelfieAuthenticationEnhancedView
              {...product}
              style={styles.smileView}
              onResult={(event) => {
                if (event.nativeEvent.error) {
                  handleErrorResponse(event.nativeEvent.error);
                  return;
                }
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
              handleErrorResponse(event.nativeEvent.error);
              return;
            }
            handleResponse(
              JobType.DocumentVerification,
              'pollDocumentVerificationJobStatus',
              event.nativeEvent.result,
              product.userId,
              'jobId' in product ? product.jobId : undefined
            );
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
              handleErrorResponse(event.nativeEvent.error);
              return;
            }
            handleResponse(
              JobType.EnhancedDocumentVerification,
              'pollEnhancedDocumentVerificationJobStatus',
              event.nativeEvent.result,
              product.userId,
              'jobId' in product ? product.jobId : undefined
            );
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
              handleErrorResponse(event.nativeEvent.error);
              return;
            }
            handleResponse(
              JobType.BiometricKyc,
              'pollBiometricKycJobStatus',
              event.nativeEvent.result,
              product.userId,
              'jobId' in product ? product.jobId : undefined
            );
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
              handleErrorResponse(event.nativeEvent.error);
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
