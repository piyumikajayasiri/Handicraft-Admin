import Header from "@/components/Header";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  if (!session)
    return (
      <>
        <Header />
      </>
    );
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.email}</b>
        </h2>
        <div className="flex bg-gray-200 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="" className="w-8 h-8" />
          <span className="px-2"> {session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
