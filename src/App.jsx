import { useState, useEffect } from "react";
import instance from "./api/api_instance.js";

function App() {
  const [status, setStatus] = useState("LOADING");
  const [bakupError, setbakupError] = useState("");
  const [info, setInfo] = useState("ETL Data To MongoDB");
  const version = __APP_VERSION__;

  useEffect(() => {
    const callServerlessAwake = async () => {
      try {
        await instance({
          url: "/",
          method: "GET",
        }).then((response) => {
          setStatus(response.data);
        });
      } catch (e) {
        setStatus(JSON.stringify(e));
      }
    };
    callServerlessAwake();
  }, []);

  const handleSubmit = async () => {
    setInfo("Backup Starting");
    await instance({
      url: "/expense/transferData",
      method: "POST",
    })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          setInfo("Backup Complete");
          setTimeout(() => {
            setInfo("ETL Data To MongoDB");
          }, 500);
        }
      })
      .catch((error) => {
        setbakupError(JSON.stringify(error));
      });
  };

  return (
    <main className="container flex flex-col justify-center items-center gap-12 h-screen">
      <h1 className="text-3xl font-bold">{status}</h1>
      <button
        onClick={handleSubmit}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        {info}
      </button>
      <h6 className="font-bold">{bakupError}</h6>
      <span>Version:{version}</span>
    </main>
  );
}

export default App;
