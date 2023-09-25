import * as React from 'react';

import { StyleSheet, View} from 'react-native';
import SmileIDView from 'react-native-smile-id';

export const SmileIDCaptureScreen = ({navigation}) => {
  const [result, setResult] = React.useState<string | undefined>();
  return (
    <View style={styles.container}>
      <SmileIDView style={styles.smileView}
                   userId= {'xyz'}
                   jobId ={'xyz'}
                   jobType= {'1'}
                   onResult={(result) => {
                     setResult(result);
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
