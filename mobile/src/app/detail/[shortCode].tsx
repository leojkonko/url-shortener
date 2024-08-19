import { urlServer } from "@/server/url-server";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Linking, Text, View } from "react-native";

export default function Detail() {
  const shortUrl = useLocalSearchParams<{ shortCode: string }>();
  useEffect(() => {
    const fetchData = async () => {
      if (shortUrl.shortCode) {
        try {
          const response = await urlServer.getRedirect(shortUrl.shortCode);
          await Linking.openURL(response.originalUrl);
        } catch (error) {
          console.error("Erro ao obter redirecionamento:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen w-screen flex items-center justify-center">
      <View className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex items-center flex-col">
        <Text className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Estamos redirecionando você para a URL original!
        </Text>
        <View className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></View>
      </View>
    </View>
  );
}
