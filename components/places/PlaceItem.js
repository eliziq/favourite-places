import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.desc}>{place.description}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.transparentWhite,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.violet,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 6,
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
  title: {
    fontFamily: "unbounded-500",
    fontSize: 18,
    color: GlobalStyles.colors.black,
    
  },
  desc: {
    fontFamily: "unbounded-400",
    fontSize: 14,
    color: GlobalStyles.colors.black,
  },
  address: {
    fontFamily: "unbounded-300",
    fontSize: 12,
    color: GlobalStyles.colors.black,
  },
});
