import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PersonalData from "./pages/PersonalData";
import DeliveryAddress from "./pages/DeliveryAddress";
import Payment from "./pages/Payment";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/personaldata" component={PersonalData} />
      <Route path="/deliveryaddress" component={DeliveryAddress} />
      <Route path="/payment" component={Payment} />
    </Switch>
  );
}
