import Link from "next/link";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";

export const Footer = () => {
  return (
    <footer className="border-t-[3px] border-border-color bg-theme-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brutal-yellow border-3 border-brutal-border flex items-center justify-center shadow-brutal-sm">
                <span className="font-heading font-black text-brutal-border">M</span>
              </div>
              <span className="font-heading font-black text-xl uppercase">MessApp</span>
            </div>
            <p className="font-bold max-w-sm">
              The brutalist approach to managing your canteen operations. Smart, simple, and unashamedly bold.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-bold text-lg uppercase bg-theme-primary px-2 py-1 w-fit border-2 border-border-color shadow-brutal-sm mb-2">Links</h3>
            <Link href="/home" className="hover:underline font-bold decoration-2 underline-offset-2">Home</Link>
            <Link href="/home#features" className="hover:underline font-bold decoration-2 underline-offset-2">Features</Link>
            <Link href="/home#contact" className="hover:underline font-bold decoration-2 underline-offset-2">Contact</Link>
            <Link href="/login" className="hover:underline font-bold decoration-2 underline-offset-2 text-brutal-pink">Login Portal</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-lg uppercase bg-brutal-cyan text-brutal-border px-2 py-1 w-fit border-2 border-border-color shadow-brutal-sm mb-2">Socials</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 border-2 border-border-color bg-white text-brutal-border hover:bg-theme-primary hover:shadow-brutal transition-all hover:-translate-y-1 rounded-sm">
                <FiTwitter size={24} className="stroke-[2.5]" />
              </a>
              <a href="#" className="p-2 border-2 border-border-color bg-white text-brutal-border hover:bg-theme-primary hover:shadow-brutal transition-all hover:-translate-y-1 rounded-sm">
                <FiGithub size={24} className="stroke-[2.5]" />
              </a>
              <a href="#" className="p-2 border-2 border-border-color bg-white text-brutal-border hover:bg-theme-primary hover:shadow-brutal transition-all hover:-translate-y-1 rounded-sm">
                <FiInstagram size={24} className="stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t-3 border-dashed border-border-color flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold">© {new Date().getFullYear()} MessApp. All rights reserved.</p>
          <p className="font-bold flex items-center gap-2">
            Built by <span className="text-brutal-pink px-2 py-0.5 border-2 border-border-color bg-white shadow-[2px_2px_0px_#000]"><a target="_blank" href="https://www.linkedin.com/in/alwin-k-g">Alwin K G</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
};
