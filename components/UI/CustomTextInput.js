import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const CustomTextInput = ({ value, onChange, children }) => {
  return (
    <View>
      <Text style={styles.label}>{children}</Text>
      <TextInput
        onChangeText={(e) => onChange(e)}
        value={value}
        style={styles.input}
        multiline={true}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: "unbounded-400",
    fontSize: 14,
    color: GlobalStyles.colors.black,
  },
  input: {
    fontFamily: "unbounded-400",
    marginBottom: 12,
    fontSize: 16,
    color: GlobalStyles.colors.black,
    paddingHorizontal: 8,
    borderColor: GlobalStyles.colors.black,
    borderWidth: 2,
    minHeight: 36,

  },
});
