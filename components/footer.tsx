import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="bg-black flex flex-col justify-between items-center text-white p-5 ">
      <div className="flex justify-between w-full py-60 flex-col md:flex-row explore">
        <div className="grid grid-cols-3 gap-24 md:w-4/5 ">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#423f3f] font-bold">Shop</h2>
            <ul className="flex flex-col gap-1.5">
              <li className="cursor-pointer hover:text-slate-200">All </li>
              <li className="cursor-pointer hover:text-slate-200">Lemon </li>
              <li className="cursor-pointer hover:text-slate-200">Coconut </li>
              <li className="cursor-pointer hover:text-slate-200">
                Citronella{" "}
              </li>
              <li className="cursor-pointer hover:text-slate-200">Perfume </li>
              <li className="cursor-pointer hover:text-slate-200">Lavender </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 ">
            <h2 className="text-[#423f3f] ">About</h2>
            <ul className="flex flex-col gap-1.5">
              <li className="cursor-pointer hover:text-slate-200">
                Vision and mission
              </li>
              <li className="cursor-pointer hover:text-slate-200">Our story</li>
              <li className="cursor-pointer hover:text-slate-200">
                <Link href={"/founder"}>Founder</Link>{" "}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[#423f3f]">Support area</h2>
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer hover:text-slate-200">
                <Link href={"/contact"}>Contact</Link>{" "}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 ">
            <h2 className="text-[#423f3f] ">Legal</h2>
            <ul className="flex flex-col gap-1.5">
              <li className="cursor-pointer hover:text-slate-200">
                Privacy policy
              </li>
              <li className="cursor-pointer hover:text-slate-200">
                Terms and conditions
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 ">
            <h2 className="text-[#423f3f] ">Social</h2>
            <ul className="flex flex-col gap-1.5">
              <li className="cursor-pointer hover:text-slate-200">Instagram</li>
              <li className="cursor-pointer hover:text-slate-200">Facebook</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-10 md:mt-0">
          <h2 className="text-[#423f3f] ">Want to stay updated?</h2>
          <p className="w-80">
            Join the KSB community and be the first recieve exlusive news on
            product updates, limited editions and many other benefits.
          </p>
          <input
            type="text"
            placeholder="Enter your email"
            className="rounded-full p-2 px-4 outline-none  bg-[#1d1c1c]"
          />
          <Button className="rounded-full p-2  text-black bg-white hover:bg-[#f1e6e9] w-24">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-start w-full gap-x-80">
        <p>
          © {new Date().getFullYear()} KUSSA SHEA BLISS. All rights reserved.
        </p>
        <p>Effortless journey to a healthy skin.</p>
      </div>
    </div>
  );
}
