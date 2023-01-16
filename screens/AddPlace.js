import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";
import { StyleSheet, ImageBackground } from "react-native";

const AddPlace = ({ navigation }) => {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("All Places");
  }
  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage1.png")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </ImageBackground>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.8,
  },
});
