import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';

export  const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Capture', {product: 1})
        }
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
