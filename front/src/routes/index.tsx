import { FormEvent, useState } from "react";
import { urlServer } from "../server/url-server";
import ModalUrlShortCreated from "../components/modal-urlshort-created";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [urlOriginal, setUrlOriginal] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [isModalUrlShortCreated, setIsModalUrlShortCreated] = useState(false);
  const navigate = useNavigate();

  async function createShortURL(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await urlServer.createShortCode(urlOriginal);
      setShortURL(response.shortUrl);
      setIsModalUrlShortCreated(true);
    } catch (error) {
      console.error("Erro ao criar URL curta:", error);
    }
  }

  const redirectURL = () => {
    navigate(`/${shortURL}`);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen w-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Encurte sua URL
          </h1>

          <form id="url-form" className="space-y-6" onSubmit={createShortURL}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL Original
              </label>
              <input
                type="url"
                id="originalUrl"
                name="originalUrl"
                required
                onChange={(event) => setUrlOriginal(event.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-purple-700 transition duration-200"
            >
              Encurtar URL
            </button>
          </form>

          <div id="result" className="mt-8 hidden text-center">
            <p className="text-gray-700">Aqui está sua URL encurtada:</p>
            <a
              id="shortUrl"
              href="#"
              className="text-purple-600 underline font-semibold text-lg mt-2 inline-block"
            ></a>
          </div>
        </div>
      </div>
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
