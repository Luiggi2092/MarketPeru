import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { GrYoutube } from "react-icons/gr";
import newsletter from "../images/newsletter.png";



const Footer = () => {





  return (
<>
<footer className="py-4">
<div className="container-xxl">
<div className="row align-items-center">
<div className="col-5">
<div className="footer-top-data d-flex gap-30 align-items-center">
  <img src={newsletter} alt="newsletter" />
  <h5 className="mb-0 text-white">
      Susbcribete y Recibe Novedades
  </h5>
</div>
</div>

<div className="col-5">
<div className="input-group">
<input
  type="text"
  className="form-control py-1"
  placeholder="Tu Dirección de email..."
  aria-label="Tu Dirección de email..."
  aria-describedby="basic-addon2"
/>
<span className="input-group-text p-2" id="basic-addon2">
    Subscribete
</span>
</div>
</div>
</div>
</div>
</footer>

<footer className="p-4">
<div className="container-xxl">
<div className="row">
<div className="col-4">
    <h5 className="text-white mb-2">Contáctanos</h5>
<div>
  <address className="fot-oter text-white">
      Buenos Aires, Argentina.
  </address>
<a
    href="tel: +54 9 1122781197"
    className="mt-3 d-block mb-1 text-white fot-oter"
>
+54 9 1122781197
</a>

<a
    href="mailto: giamzon.adm@gmail.com"
    className="mt-2 d-block mb-0 text-white fot-oter"
>
giamzon.adm@gmail.com
</a>

<div className="social_icons d-flex align-items-center gap-30 mt-4">
<a
  className="text-white"
  href="https://www.linkedin.com/in/amberlis-laya-m"
>
    <FaLinkedin className="fs-4" />
</a>

<a
  className="text-white"
  href="https://www.instagram.com/soyamberlis"
>
    <FaInstagram className="fs-4" />
</a>

<a
  className="text-white"
  href="https://github.com/amberlislaya"
>
  <BsGithub className="fs-4" />
</a>
{/* <a
  className="text-white"
                    href="https://www.youtube.com/channel/UC7DQ7IOz_fEp563GQwB5FIA"
>
  <GrYoutube className="fs-4" />
</a> */}
</div>
</div>
</div>

<div className="col-3">
  <h5 className="text-white mb-2">Información</h5>
<div className="footer-links d-flex flex-column">
<Link to="/privacy-policy" className="text-white py-1 mb-1 fot-oter">
      Políticas de Privacidad
</Link>
<Link to="/refund-policy" className="text-white py-1 mb-1 fot-oter">
      Políticas de Reembolso
</Link>
<Link to="/shipping-policy" className="text-white py-1 mb-1 fot-oter">
      Políticas de envío
</Link>
<Link to="term-conditions" className="text-white py-1 mb-1 fot-oter">
      Términos & Condiciones
</Link>
<Link to="/blogs" className="text-white py-1 mb-1 fot-oter">
      Blogs
</Link>
</div>
</div>

<div className="col-3">
    <h5 className="text-white mb-2">Cuenta</h5>
<div className="footer-links d-flex flex-column fot-oter">
<Link className="text-white py-1 mb-1 fot-oter">Sobre Nosotros</Link>
<Link className="text-white py-1 mb-1 fot-oter">
    Preguntas frecuentes
</Link>
<Link className="text-white py-1 mb-1 fot-oter">Contácto</Link>
</div>
</div>

<div className="col-2">
    <h5 className="text-white mb-2">Enlaces Rápidos</h5>
<div className="footer-links d-flex flex-column fot-oter">
<Link className="text-white py-1 mb-1 fot-oter">Notebooks</Link>
<Link className="text-white py-1 mb-1 fot-oter">Teléfonos</Link>
<Link className="text-white py-1 mb-1 fot-oter">Tablets</Link>
<Link className="text-white py-1 mb-1 fot-oter">Relojes</Link>
</div>
</div>
</div>
</div>
</footer>

<footer className="p-4">
<div className="container-xxl">
<div className="row">
<div className="col-12">
<p className="text-center mb-0 text-white">
    &copy; {new Date().getFullYear()}  Amberlis Laya, Luis Seminario (CDL), Todos
    los derechos reservados
</p>
</div>
</div>
</div>
</footer>
</>
);
};

export default Footer;
