import { View, Text, Image, Linking, Pressable, Alert } from "react-native";
import { React, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { STABILITY_API_KEY, OPENAI_API_KEY } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ExternalLink from "./components/external-link";
import { Skeleton } from "moti/skeleton";

export default function Settings() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiHost = "https://api.stability.ai";

  if (!STABILITY_API_KEY) throw new Error("Missing Stability API key.");

  const url1 = "https://dreamstudio.ai/account";

  const opneUrl = async (url1) => {
    const isOpen = await Linking.canOpenURL(url1);
    if (isOpen) {
      await Linking.openURL(url1);
    } else {
      Alert.alert("error");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiHost}/v1/user/account`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${STABILITY_API_KEY}`,
          },
        });

        const resBalance = await fetch(`${apiHost}/v1/user/balance`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${STABILITY_API_KEY}`,
          },
        });

        if (!response.ok && !resBalance.ok) {
          throw new Error(`Non-200 response: ${await response.text()}`);
        }
        const userData = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUserData(userData);
        const userBalance = await resBalance.json();
        setUserBalance(userBalance);

        // console.log(userData);
        // console.log(userBalance);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  return (
    <SafeAreaView className="bg-[#111111]">
      <View className="p-2 w-screen h-screen bg-[#111111]">
        {/* {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>} */}
        <View>
          <Text className="text-white/95 font-medium text-5xl pt-12 pb-8">
            Account
          </Text>
        </View>
        <Skeleton.Group>
          {/* {userData && userBalance && ( */}
          <>
            <Skeleton show={userData == null} height={140}>
              <View className="border-[2px] bg-white/10 border-white/30 rounded-xl flex-row py-8 px-2 items-center">
                {userData && (
                  <Image
                    source={{ uri: userData.profile_picture }}
                    style={{ width: 96, height: 96, borderRadius: 100 }}
                  />
                )}

                <View className="flex-col gap-y-2 pl-8">
                  {userData && (
                    <Text className="text-white/90 font-medium text-4xl">
                      {userData.organizations[0].name}
                    </Text>
                  )}
                  {userData && (
                    <Text className="text-white/80 text-s font-light">
                      {userData.email}
                    </Text>
                  )}
                </View>
              </View>
            </Skeleton>

            <View className=" pt-8">
              <Text className="text-white/95 font-medium text-3xl mb-2">
                Balance
              </Text>
              <Skeleton show={userData == null}>
                <View className="flex-row flex-wrap items-center py-6 border-[2px] bg-white/10 border-white/30 rounded-xl justify-between drop-shadow-md">
                  <View className="flex-row flex-wrap items-baseline px-4">
                    {userBalance && (
                      <Text className="text-white/90 text-4xl font-medium">
                        {Math.round(userBalance.credits * 10) / 10}
                      </Text>
                    )}
                    <Text className="text-white/80 font-light text-xs pl-2">
                      credits
                    </Text>
                  </View>
                  <Pressable
                    className="px-4"
                    onPress={() => {
                      opneUrl(url1);
                    }}
                  >
                    <Feather name="plus-square" size={40} color="white" />
                  </Pressable>
                </View>
              </Skeleton>
            </View>

            <View className="mt-12 w-44">
              <View>
                <ExternalLink url="https://platform.stability.ai/docs/api-reference#tag/User/operation/userAccount">
                  <View className="flex-row items-baseline border-b-4 border-white">
                    <Text className="text-white/90 text-2xl font-light mr-4">
                      Document
                    </Text>
                    <Feather name="external-link" size={24} color="white" />
                  </View>
                </ExternalLink>
              </View>
              <View className="flex-row items-baseline py-2 gap-x-4  mt-4 ">
                <Text className="text-white/90 text-2xl font-light">
                  Logout
                </Text>
                <Feather name="log-out" size={24} color="white" />
              </View>
            </View>
          </>
          {/* )} */}
        </Skeleton.Group>
      </View>
    </SafeAreaView>
  );
}
