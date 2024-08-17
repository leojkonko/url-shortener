import { useEffect } from "react";
import { urlServer } from "../server/url-server";
import { useParams } from "react-router-dom";

export default function RouteDetail() {
  const shortUrl = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (shortUrl.shortCode) {
        try {
          const response = await urlServer.getRedirect(shortUrl.shortCode);
          window.location.href = response.originalUrl;
        } catch (error) {
          console.error("Erro ao obter redirecionamento:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen w-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex items-center flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Estamos redirecionando você para a URL original!
        </h1>
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
