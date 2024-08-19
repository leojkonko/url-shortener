import { colors } from "@/styles/color";
import { CircleCheck, Copy, X } from "lucide-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface ModalUrlShortCreatedProps {
  shortURL: string;
  redirectURL: () => void;
  setIsModalUrlShortCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalUrlShortCreated(props: ModalUrlShortCreatedProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(props.shortURL);
    alert("URL copiada!");
  };

  return (
    <>
      <View className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 h-full">
        <View className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative transform transition-transform duration-300 ease-out scale-100">
          <TouchableOpacity
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onPress={() => props.setIsModalUrlShortCreated(false)}
          >
            <X className="h-6 w-6" />
          </TouchableOpacity>
          <View className="flex items-center justify-center">
            <CircleCheck className="h-16 w-16 text-green-500 mb-4" />
          </View>
          <Text className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Sua URL Encurtada
          </Text>
          <Text className="text-center text-gray-500 mb-6 text-base">
            Utilize a URL abaixo para compartilhar o link:
          </Text>
          <View className="flex items-center border rounded-lg p-3 mb-6 bg-gray-100">
            <TextInput
              readOnly
              value={"http://192.168.1.8:3333/" + props.shortURL}
              className="flex-grow text-gray-700 bg-transparent focus:outline-none text-lg"
              placeholder={"http://192.168.1.8:3333/" + props.shortURL}
            />
            <TouchableOpacity
              onPress={handleCopy}
              className="bg-purple-500 px-4 py-2 rounded-full flex flex-row justify-center items-center space-x-2 mt-3"
            >
              <Copy className="h-6 w-6" color={colors.zinc[100]} />
              <Text className="text-white">Copiar</Text>
            </TouchableOpacity>
          </View>
          <View className="text-center">
            <TouchableOpacity
              onPress={() => props.redirectURL()}
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              <Text className="w-full text-center text-lg text-white">
                {" "}
                Ir para a URL encurtada!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
