import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout" dir="rtl">
      <Navbar />

      <main className="main-content">
        <div className="page-container">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
