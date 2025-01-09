"use client";
// Dependencies
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

function SideBar({ handleClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-between">
      <div
        className="absolute w-full h-full bg-black/50 -z-10"
        onClick={handleClose}
      ></div>
      <div className="h-full w-[80%] max-w-[300px] flex bg-white text-black">
        <ul className="flex flex-col gap-5 cursor-pointer">
          <li>Home</li>
          <li>Movies</li>
          <li>Contact Us</li>
          <li>Blog</li>
        </ul>
      </div>
    </div>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-5 bg-[#2b4455] text-white">
      <div>
        <p className="text-2xl font-bold">Rendezvous</p>
      </div>
      <div className="hidden md:block">
        <ul className="flex gap-5 cursor-pointer">
          <li>Home</li>
          <li>Movies</li>
          <li>Contact Us</li>
          <li>Blog</li>
        </ul>
      </div>
      <div className="block md:hidden">
        <Bars3Icon className="h-6 w-6" onClick={() => setIsOpen(!isOpen)} />
        {isOpen && <SideBar handleClose={() => setIsOpen(false)} />}
      </div>
    </nav>
  );
}
