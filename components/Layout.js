const { default: Footer } = require("./Footer");
const { default: Navbar } = require("./Navbar");

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
