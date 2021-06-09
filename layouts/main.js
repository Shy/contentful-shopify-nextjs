import GlobalStyles from "./main.styles.js";
import Header from "@components/header";
import Footer from "@components/footer";

export default function MainLayout(props) {
  return (
    <>
      <Header categories={props.categories} />
      <main id="main_content">{props.children}</main>
      <Footer categories={props.categories} />

      <style jsx global>
        {GlobalStyles}
      </style>
    </>
  );
}
