import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@unform/web";
import * as DeliveryActions from "../../store/modules/delivery/actions";
import {
  Container,
  ButtonBack,
  Title,
  ButtonFormContainer
} from "./PersonalData_Styles";
import Input from "../../components/SimpleInput";
import history from "../../services/history";

export default function PersonalData() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const formRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("@lord-pizza/delivery"));

    if (delivery) {
      dispatch(DeliveryActions.setDelivery(delivery));

      setName(delivery.name);
      setPhone(delivery.phone);
    }
  }, [dispatch]);

  function handleSubmit() {
    const data = formRef.current.getData();

    dispatch(DeliveryActions.setDelivery(data));

    const oldData = JSON.parse(localStorage.getItem("@lord-pizza/delivery"));

    if (oldData) {
      const newData = Object.assign(oldData, data);

      localStorage.setItem("@lord-pizza/delivery", JSON.stringify(newData));
    } else {
      localStorage.setItem("@lord-pizza/delivery", JSON.stringify(data));
    }

    history.push("/deliveryaddress");
  }

  return (
    <Container>
      <Title>DADOS PESSOAIS</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="Nome:"
          name="name"
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          label="Telefone:"
          name="phone"
          type="number"
          placeholder="999999999"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <ButtonFormContainer>
          <ButtonBack to="/cart">Voltar</ButtonBack>
          <button type="submit">Avançar</button>
        </ButtonFormContainer>
      </Form>
    </Container>
  );
}
