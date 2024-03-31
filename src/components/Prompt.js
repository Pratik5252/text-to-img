import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

export default function Prompt({ prompt, onChangePrompt, generateImage }) {
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "android" ? "padding" : "height"}
    // >
    <View className="inset-x-0 pb-8">
      <View className="flex-row justify-center  mx-2 border-[1px] py-2 border-gray-300 bg-white/20 rounded-full">
        <View className="">
          <TextInput
            onChangeText={onChangePrompt}
            className="w-72 h-16 px-4 flex text-white"
            value={prompt}
            placeholder="Enter a Prompt"
            autoCorrect={true}
            editable={true}
            placeholderTextColor={"#BBBBBB"}
          />
        </View>
        <View className="pr-4">
          <Pressable
            className="rounded-full w-20 h-16 bg-[#EEEEEE] active:bg-[#DDDDDD] justify-center items-center "
            onPress={() => {
              generateImage(prompt), onChangePrompt("");
            }}
          >
            <Text className="">
              <Feather name="send" size={32} color="black" />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     marginTop: "75%",
//   },

//   bottom: {
//     flexDirection: "column",
//     justifyContent: "flex-end",
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "black",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   textinput: {
//     border: "solid black 2px",
//     borderColor: "black",
//     backgroundColor: "white",
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "white",
//   },
//   text: {
//     margin: 20,
//     color: "black",
//   },
// });
