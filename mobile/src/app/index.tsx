import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import Loader from "./loader";
import ModalUrlShortCreated from "./components/modal-urlshort-created";
import { urlServer } from "@/server/url-server";

export default function Index() {
  const [urlOriginal, setUrlOriginal] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [isModalUrlShortCreated, setIsModalUrlShortCreated] = useState(false);

  async function createShortURL(event: GestureResponderEvent) {
    const isURL = isValidURL(urlOriginal);
    if (isURL) {
      try {
        const response = await urlServer.createShortCode(urlOriginal);
        setShortURL(response.shortUrl);
        setIsModalUrlShortCreated(true);
      } catch (error) {
        console.error("Erro ao criar URL curta:", error);
      }
    } else {
      Alert.alert("url inválida", "escreva assim: http://example.com");
    }
  }

  function isValidURL(url: string) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  const redirectURL = () => {
    return router.push("/detail/" + shortURL);
  };

  // if (isGettingTrip) {
  //   return <Loader />;
  // }
  return (
    <>
      <View className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen w-screen flex items-center justify-center">
        <View className=" rounded-lg shadow-lg p-8 max-w-md w-full">
          <Text className="text-3xl font-bold text-white mb-6 text-center">
            Encurte a sua URL
          </Text>

          <View id="url-form" className="space-y-6"></View>
          <View>
            <Text className="block w-full text-center font-medium text-gray-100 text-lg">
              URL Original (escreva com http://)
            </Text>
            <TextInput
              keyboardType="url"
              placeholderTextColor="black"
              onChangeText={(text) => setUrlOriginal(text)}
              className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="http://example.com"
            ></TextInput>
          </View>

          <TouchableOpacity
            onPress={createShortURL}
            className="w-full bg-purple-600  py-3 rounded-md font-semibold text-lg hover:bg-purple-700 transition duration-200 mt-4"
          >
            <Text className="text-white w-full text-center text-lg">
              Encurtar URL
            </Text>
          </TouchableOpacity>
        </View>

        <View id="result" className="mt-8 hidden text-center">
          <Text className="text-gray-100">Aqui está sua URL encurtada:</Text>
          <Link
            id="shortUrl"
            href="#"
            className="text-purple-600 underline font-semibold text-lg mt-2 inline-block"
          ></Link>
        </View>
      </View>
      {isModalUrlShortCreated && (
        <ModalUrlShortCreated
          shortURL={shortURL}
          redirectURL={redirectURL}
          setIsModalUrlShortCreated={setIsModalUrlShortCreated}
        />
      )}
    </>
  );
}
