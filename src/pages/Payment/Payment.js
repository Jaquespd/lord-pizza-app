import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "@unform/web";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "react-loader-spinner";
import * as CartActions from "../../store/modules/cart/actions";
import * as ProductActions from "../../store/modules/products/actions";
import * as DeliveryActions from "../../store/modules/delivery/actions";
import api from "../../services/api";
import { formatPrice } from "../../utils/format";
import GridPlaceholder from "../../components/GridPlaceholder/GridPlaceholder";
import {
  Container,
  ButtonBack,
  SelectContainer,
  Title
} from "./Payment_Styles";
import Input from "../../components/SimpleInput";
import SelectInput from "../../components/SelectInput";
import whatsappApi from "../../services/whatsapp";

export default function Payment() {
  const formRef = useRef(null);

  const products = useSelector(state => state.products);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  const delivery = useSelector(state => state.delivery);
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("products");

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        loading: false
      }));

      dispatch(ProductActions.storeProducts(data));
    }

    loadProducts();
  }, [dispatch]);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function handleSubmit() {
    const url = whatsappApi(delivery, cart);

    window.open(url, "_blank");
  }

  return (
    <Container>
      <Title>ESTAMOS QUASE LÁ, FALTA POUCO</Title>
      <div>
        <span>
          Para finalizar o pedido, basta clicar no botão "FINALIZAR" abaixo e
          seu pedido será encaminhado para nós via WHATSAPP, se for pelo celular
          será aberto o app, se for pelo computador pelo whatsapp web.
        </span>
        <span>
          Ou seja, basta apertar o botão de finalizar e depois clicar na seta de
          enviar do whatsapp.
        </span>
      </div>
      <button type="button" onClick={handleSubmit}>
        Finalizar
      </button>
      <ButtonBack to="/deliveryaddress">Voltar</ButtonBack>
    </Container>
  );
}
