import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { STABILITY_API_KEY, OPENAI_API_KEY } from "@env";
import Prompt from "./components/Prompt";
import DisplayImage from "./components/DisplayImage";
import Navbar from "./components/Navbar";
import { useNavigation } from "@react-navigation/native";
import image from "../assets/Frame3.png";

export default function Home({ userData }) {
  const navigation = useNavigation();
  const [prompt, onChangePrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("stable-diffusion-v1-6");

  const image = "../assets/Frame3.png";

  const [imagePlaceholder, setImagePlaceholder] = useState(image);

  // const engineId = "stable-diffusion-v1-6";
  // const apiKey = STABILITY_API_KEY;
  const apiHost = "https://api.stability.ai";

  if (!STABILITY_API_KEY) throw new Error("Missing Stability API key.");
  if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API key.");

  const generateImage = async (inputPrompt) => {
    try {
      if (selectedModel === "stable-diffusion-v1-6") {
        onChangePrompt(`${inputPrompt}`);
        setLoading(true);
        const engineId = selectedModel;
        const response = await fetch(
          `${apiHost}/v1/generation/${engineId}/text-to-image`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${STABILITY_API_KEY}`,
            },
            body: JSON.stringify({
              text_prompts: [
                {
                  text: inputPrompt,
                },
              ],
              cfg_scale: 7,
              height: 1024,
              width: 1024,
              steps: 30,
              samples: 1,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const responseJSON = await response.json();
        const imageData = responseJSON.artifacts[0]?.base64 || "";
        setResult(`data:image/png;base64,${imageData}`);
      } else if (selectedModel === "openai") {
        onChangePrompt(`${inputPrompt}`);
        setLoading(true);
        const response = await fetch(
          "https://api.openai.com/v1/images/generations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              // model: "dall-e-3",
              prompt: inputPrompt,
              n: 1,
              size: "1024x1024",
              quality: "hd",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${await response.text()}`);
        }

        const data = await response.json();
        const imageData = data.data[0].url;
        setResult(imageData);
        console.log(imageData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <View className="pt-12 bg-[#111111] flex h-full justify-between">
        <Navbar
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          userData={userData}
        />

        <View className="relative">
          <DisplayImage
            loading={loading}
            result={result}
            imagePlaceholder={imagePlaceholder}
          />
        </View>
        <View>
          <Prompt
            prompt={prompt}
            onChangePrompt={onChangePrompt}
            generateImage={generateImage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
