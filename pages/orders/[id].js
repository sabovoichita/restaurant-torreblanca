import { useEffect, useState } from "react";
import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  const [order, setOrder] = useState(order);
  const status = order.status;
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  useEffect(() => {
    if (!order) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(`/api/orders/${order.id}`);
          setOrder(response.data);
        } catch (err) {
          console.error("Error fetching order data:", err);
        }
      };
      fetchOrder();
    }
  }, [order]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead className={styles.trTitle}>
              <tr className={styles.tr}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>
                    {order ? order._id : "Loading..."}
                  </span>
                </td>
                <td>
                  <span className={styles.name}>
                    {order ? order.customer : "Loading..."}
                  </span>
                </td>
                <td>
                  <span className={styles.address}>
                    {order ? order.address : "Loading..."}
                  </span>
                </td>
                <td>
                  <span className={styles.total}>
                    £{order ? order.total : "0.00"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image
              src="/image/icons/icons-payment.png"
              alt=""
              width={30}
              height={30}
            />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                src="/image/icons/icons-check.png"
                alt=""
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className={statusClass(1)}>
            <Image
              src="/image/icons/icons-bake.png"
              alt=""
              width={30}
              height={30}
            />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                src="/image/icons/icons-check.png"
                alt=""
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className={statusClass(2)}>
            <Image
              src="/image/icons/icons-bicycle.png"
              alt=""
              width={30}
              height={30}
            />
            <span>On The Way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/image/icons/icons-check.png"
                alt=""
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className={statusClass(3)}>
            <Image
              className={styles.checkedIcon}
              src="/image/icons/icons-delivered.png"
              alt=""
              width={30}
              height={30}
            />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                src="/image/icons/icons-check.png"
                alt=""
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>£
            {order ? order.total : "0.00"}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>£0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>£
            {order ? order.total : "0.00"}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  try {
    const res = await axios.get(`http://localhost:3000/api/orders/${id}`);
    return { props: { order: res.data } };
  } catch (err) {
    console.error("Failed to fetch order:", err);
    return { props: { order: null } };
  }
};

export default Order;
