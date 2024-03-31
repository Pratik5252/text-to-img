import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function Navbar({ selectedModel, setSelectedModel }) {
  const navigation = useNavigation();

  return (
    <View className="w-full h-20 flex-row justify-between items-center px-4">
      <LinearGradient
        colors={["#434348", "#47474A"]}
        className="rounded-full border border-gray-300"
        start={{ x: -0.4, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="border-[2px] rounded-full w-48">
          {/* <Text>flex-row justify-between items-center px-2</Text> */}
          <Picker
            style={{ color: "white" }}
            dropdownIconColor={"white"}
            selectedValue={selectedModel}
            dropdo
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) =>
              setSelectedModel(itemValue)
            }
          >
            <Picker.Item
              label="Stable-Diffusion"
              value="stable-diffusion-v1-6"
            />
            <Picker.Item label="OpenAI" value="openai" />
          </Picker>
        </View>
      </LinearGradient>
      <View>
        <Pressable onPress={() => navigation.navigate("Gallery")}>
          <MaterialIcons name="collections" size={24} color="white" />
        </Pressable>
      </View>
      <View className="">
        <>
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings" size={32} color="#eeeeee" />
          </Pressable>
        </>
      </View>
    </View>
  );
}
