import * as React from 'react';

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { DocumentVerificationRequest, JobType, SmartSelfieRequest } from 'react-native-smile-id';
import { Product } from './types/Product';


export const HomeScreen = ({ navigation }) => {
  const SmileButton = (props: Product) => {
    const { product } = props;
    return (
      <Pressable style={styles.productButton}
                 onPress={() => {
                   navigation.navigate('Capture', { product: product });
                 }}>
        <Text style={styles.productButtonText}>{product.title}</Text>
      </Pressable>);
  };

  // const smileProducts: Array<Product> = [
  //   {
  //     title: 'SmartSelfie Enrollment',
  //     jobType: JobType.SmartSelfieEnrollment,
  //   },
  //   {
  //     title: 'SmartSelfie Authentication',
  //     userId: 'user-e88a4d68-0c86-4a2a-a9ab-aed5fac8d927',
  //     jobType: JobType.SmartSelfieAuthentication,
  //   },
  //   {
  //     title: 'Enhanced KYC',
  //     jobType: JobType.EnhancedKyc,
  //   },
  //   {
  //     title: 'Biometric KYC',
  //     jobType: JobType.BiometricKyc,
  //   },
  //   {
  //     title: 'Document Verification',
  //     countryCode: 'ZW',
  //     idType: 'PASSPORT',
  //     jobType: JobType.DocumentVerification,
  //   },
  // ];

  const smartSelfieEnrollment: SmartSelfieRequest = {
    jobType: JobType.SmartSelfieEnrollment,
    allowAgentMode: true,
  };

  const smartSelfieAuthentication: SmartSelfieRequest = {
    jobType: JobType.SmartSelfieAuthentication,
    allowAgentMode: true,
    userId: 'user-e88a4d68-0c86-4a2a-a9ab-aed5fac8d927',
  };

  const documentVerification: DocumentVerificationRequest = {
    jobType: JobType.DocumentVerification,
    countryCode: 'ZW',
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
  ];


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Test Our Products
      </Text>
      <FlatList
        numColumns={2}
        data={smileProducts}
        renderItem={({ item }) => <SmileButton product={item} />}
        keyExtractor={item => item.title}
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
