import { View, Text, Pressable } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";

export default function Download({ result }) {
  const handleDownloadImage = async () => {
    if (!result) return;

    try {
      const filename = `myGeneratedImage_${Date.now()}.png`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const base64Data = result.replace(/^data:image\/png;base64./, "");
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(fileUri);
      //   console.log(base64Data);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Storage permission not granted!");
        return;
      }
      const { get_file } = await FileSystem.getInfoAsync(fileUri);
      if (!get_file) {
        alert("Image downloaded successfully!");
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image.");
    }
  };
  return (
    <View>
      <Pressable
        className="rounded-lg bg-black/90 p-2"
        onPress={handleDownloadImage}
      >
        <Text>
          <Feather name="download" size={20} color="white" />
        </Text>
      </Pressable>
    </View>
  );
}
