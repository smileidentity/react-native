import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { SmileID } from 'react-native-smile-id';
import SmileIDView from 'react-native-smile-id';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    SmileID.initialize().then(() => setResult('Initialized'));
  }, []);

  return (
    <View style={styles.container}>
      <SmileIDView style={styles.smileView}
                   userId= {'xyz'}
                   jobId ={'xyz'}
                   jobType= {'1'}
      />
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
