import { useEffect, useState } from "react";
import { serverUrl } from "../utils/serverUrl";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ClientRandomQuizQrCode() {
  const [qrCodeFileName, setQrCodeFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${serverUrl}/get-qr-quiz`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError(true);
        }
      })
      .then((data: { qrcode: string | null }) => {
        setQrCodeFileName(data.qrcode);
      })
      .catch((_) => {
        setError(true);
      });
    setLoading(false);
  }, []);

  return (
    <div className="p-10 flex flex-col items-center shadow-2xl">
      {error ? (
        <p className="text-xl text-red-400 font-bold">
          Something went wrong, try again later
        </p>
      ) : loading ? (
        <Icon icon="line-md:loading-loop" width={60} />
      ) : qrCodeFileName === null ? (
        <div className="text-xl text-green-500 font-bold text-center">
          <p>No quizzes availlable at the moment</p>
          <p>go back later</p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold">Your Quiz Is Here</h1>
          <img
            src={`${serverUrl}/qrcode/${qrCodeFileName}`}
            className="w-full"
          />
          <h2 className="text-3xl font-bold">Scan Me To Play</h2>
        </>
      )}
    </div>
  );
}
