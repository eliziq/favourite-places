import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { GlobalStyles } from "../constants/styles";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      lat: fetchedPlace.location.lat,
      lng: fetchedPlace.location.lng,
    });
  };
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({ title: place.title });
    }
    loadPlaceData();
  }, [selectedPlaceId]);
  if (!fetchedPlace) {
    return (
      <View>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }
  return (
    <ImageBackground
      source={require("../assets/images/backgroundImage1.png")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ImageBackground>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    height: "35%",
    minHeight: 300,
    width: "90%",
    marginTop: 20,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalStyles.colors.black,
    fontFamily: "unbounded-400",
    textAlign: "center",
    fontSize: 16,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.8,
  },
});
