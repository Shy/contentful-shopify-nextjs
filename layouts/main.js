import GlobalStyles from "./main.styles.js";
import Header from "@components/header";
import Footer from "@components/footer";

export default function MainLayout(props) {
  return (
    <>
      <Header />
      <main id="main_content">{props.children}</main>
      <Footer />

      <style jsx global>
        {GlobalStyles}
      </style>
    </>
  );
}
