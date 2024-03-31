import React from "react";
import { Text, Linking, Pressable, View } from "react-native";

const ExternalLink = (props) => {
  const { url, children = {} } = props;

  const onPress = () =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  return (
    <View>
      <Pressable className="flex-row" onPress={onPress}>
        {children}
      </Pressable>
    </View>
  );
};

export default ExternalLink;
