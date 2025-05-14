import cookie from "cookie";
import { serialize } from "cookie";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { username, password } = req.body;

      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        res.setHeader(
          "Set-Cookie",
          serialize("token", process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json("Successful");
      } else {
        res.status(400).json("Wrong Credentials!");
      }
    } else {
      res.status(405).json("Method Not Allowed");
    }
  } catch (error) {
    console.error("Error in login handler:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export default handler;
