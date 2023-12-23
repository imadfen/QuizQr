import { useEffect } from "react";

export default function InstuctionsSection() {
  useEffect(() => {
    let count = 0;
    setInterval(() => {
      if (count === 4) count = 0;

      const list = document.getElementById(`step-${count}`);
      if (list) {
        list.style.transform = "scale(1.2)";
        setTimeout(() => {
          list.style.transform = "scale(1)";
        }, 2000);
        count++;
      }
    }, 2000);
  }, []);

  return (
    <div className="p-12 bg-purple-950 text-yellow-500 rounded-2xl drop-shadow-2xl">
      <h1 className="text-6xl font-extrabold mb-10">How to play ?</h1>
      <ol className="flex flex-col gap-3 text-2xl font-bold">
        <li id="step-0" className="duration-200 w-fit">
          1- Scan the given Qr code.
        </li>
        <li id="step-1" className="duration-200 w-fit">
          2- Follow the link you got on scan.
        </li>
        <li id="step-2" className="duration-200 w-fit">
          3- Insert your name.
        </li>
        <li id="step-3" className="duration-200 w-fit">
          4- Have fun.
        </li>
      </ol>
    </div>
  );
}
