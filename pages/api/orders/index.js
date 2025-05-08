import dbConnect from "@/util/mongo";
import Orders from "@/models/Orders";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Orders.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const order = await Orders.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      console.error("Order creation failed:", err);
      res.status(500).json(err);
    }
  }
};

export default handler;
