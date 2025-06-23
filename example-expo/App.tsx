import React from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { 
  SmileID,
  SmartSelfieEnrollment,
  SmartSelfieAuthentication,
  DocumentVerification,
  BiometricKYC
} from '@smile_identity/react-native';

export default function App() {
  const [showProduct, setShowProduct] = React.useState<string | null>(null);

  // Initialize SmileID
  React.useEffect(() => {
    SmileID.initialize({
      useSandbox: true,
      // Add other config as needed
    });
  }, []);

  const renderProduct = () => {
    switch (showProduct) {
      case 'enrollment':
        return (
          <SmartSelfieEnrollment
            userId="test-user-123"
            onResult={(result) => {
              console.log('Enrollment result:', result);
              setShowProduct(null);
            }}
          />
        );
      case 'authentication':
        return (
          <SmartSelfieAuthentication
            userId="test-user-123"
            onResult={(result) => {
              console.log('Authentication result:', result);
              setShowProduct(null);
            }}
          />
        );
      case 'document':
        return (
          <DocumentVerification
            onResult={(result) => {
              console.log('Document result:', result);
              setShowProduct(null);
            }}
          />
        );
      case 'biometric':
        return (
          <BiometricKYC
            idInfo={{
              country: 'NG',
              idType: 'NIN',
              idNumber: '12345678901'
            }}
            onResult={(result) => {
              console.log('Biometric result:', result);
              setShowProduct(null);
            }}
          />
        );
      default:
        return null;
    }
  };

  if (showProduct) {
    return renderProduct();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>SmileID Expo Example</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          
          <Button
            title="Smart Selfie Enrollment"
            onPress={() => setShowProduct('enrollment')}
          />
          
          <View style={styles.spacer} />
          
          <Button
            title="Smart Selfie Authentication"
            onPress={() => setShowProduct('authentication')}
          />
          
          <View style={styles.spacer} />
          
          <Button
            title="Document Verification"
            onPress={() => setShowProduct('document')}
          />
          
          <View style={styles.spacer} />
          
          <Button
            title="Biometric KYC"
            onPress={() => setShowProduct('biometric')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  spacer: {
    height: 10,
  },
});