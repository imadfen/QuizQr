import InstuctionsSection from "../components/InstuctionsSection";
import ClientRandomQuizQrCode from "../components/ClientRandomQuizQrCode";


export default function Home() {
  
  return (
    <div className="flex flex-col-reverse md:flex-row w-full min-h-full my-10 items-stretch justify-center gap-20">
      <InstuctionsSection />
      <ClientRandomQuizQrCode />
    </div>
  );
}
