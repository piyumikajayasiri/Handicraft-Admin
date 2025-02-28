import {
  BaggageClaim,
  Home,
  List,
  ListCollapse,
  LogOut,
  Settings,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = "flex gap-1 p-1 bg-white text-blue-900 rounded";
  const router = useRouter();
  const { pathname } = router;
  async function logout() {
    router.push("/");
    await signOut();
  }
  const { data: session } = useSession();
  if (!session) return;
  return (
    <>
      <aside className="text-black p-4">
        <nav className="flex flex-col gap-5">
          <Link
            className={pathname === "/" ? activeLink : inactiveLink}
            href={"/"}
          >
            <Home />
            Dashboard
          </Link>
          <Link
            className={pathname === "/products" ? activeLink : inactiveLink}
            href={"/products"}
          >
            <BaggageClaim />
            Products
          </Link>
          <Link
            className={pathname === "/categories" ? activeLink : inactiveLink}
            href={"/categories"}
          >
            <ListCollapse />
            Categories
          </Link>
          <Link className={inactiveLink} href={"/"}>
            <List />
            Orders
          </Link>
          <Link className={inactiveLink} href={"/"}>
            <Settings />
            Settings
          </Link>

          <button className={inactiveLink} onClick={() => logout()}>
            <LogOut /> Log Out
          </button>
        </nav>
      </aside>
    </>
  );
}
