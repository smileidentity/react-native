import * as React from 'react';

import { Alert, Modal, StyleSheet, View } from 'react-native';
import SmileIDView from 'react-native-smile-id';
import { Product } from './types/Product';

export const SmileIDCaptureScreen = ({navigation, route}) => {
  const [result, setResult] = React.useState<string | undefined>();
  const product : Product = route.params.product;
  return (
    <View style={styles.container}>
      <SmileIDView style={styles.smileView}
                   userId= {product.userId}
                   jobId ={product.jobId}
                   countryCode ={product.countryCode}
                   idType ={product.idType}
                   jobType= {product.jobType.valueOf()}
                   onResult={(result) => {
                     console.log('result', result);
                   }}/>

    </View>
  );
}

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
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
