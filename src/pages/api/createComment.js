import { client } from "../../lib/client";

export default async function handler(req, res) {
  console.log(typeof req.body);
  const { _id, name, email, comment } = req.body;
  try {
    await client.create({
      _type: "comment",
      post: {
        _type:'reference',
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
