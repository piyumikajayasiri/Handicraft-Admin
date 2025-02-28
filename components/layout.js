import Header from "./Header";
import Navbar from "./Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Header />
        <div className="bg-[#DEB038] min-h-screen flex">
          <Navbar />
          <div className="bg-white flex-grow mt-1 mr-2 rounded-lg p-4 mb-2">
            {children}
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center ">
      <div className="text-center w-full">
        <button
          onClick={() => signIn("google")}
          className="bg-white rounded-lg px-4 p-2"
        >
          Login With Google
        </button>
      </div>
    </div>
  );
}
