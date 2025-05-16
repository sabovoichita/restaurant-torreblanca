import styles from "../styles/Add.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div
      className={styles.mainAddButton}
      onClick={() => {
        console.log("Button clicked");
        setClose(false);
      }}
    >
      Add New Product
    </div>
  );
};

export default AddButton;
