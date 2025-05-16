import dbConnect from "@/util/mongo";
import Product from "@/models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch product", error: err });
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authentificated");
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: "Failed to update product", error: err });
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authentificated");
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete product", error: err });
    }
  }
}
