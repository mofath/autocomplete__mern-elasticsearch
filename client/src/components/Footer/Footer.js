import classe from "./Footer.module.css";

const Footer = () => (
  <div className={[classe.Footer, "vertical-layout"].join(" ")}>
    <h4>Online Shopping is Now Easier Than Ever</h4>
    <h5>We Are</h5>
    <div>
      <h1>SHOPIFY</h1>
    </div>
  </div>
);

export default Footer;
