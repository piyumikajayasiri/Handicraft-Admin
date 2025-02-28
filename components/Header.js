import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Logo from "../public/images/logo-color.png";
import Image from "next/image";
const Header = () => {
  const { data: session } = useSession();
  if (!session)
    return (
      <>
        <div className="flex justify-between items-center px-6 py-4 bg-[#306A9F]">
          <div>
            <Image className="w-20 h-20" src={Logo} alt="Logo Image" />
          </div>
          <button
            onClick={() => signIn("google")}
            className="bg-white rounded-lg px-4 p-2"
          >
            Login With Google
          </button>
        </div>
      </>
    );
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#306A9F]">
      <div>
        <Image className="w-20 h-20" src={Logo} alt="Logo Image" />
      </div>
      <div>
        <button
          className="bg-[#D0A7A7] px-4 py-2 rounded-lg text-sm font-semibold"
          onClick={() => signOut("google")}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
