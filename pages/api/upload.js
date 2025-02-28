import multiparty from "multiparty";
import { connectDB } from "@/lib/mongoose";

export default async function handle(res, req) {
  const form = multiparty.Form();
  await connectDB();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log(files);
  console.log(fields);
  return res.json("ok");
}
export const config = {
  api: { bodyParser: false },
};
