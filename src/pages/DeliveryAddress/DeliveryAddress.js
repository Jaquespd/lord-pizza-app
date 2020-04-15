import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@unform/web";
import * as DeliveryActions from "../../store/modules/delivery/actions";
import { Container, ButtonBack, Title } from "./DeliveryAddress_Styles";
import Input from "../../components/SimpleInput";
import history from "../../services/history";

export default function DeliveryAddress() {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [bairro, setBairro] = useState("");
  const [complement, setComplement] = useState("");
  const [reference, setReference] = useState("");
  const [observer, setObserver] = useState("");

  const formRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("@lord-pizza/delivery"));

    if (delivery) {
      dispatch(DeliveryActions.setDelivery(delivery));

      setStreet(delivery.street);
      setNumber(delivery.number);
      setBairro(delivery.bairro);
      setComplement(delivery.complement);
      setReference(delivery.reference);
      setObserver(delivery.observer);
    }
  }, [dispatch]);

  function handleSubmit() {
    const data = formRef.current.getData();

    dispatch(DeliveryActions.setDelivery(data));

    const oldData = JSON.parse(localStorage.getItem("@lord-pizza/delivery"));

    const newData = Object.assign(oldData, data);

    localStorage.setItem("@lord-pizza/delivery", JSON.stringify(newData));

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
          value={street}
          onChange={e => setStreet(e.target.value)}
        />

        <Input
          label="Numero:"
          name="number"
          type="number"
          placeholder="Digite o numero da sua casa/apto/condominio"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />

        <Input
          label="Bairro:"
          name="bairro"
          type="text"
          placeholder="Digite seu bairro"
          value={bairro}
          onChange={e => setBairro(e.target.value)}
        />

        <Input
          label="Complemento:"
          name="complement"
          type="text"
          placeholder="Digite o complemento, caso tenha"
          value={complement}
          onChange={e => setComplement(e.target.value)}
        />

        <Input
          label="Ponto de Referencia:"
          name="reference"
          type="text"
          placeholder="Digite um ponto de referencia"
          value={reference}
          onChange={e => setReference(e.target.value)}
        />

        <Input
          label="Observações:"
          name="observer"
          type="text"
          placeholder="Se tiver pedido pizza com 2 sabores, escreva aqui os sabores, e caso queira retirar algo ou adicionar informações"
          value={observer}
          onChange={e => setObserver(e.target.value)}
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
