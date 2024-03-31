import { View, Text, Image, ActivityIndicator } from "react-native";
import { React, useState } from "react";
import Download from "./Download";
import Share from "./ShareImage";
// import {DoubleBounce}  from 'react-native-loader';

export default function DisplayImage({ loading, result, imagePlaceholder }) {
  const [isImageFromOpenAI, setIsImageFromOpenAI] = useState(false);
  return (
    <View>
      <View className=" relative flex justify-center items-center align-middle mt-3">
        {loading ? (
          <View className="absolute z-10">
            <ActivityIndicator size="large" color="#1e1e1e" />
          </View>
        ) : (
          <></>
        )}
        {result.length > 0 ? (
          <>
            <Image
              className="w-80 h-80 resize rounded-lg align-middle"
              source={{ uri: result }}
            />

            <View className="absolute bottom-4 right-12 gap-2 flex-row">
              <View>
                <Download
                  result={result}
                  isImageFromOpenAI={isImageFromOpenAI}
                />
              </View>
              <View>
                <Share result={result} isImageFromOpenAI={isImageFromOpenAI} />
              </View>
            </View>
          </>
        ) : (
          // <></>
          <>
            <Image
              className="w-80 h-80 resize align-middle bg-white rounded-lg"
              source={{ uri: imagePlaceholder }}
            />
          </>
          // <View>
          //   <Text className="text-5xl text-white">Welcome</Text>
          // </View>
        )}
      </View>
    </View>
  );
}
