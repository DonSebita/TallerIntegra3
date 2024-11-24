import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  label,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View style={[
        styles.checkbox,
        checked && styles.checked,
        disabled && styles.disabled,
      ]}>
        {checked && <Check size={16} color="#FFFFFF" />}
      </View>
      {label && (
        <Text style={[
          styles.label,
          disabled && styles.disabledText,
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#34434D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#34434D',
  },
  disabled: {
    borderColor: '#CCCCCC',
    backgroundColor: '#EEEEEE',
  },
  label: {
    fontSize: 16,
    color: '#34434D',
  },
  disabledText: {
    color: '#999999',
  },
});

