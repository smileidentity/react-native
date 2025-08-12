import * as React from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { ResultView } from './ResultView';
import {
  type SmileIDCaptureScreenProps,
  SmileIDComponent,
} from './SmileIDComponent';
import { handleErrorResponse, handleResponse } from './utils';

export const SmileIDCaptureScreen: React.FC<SmileIDCaptureScreenProps> = ({
  navigation,
  route,
}) => {
  const componentProduct = route.params.componentProduct;
  const [result, setResult] = useState<string | undefined>();
  return (
    <SafeAreaView style={styles.container} edges={["top","bottom"]}>
      <SmileIDComponent
        componentProduct={componentProduct}
        style={styles.smileView}
        onResult={(event) => {
          if (!componentProduct.isAsync) {
            setResult(event.nativeEvent.result);
            return;
          }
          if (event.nativeEvent.error) {
            handleErrorResponse(event.nativeEvent.error, () =>
              setResult(event.nativeEvent.error)
            );
            return;
          }
          if (componentProduct?.jobType) {
            let userId;
            let jobId;
            if ('extraPartnerParams' in componentProduct.product) {
              userId = componentProduct.product.extraPartnerParams?.user_id;
              jobId = componentProduct.product.extraPartnerParams?.job_id;
            } else {
              if ('userId' in componentProduct.product) {
                userId = componentProduct.product.userId;
              }
              if ('jobId' in componentProduct.product) {
                jobId = componentProduct.product.jobId;
              }
            }

            handleResponse(
              componentProduct.jobType,
              componentProduct.pollMethod,
              event.nativeEvent.result,
              userId,
              jobId,
              () => {
                setResult(event.nativeEvent.result);
              }
            );
          }
        }}
      />
      <ResultView
        result={result}
        setResult={setResult}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
  smileView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
