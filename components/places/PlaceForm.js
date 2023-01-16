import { useState, useCallback } from "react";
import {ScrollView, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import CustomTextInput from "../UI/CustomTextInput";
import { Place } from "../../models/place";

const PlaceForm = ({ onCreatePlace }) => {

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [pickedLocation, setPickedLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const changeTitleHandler = (enteredText) => {
    const value = enteredText;
    setEnteredTitle(value);
  };
  const changeDescHandler = (enteredText) => {
    const value = enteredText;
    setEnteredDesc(value);
  };
  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(
      enteredTitle,
      enteredDesc,
      selectedImage,
      pickedLocation
    );
    onCreatePlace(placeData);
  };
  return (
    <ScrollView style={styles.form}>
      <CustomTextInput value={enteredTitle} onChange={changeTitleHandler}>
        Title
      </CustomTextInput>
      <CustomTextInput value={enteredDesc} onChange={changeDescHandler}>
        Description
      </CustomTextInput>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
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
