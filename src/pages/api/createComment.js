import { client } from "../../lib/client";

export default async function comment(req, res) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
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
