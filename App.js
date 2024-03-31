import Home from "./src/Home";
import Settings from "./src/Settings";
import { React, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageGallery from "./src/components/ImageGallery";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Gallery" component={ImageGallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function HomeWrapper() {
//   return (
//     <SafeAreaView>
//       <Home />
//     </SafeAreaView>
//   );
// }
