import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState } from "react";
import { reset } from "@/redux/cartSlice";
import axios from "axios";
import { useRouter } from "next/router";
import OrderDetail from "@/components/OrderDetail";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const router = useRouter();

  const subtotal = cart.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const createPayPalOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{ amount: { value: total.toFixed(2) } }],
    });
  };

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        router.push("/orders/" + res.data._id);
        dispatch(reset());
      }
    } catch (err) {
      console.error("Order creation error:", err);
    }
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const shipping = details.purchase_units[0].shipping;
      createOrder({
        customer: shipping.name.full_name,
        address: shipping.address.address_line_1,
        total,
        method: 1, // PayPal
      });
    });
  };

  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createPayPalOrder}
          onApprove={onApprove}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      {/* LEFT - Product Table */}
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => {
              const rawImgUrl = product.img || "";
              const decodedImg = decodeURIComponent(rawImgUrl);
              const isExternal = decodedImg.startsWith("http");
              const fallbackImg = "/image/logo/truscai-logo.png";
              const imageSrc = isExternal
                ? decodedImg
                : `/image/menu/${rawImgUrl}${
                    /\.(png|jpe?g|webp)$/i.test(rawImgUrl) ? "" : ".png"
                  }`;
              // console.log("Product image:", rawImgUrl);
              // console.log("Decoded image:", decodedImg);
              return (
                <tr className={styles.tr} key={product._id}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image
                        src={imageSrc || fallbackImg}
                        alt={product.title || "Product image"}
                        width={200}
                        height={200}
                        unoptimized={isExternal}
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {product.extras.map((extra) => (
                        <span key={extra._id}>{extra.text} </span>
                      ))}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>€{product.price}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>
                      €{(product.price * product.quantity).toFixed(2)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* RIGHT - Total + Payment */}
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> €
            {subtotal.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> €
            {discount.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> €{total.toFixed(2)}
          </div>

          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "AZQkWYRpYYOU2eW4Qn_RwsvcyeSKiCYFK_U61JU1hspFAtmLgiZNm9EKb8Q9NojU9JgRGnEQ-vNU-yWM",
                    components: "buttons",
                    currency: "EUR",
                    disableFunding: "credit,card,p24",
                  }}
                >
                  <ButtonWrapper showSpinner={true} />
                </PayPalScriptProvider>
              </div>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>

      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
