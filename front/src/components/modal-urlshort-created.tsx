import { HiCheckCircle, HiOutlineX } from "react-icons/hi";
import API_BASE_URL_FRONTEND from "../../env.ts";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative transform transition-transform duration-300 ease-out scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={() => props.setIsModalUrlShortCreated(false)}
          >
            <HiOutlineX className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-center">
            <HiCheckCircle className="h-16 w-16 text-green-500 mb-4" />
          </div>
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Sua URL Encurtada
          </h3>
          <p className="text-center text-gray-500 mb-6">
            Utilize a URL abaixo para compartilhar o link:
          </p>
          <div className="flex items-center border rounded-lg p-3 mb-6 bg-gray-100">
            <input
              type="text"
              readOnly
              value={API_BASE_URL_FRONTEND + props.shortURL}
              className="flex-grow text-gray-700 bg-transparent focus:outline-none"
              placeholder={API_BASE_URL_FRONTEND + props.shortURL}
              disabled
            />
            <button
              onClick={handleCopy}
              className="text-blue-500 hover:text-blue-700 font-bold ml-4"
            >
              Copiar
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={() => props.redirectURL()}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              Ir para a URL encurtada!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
