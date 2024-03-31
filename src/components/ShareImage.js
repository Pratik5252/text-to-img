import { View, Text, Pressable, Share } from "react-native";
import React from "react";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Feather } from "@expo/vector-icons";

export default function ShareImage({ result }) {
  const handleShare = async () => {
    if (!result) {
      console.log("Image Error");
    }
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      const fileUri = `${FileSystem.documentDirectory}tempShareImage.png`;
      const base64Data = result.replace(/^data:image\/png;base64,/, "");
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      if (isAvailable) {
        await Sharing.shareAsync(fileUri);
        console.log("Share success!");
      } else {
        console.log("Sharing feature not available on this device");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };
  return (
    <View>
      <Pressable className="rounded-lg bg-black/90 p-2" onPress={handleShare}>
        <Text>
          <Feather name="share" size={20} color="white" />
        </Text>
      </Pressable>
    </View>
  );
}
