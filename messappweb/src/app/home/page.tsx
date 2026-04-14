import Link from "next/link";
import { FiCheckCircle, FiShield, FiTrendingUp } from "react-icons/fi";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden border-b-[4px] border-border-color bg-brutal-pink">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23111111\\' fill-opacity=\\'0.1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="inline-block py-1 px-3 border-3 border-brutal-border bg-brutal-yellow uppercase font-heading font-black tracking-widest text-sm mb-6 shadow-brutal-sm rotate-[-2deg] animate-bounce-brutal">
            Revolutionizing Canteen Management
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-6 uppercase text-white drop-shadow-[4px_4px_0_#111]">
            <span className="block">Smart Mess</span>
            <span className="block text-brutal-yellow">Management</span>
          </h1>
          <p className="text-xl md:text-2xl font-body font-bold text-white max-w-3xl mb-10 drop-shadow-[2px_2px_0_#111]">
            A purely brutalist answer to the absolute chaos of managing mess halls. Quick QRs, automated billing, and a bold attitude.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login">
              <button className="brutal-btn bg-brutal-yellow text-brutal-border hover:bg-white text-lg">
                User Portal
              </button>
            </Link>
            {/* <Link href="/admin/login">
              <button className="brutal-btn bg-white text-brutal-border hover:bg-brutal-cyan text-lg">
                Admin Area
              </button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-theme-card border-b-4 border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase inline-block border-b-8 border-brutal-yellow pb-2">
              Features
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "QR Code Scanning", desc: "Instantly record attendance using unique user QR codes generated on login.", icon: FiCheckCircle, color: "bg-brutal-pink" },
              { title: "Automated Billing", desc: "No more manual calculators. Monthly bills generated at the click of a button based on attendance.", icon: FiTrendingUp, color: "bg-brutal-yellow" },
              { title: "Role-Based Access", desc: "Strict separation between users and admins. We keep your data secure.", icon: FiShield, color: "bg-brutal-cyan" },
              { title: "Dynamic Pricing", desc: "Set different prices for different meal types (breakfast, lunch, dinner).", icon: FiTrendingUp, color: "bg-brutal-green" },
              { title: "Real-time Tracking", desc: "Monitor daily attendance in the admin dashboard instantly.", icon: FiCheckCircle, color: "bg-white" },
              { title: "Cloud Synced", desc: "Stored securely on the backend with .NET Core EF architecture.", icon: FiShield, color: "bg-gray-200" }
            ].map((feature, idx) => (
              <div key={idx} className={`border-3 border-border-color shadow-brutal p-8 ${feature.color} hover:shadow-brutal-lg hover:translate-y-[-4px] transition-all rounded-sm`}>
                <feature.icon size={48} className="mb-6 stroke-[2] drop-shadow-[2px_2px_0_#111]" />
                <h3 className="text-2xl font-heading font-black uppercase mb-4 text-brutal-border">{feature.title}</h3>
                <p className="font-bold text-brutal-border">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-brutal-yellow border-b-4 border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="border-4 border-brutal-border bg-white shadow-[12px_12px_0_#000] p-8 aspect-square relative flex items-center justify-center -rotate-1">
              <div className="absolute inset-0 pattern-dots-md text-gray-200"></div>
              <h1 className="text-6xl md:text-8xl font-heading font-black text-black text-center z-10 leading-none">
                SIMPLY <br/> <span className="text-brutal-pink drop-shadow-[2px_2px_0_#111]">BETTER</span> <br/> MESS.
              </h1>
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mb-6 drop-shadow-[2px_2px_0_#111]">
                About MessApp
              </h2>
              <div className="font-bold text-lg text-black space-y-4 bg-white p-6 border-3 border-brutal-border shadow-brutal rounded-sm">
                <p>
                  Built by Alwin K G, MessApp is a brutalist, no-nonsense approach to managing canteen attendance and billing. 
                  We believe software should be bold, functional, and devoid of unnecessary fluff.
                </p>
                <p>
                  With robust backend architecture powered by SQL Server and .NET Core Entity Framework, alongside 
                  stored procedures for rapid bill generation, this system handles the heavy lifting so you don't have to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-theme-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase mb-4">Get In Touch</h2>
            <p className="font-bold text-lg text-gray-800 dark:text-gray-800">Have a question? Send it our way.</p>
          </div>
          
          <form className="brutal-card p-6 md:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Name" placeholder="John Doe" />
              <Input label="Email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-1.5 w-full">
              <label className="font-heading font-bold text-sm tracking-wide uppercase">Message</label>
              <textarea 
                className="w-full bg-theme-card text-foreground border-3 border-border-color shadow-brutal-sm px-4 py-3 font-body focus:outline-none focus:shadow-brutal focus:-translate-y-1 transition-all rounded-sm min-h-[150px]"
                placeholder="What's up?"
              ></textarea>
            </div>
            <Button type="button" className="w-full text-lg">Send Message</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
