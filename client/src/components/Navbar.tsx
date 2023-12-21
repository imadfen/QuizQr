import QuizQr_logo from "../assets/quizQrLogo.png"

export default function Navbar() {
  return (
    <nav className="bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-5">
        <img src={QuizQr_logo} alt="" width={60} />
        <div className="text-white text-3xl font-bold">QuizQr</div>
      </div>
    </nav>
  );
}
