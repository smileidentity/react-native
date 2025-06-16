import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState } from 'react';
import { SmileIDSmartSelfieEnrollment } from '@smile_identity/react-native';

export default function App() {
  const [showSmileID, setShowSmileID] = useState(false);

  const handleResult = (result: any) => {
    Alert.alert('Success', 'Enrollment completed successfully');
    setShowSmileID(false);
    console.log('Result:', result);
  };

  const handleError = (error: any) => {
    Alert.alert('Error', error.message || 'Something went wrong');
    setShowSmileID(false);
    console.error('Error:', error);
  };

  if (showSmileID) {
    return (
      <SmileIDSmartSelfieEnrollment
        userId="expo-test-user"
        allowNewEnroll={true}
        showAttribution={true}
        showInstructions={true}
        onResult={handleResult}
        onError={handleError}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmileID Expo Example</Text>
      <Text style={styles.subtitle}>Test SmileID SDK with Expo</Text>
      <Button 
        title="Start Enrollment" 
        onPress={() => setShowSmileID(true)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
});