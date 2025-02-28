import { signOut } from "next-auth/react";
import { serialize } from "cookie"; // Import cookie serializer

export default async function handler(req, res) {
  res.setHeader("Set-Cookie", [
    serialize("next-auth.session-token", "", {
      path: "/",
      expires: new Date(0),
    }),
    serialize("next-auth.csrf-token", "", {
      path: "/",
      expires: new Date(0),
    }),
  ]);

  res.status(200).json({ message: "Logged out" });
}
