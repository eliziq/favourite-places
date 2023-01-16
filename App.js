import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { GlobalStyles } from "./constants/styles";
import { init } from "./util/database";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbIsLoaded, setDbIsLoaded] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [fontsLoaded] = useFonts({
    "unbounded-300": require("./assets/fonts/Unbounded-Light.ttf"),
    "unbounded-400": require("./assets/fonts/Unbounded-Regular.ttf"),
    "unbounded-500": require("./assets/fonts/Unbounded-SemiBold.ttf"),
  });
  if (!fontsLoaded || !dbIsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.beige },
            headerTitleStyle: {
              fontFamily: "unbounded-400",
              fontSize: 20,
            },
            headerTintColor: GlobalStyles.colors.black,
            headerTitleAlign: "center",
            contentStyle: { backgroundColor: GlobalStyles.colors.beige },
          }}
        >
          <Stack.Screen
            name="All Places"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("Add Place")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Add Place"
            component={AddPlace}
            // options={{ title: "Add Place" }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerStyle: { backgroundColor: GlobalStyles.colors.mapBeige },
            }}
          />
          <Stack.Screen
            name="Place Details"
            component={PlaceDetails}
            options={{ title: "Place Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
