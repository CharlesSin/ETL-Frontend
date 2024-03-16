import { useState, useEffect } from "react";
import instance from "./api/api_instance.js";

function App() {
  const [status, setStatus] = useState("LOADING");
  const [bakupError, setbakupError] = useState("");
  const [info, setInfo] = useState("ETL Data To MongoDB");
  const [show, setShow] = useState(false);
  const version = __APP_VERSION__;

  useEffect(() => {
    const callServerlessAwake = async () => {
      try {
        await instance({
          url: "/",
          method: "GET",
        }).then((response) => {
          show ? null : setShow(false);
          setStatus(response.data);
        });
      } catch (e) {
        setShow(true);
        setbakupError(JSON.stringify(e));
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
        if (response.status == 201) {
          setInfo("Backup Complete");
          setTimeout(() => {
            setInfo("ETL Data To MongoDB");
          }, 15000);
        }
      })
      .catch((error) => {
        setbakupError(JSON.stringify(error));
      });
  };

  return (
    <main className="container flex flex-col justify-center items-center gap-12 h-screen w-100">
      <h1 className="text-3xl font-bold">{status}</h1>
      <button
        onClick={handleSubmit}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        {info}
      </button>
      <a href="https://nest-backend-pxkl.onrender.com" target="_blank" className={show ? "block" : "hidden"}>
        https://nest-backend-pxkl.onrender.com
      </a>
      <span className="font-bold">{bakupError}</span>
      <span>Version:{version}</span>
    </main>
  );
}

export default App;
