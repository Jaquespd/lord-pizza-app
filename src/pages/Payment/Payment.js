import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "@unform/web";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "react-loader-spinner";
import * as CartActions from "../../store/modules/cart/actions";
import * as ProductActions from "../../store/modules/products/actions";
import api from "../../services/api";
import { formatPrice } from "../../utils/format";
import GridPlaceholder from "../../components/GridPlaceholder/GridPlaceholder";
import { Container, ButtonBack, SelectContainer } from "./Payment_Styles";
import Input from "../../components/SimpleInput";
import SelectInput from "../../components/SelectInput";

export default function Payment() {
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
    console.log("handleSubmit");
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SelectContainer>
          <SelectInput
            type="text"
            label="Forma de Pagamento:"
            name="formPayment"
            placeholder="Escolha a forma de pagamento"
            noOptionsMessage={() => "ocorreu um erro, entre em contato"}
            defaultValue={[
              {
                label: "Dinheiro",
                value: 1
              },
              {
                label: "Cartão",
                value: 2
              }
            ]}
          />
        </SelectContainer>

        <Input
          label="Troco para quanto ?"
          name="change"
          type="number"
          placeholder="R$ 50,00 ... R$ 100,00"
        />

        <Input
          label="Observações:"
          name="observer"
          type="text"
          placeholder="Se quiser retirar algo do seu pedido, ou adicionar informações"
          onKeyPress={e =>
            e.key === "Enter" ? formRef.current.submitForm() : null
          }
        />

        <button type="submit">Finalizar</button>
        <ButtonBack to="/deliveryaddress">Voltar</ButtonBack>
      </Form>
    </Container>
  );
}
