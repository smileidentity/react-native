import { Pressable, StyleSheet, Text } from 'react-native';
import * as React from 'react';
import type { Product } from './types/Product';

interface SmileButtonProps {
  onPress?: (() => void) | null;
  smileProduct: Product;
  navigation: any; // Replace with the actual type of your navigation prop
}

export const SmileButton: React.FC<SmileButtonProps> = ({
  navigation,
  onPress,
  smileProduct,
}) => {
  const { product, title } = smileProduct;
  return (
    <Pressable
      style={styles.productButton}
      onPress={async () => {
        onPress
          ? onPress()
          : navigation.navigate('Capture', { product, title });
      }}
    >
      <Text style={styles.productButtonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});
