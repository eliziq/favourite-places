import { View, Alert, Button, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({onTakeImage}) => {
  const [pickedImg, setPickedImg] = useState("");
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  //only needed for IOS
  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }
    return true;
  }

  async function takePictureHandler() {
    //verifyPermissions() only needed for IOS
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImg(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePrewiew = (
    <Text style={styles.fallbackText}>No picture taken yet.</Text>
  );
  if (pickedImg) {
    imagePrewiew = <Image source={{ uri: pickedImg }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePrewiew}>{imagePrewiew}</View>
      <OutlinedButton icon="camera" onPress={takePictureHandler}>
        Take Picture
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePrewiew: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.transparentWhite,
    borderColor: GlobalStyles.colors.black,
    borderWidth: 2,
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallbackText: {
    fontFamily: "unbounded-300",
    fontSize: 14,
    color: GlobalStyles.colors.black,
  },
});
