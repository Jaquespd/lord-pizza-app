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
import { Container, ButtonBack, Title } from "./DeliveryAddress_Styles";
import Input from "../../components/SimpleInput";
import history from "../../services/history";

export default function DeliveryAddress() {
  const formRef = useRef(null);

  const products = useSelector(state => state.products);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

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
    const data = formRef.current.getData();

    dispatch(DeliveryActions.setDelivery(data));

    history.push("/payment");
  }

  return (
    <Container>
      <Title>ENDEREÇO DE ENTREGA</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Rua:"
          name="street"
          type="text"
          placeholder="Digite o nome da sua rua"
        />

        <Input
          label="Numero:"
          name="number"
          type="number"
          placeholder="Digite o numero da sua casa/apto/condominio"
        />

        <Input
          label="Bairro:"
          name="bairro"
          type="text"
          placeholder="Digite seu bairro"
        />

        <Input
          label="Complemento:"
          name="complement"
          type="text"
          placeholder="Digite o complemento, caso tenha"
        />

        <Input
          label="Ponto de Referencia:"
          name="reference"
          type="text"
          placeholder="Digite um ponto de referencia"
          onKeyPress={e =>
            e.key === "Enter" ? formRef.current.submitForm() : null
          }
        />

        <button type="submit">Avançar</button>
        <ButtonBack to="/personaldata">Voltar</ButtonBack>
      </Form>
    </Container>
  );
}
