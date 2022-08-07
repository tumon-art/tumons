import sanityClient from "@sanity/client";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-01-05",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config)

export default async function handler(req, res) {
  console.log(typeof req.body);
  const { _id, name, email, comment } = req.body;
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: reference,
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: `Couldn't Submit!!`, err });
  }
  console.log("Comment Submitted");
  return res.status(200).json({ message: `Comment Submitted` });
}
