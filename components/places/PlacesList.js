import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  const selectPlaceHandler = (id) => {
    navigation.navigate("Place Details", { placeId: id });
  };
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet. Start adding some right now!
        </Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        style={styles.list}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceItem place={item} onSelect={selectPlaceHandler} />
        )}
      />
    </View>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  fallbackText: {
    fontSize: 24,
    fontFamily: "unbounded-500",
    lineHeight: 36,
    color: GlobalStyles.colors.black,
  },
  list: {
    margin: 12,
  },
});
