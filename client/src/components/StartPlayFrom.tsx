import { useForm } from "react-hook-form";
import { Theme } from "../types/Quiz";

type PropsType = {
  quizTitle: string;
  quizeTheme: Theme;
  setPlayer: (player: string) => void;
};

export default function StartPlayFrom({
  quizTitle,
  quizeTheme,
  setPlayer,
}: PropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  return (
    <form
      className="flex flex-col justify-center w-full min-h-screen p-10 md:px-[20%] shadow-2xl rounded-xl"
      style={{ background: quizeTheme.background, color: quizeTheme.text }}
      onSubmit={handleSubmit((data) => setPlayer(data.name))}
    >
      <h1 className="text-3xl sm:text-5xl font-black">PLAY THIS QUIZ</h1>
      <h2 className="text-2xl sm:text-4xl font-black">{quizTitle}</h2>
      <div className="flex flex-col items-center font-bold w-full px-5 mt-5">
        <label htmlFor="name" className="text-xl">
          Enter your name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          className="text-center font-extrabold text-black border-4 outline-transparent text-lg w-full mt-3 py-2 rounded-xl"
          style={{ borderColor: quizeTheme.text }}
          {...register("name", { required: "please insert your full name" })}
        />
        <span className="text-red-400">{errors.name?.message}</span>
        <input
          type="submit"
          value="Start Play"
          className="my-5 w-full py-3 text-white text-lg font-extrabold bg-green-500 cursor-pointer"
        />
      </div>
    </form>
  );
}
