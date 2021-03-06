import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdRemoveShoppingCart,
  MdMotorcycle
} from "react-icons/md";
import * as CartActions from "../../store/modules/cart/actions";
import { formatPrice } from "../../utils/format";
import {
  Container,
  ProductTable,
  Total,
  EmptyCart,
  StartShopping,
  DeliverySection
} from "./Cart_Styles";

export default function Cart() {
  const deliveryPrice = 7;
  const productsPrice = useSelector(state =>
    state.cart.reduce((totalAmount, product) => {
      return totalAmount + product.price * product.amount;
    }, 0)
  );

  const total = formatPrice(deliveryPrice + productsPrice);

  // SEM CUSTO DE FRETE
  // const total = useSelector(state =>
  //   formatPrice(
  //     state.cart.reduce((totalAmount, product) => {
  //       return totalAmount + product.price * product.amount;
  //     }, 0)
  //   )
  // );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount)
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      {cart.length === 0 ? (
        <EmptyCart>
          <MdRemoveShoppingCart />

          <div>
            <h2>Oops...</h2>
            <p>Seu carrinho de compras está vazio, adicione algum pedido!</p>
            <StartShopping to="/">Começar comprando</StartShopping>
          </div>
        </EmptyCart>
      ) : (
        <>
          <ProductTable>
            <thead>
              <tr>
                <th />
                <th>PRODUTO</th>
                <th>QUANTIDADE</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(product => (
                <tr key={product.id}>
                  <td>
                    <figure>
                      <img src={product.image} alt={product.title} />
                    </figure>
                  </td>
                  <td>
                    <strong>{product.title}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </td>
                  <td>
                    <div>
                      <button type="button" onClick={() => decrement(product)}>
                        <MdRemoveCircleOutline size={20} color="#fec903" />
                      </button>
                      <input type="text" readOnly value={product.amount} />
                      <button type="button" onClick={() => increment(product)}>
                        <MdAddCircleOutline size={20} color="#fec903" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{product.subtotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(CartActions.removeFromCart(product.id))
                      }
                    >
                      <MdDelete size={20} color="#fec903" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
          <DeliverySection>
            <MdMotorcycle size={40} color="#fec903" />
            <span>FRETE: R$ 7,00</span>
          </DeliverySection>
          <footer>
            <Link to="/personaldata">
              <button type="submit">Finalizar pedido</button>
            </Link>
            <Total>
              <span>TOTAL:</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      )}
    </Container>
  );
}
