import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Encurte sua URL
          </h1>

          <form id="url-form" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL Original
              </label>
              <input
                type="url"
                id="originalUrl"
                name="originalUrl"
                required
                className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://example.com"
              ></input>
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
    </>
  );
}

export default App;
