import dbConnect from "@/util/mongo";
import Orders from "@/models/Orders";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Orders.findById(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  if (method === "PUT") {
    try {
      const updatedOrder = await Orders.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  if (method === "DELETE") {
    try {
      await Orders.findByIdAndDelete(id);
      res.status(200).json({ message: "Order deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
};

export default handler;
