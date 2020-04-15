import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdPowerSettingsNew } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

import { Container, Cart } from "./Banner_Styles";
import logo from "../../assets/images/logo-lord.png";

export default function Header() {
  return (
    <Container>
      <strong>
        <MdPowerSettingsNew size={24} color="#FFF" />
        Qui a Dom - 16:00 as 22:00
      </strong>
      <span>
        <FaWhatsapp size={24} color="#FFF" /> 98840-7763
      </span>
    </Container>
  );
}
