import * as React from 'react';

import { Modal, Pressable, StyleSheet, View, Text } from 'react-native';
import SmileIDView from 'react-native-smile-id';
import { Product } from './types/Product';
import { useState } from 'react';

export const SmileIDCaptureScreen = ({ navigation, route }) => {
  const product: Product = route.params.product;
  const [result, setResult] = useState<string | undefined>();

  const ResultView = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={result !== undefined}
          onRequestClose={() => {
            setResult(undefined);
            navigation.popToTop();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Smile we got your results</Text>
              <Text style={styles.modalText}>{result}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setResult(undefined);
                  navigation.popToTop();
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SmileIDView
        style={styles.smileView}
        product={product.product}
        onResult={(event) => {
          console.log('Japhet Ndhlovu 1');
          console.log(event.nativeEvent.error);
          console.log('Japhet Ndhlovu 2');
          setResult(event.nativeEvent.result);
        }}
      />
      {ResultView()}
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
