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
        Estamos abertos
      </strong>
      <span>
        <FaWhatsapp size={24} color="#FFF" /> 84 99999-9999
      </span>
    </Container>
  );
}
