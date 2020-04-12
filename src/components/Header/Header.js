import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

import { Container, Cart } from "./Header_Styles";
import logo from "../../assets/images/logo-lord.png";

export default function Header() {
  const cartSize = useSelector(state =>
    state.cart.reduce((total, p) => {
      return total + p.amount;
    }, 0)
  );

  return (
    <Container>
      <Link to="/">
        <figure>
          <img src={logo} alt="Lord Pizza" />
        </figure>
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          {/* eslint-disable-next-line prettier/prettier */}
          <span>
            {cartSize === 1 ? `${cartSize} produto` : `${cartSize} produtos`}
          </span>
        </div>
        <MdShoppingCart size={36} color="#FFF" />
        <span>{cartSize}</span>
      </Cart>
    </Container>
  );
}
