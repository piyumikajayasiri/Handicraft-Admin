import multiparty from "multiparty";

export default async function handle(res, req) {
  const form = multiparty.Form();

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
