import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

interface RadioButtonProps {
  selected: boolean;
  onPress?: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.radio, selected && styles.radioSelected]}
      onPress={onPress}
    >
      {selected && <View style={styles.radioInner} />}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00726D",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioSelected: {
    borderColor: "#00726D",
    backgroundColor: "#fff",
  },
  radioInner: {
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: "#00726D",
  },
});
