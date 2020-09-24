import React, { useState } from "react";
import "./checkout.scss";

import { gql, useQuery } from "@apollo/client";

import cart from "./shopping-cart.svg";
import arrowUp from "./expand-arrow.svg";
import arrowDown from "./expand-button.svg";
import { Button } from "../components/button/button";
import { Input } from "../components/input/input";

export const Checkout = (props) => {
  let [open, setOpen] = useState(false);
  const tabs = ["dir", "ship", "pay"];
  let [tab, setTab] = useState(tabs[0]);

  const SessionData = gql`
    query {
      getCheckoutSession(input: "4481ea1c-491f-4516-ab31-62c08c6b562c") {
        products {
          title
          price
          quantity
          thumbnailPath
        }
        shippingCost
        shippingDetails {
          selectedOption
          options {
            title
            price
            id
            minDelivery
            maxDelivery
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(SessionData);

  if (loading) return <h1>Loading</h1>;
  console.log(data);

  if (error) return <h1>Error loading Data</h1>;

  return (
    <div className="checkout">
      <CollapseHeader open={open} setOpen={setOpen} />
      <Tabs tab={tab} tabs={tabs} />
      <Content
        data={data}
        tabs={tabs}
        setTab={setTab}
        tab={tab}
        title={"Direccion"}
      />
    </div>
  );
};

const CheckoutItem = ({ title, description, quantity, price, url }) => {
  return (
    <div className="checkout-item">
      <div className="grid-row left">
        <img src={url} alt="item" />
        <h1 className="title">
          <span className="qty">{1} x</span> {title}
        </h1>
        <h1>{description}</h1>
      </div>
      <div className="grid-row right">
        <h1 className="price">${price}</h1>
      </div>
    </div>
  );
};

const CollapseHeader = ({ open, setOpen }) => {
  return (
    <>
      <div className="summary">
        <div className="summary-view">
          <div
            className="drop"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <button className="no-btn drop">
              <h1 className="review">Ver Resumen del Pedido</h1>
              <img
                className="drop-arrow"
                src={open ? arrowUp : arrowDown}
                alt="cart=icon"
                width={15}
                height={15}
              />
            </button>
          </div>
          <div className="totals">
            <h1 className="price">$ 100.99 MXN</h1>
            <h1 className="envio">Envio por calcular</h1>
          </div>
        </div>
        <CollapseContent open={open} />
      </div>
    </>
  );
};

const CollapseContent = ({ open }) => {
  return (
    <div className={`drop-menu ${open ? "open" : "closed"}`}>
      <div className="drop-content">
        <div className="cart-list">
          <div className="frame">
            <CheckoutItem
              title="Basic Tee"
              quantity={5}
              price={100.99}
              url={
                "https://pyxis.nymag.com/v1/imgs/853/030/fa9bfcf1f90e2fc68cd8a6fddb282fd1b6-men-packaged-dry-crew-neck.2x.rsquare.w600.jpg"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Tabs = ({ tab }) => {
  return (
    <div className="tabs">
      <div className="row active-row">
        <h1 className={tab === "dir" ? "active" : "inactive"}>1.Direccion</h1>
      </div>
      <div className="row">
        <h1 className={tab === "ship" ? "active" : "inactive"}>2.Envio</h1>
      </div>
      <div className="row">
        <h1 className={tab === "pay" ? "active" : "inactive"}>3.Pago</h1>
      </div>
    </div>
  );
};

//checkout content

const Content = ({ title, right, setTab, tab, tabs }) => {
  const btnReducer = (tab) => {
    switch (tab) {
      case "dir":
        return { prev: 0, next: 1 };
      case "ship":
        return { prev: 0, next: 1 };
      default:
        return { prev: 0, next: 1 };
    }
  };
  const navReducer = (tab) => {
    switch (tab) {
      case "dir":
        return { prev: "Regresar A Carrito", next: "Continuar A Envio" };
      case "ship":
        return { prev: "Regresar A Direccion", next: "Continuar A Pago" };
      default:
        return { prev: "Regresar A Carrito", next: "Continuar A Envio" };
    }
  };
  const tabReducer = (tab) => {
    switch (tab) {
      case "dir":
        return <Address />;
      case "ship":
        return <Shipping />;
      default:
        return <Address />;
    }
  };
  return (
    <div className="container">
      <div className="view">
        <div className="view-header">
          <h1>{title}</h1>
          <p>Ya tienes cuenta?</p>
        </div>
        <div className="view-content">{tabReducer(tab)}</div>
        <div className="nav-buttons">
          <Button
            onClick={() => setTab(tabs[btnReducer(tab).prev])}
            bg={"rgba(255, 255, 255, 0)"}
            color={"rgb(18, 187, 94)"}
            border={"rgb(18, 187, 94)"}
            text={navReducer(tab).prev}
            width={12}
            height={3.5}
          />
          <Button
            onClick={() => setTab(tabs[btnReducer(tab).next])}
            bg={"rgb(18, 187, 94)"}
            text={navReducer(tab).next}
            width={27}
            height={3.5}
          />
        </div>
      </div>
    </div>
  );
};

const Address = (props) => {
  return (
    <>
      <Input label={"Nombre"} />
      <Input type="email" label={"Correo Electronico"} />
      <Input label={"Calle"} />
      <Input label={"Apartamento, Local, etc (Opcional)"} />
      <Input label={"Colonia"} />
      <Input label={"Ciudad"} />
      <div className="input-rox">
        <Input label={"Codigo Postal"} />
        <Input label={"Estado"} />
      </div>
      <Input label={"Pais"} />
    </>
  );
};

const Shipping = (props) => {
  return (
    <div className="shipping-cont">
      <ShippingItem title="Envio Estandar" days={"5 - 7"} price={0} />
      <ShippingItem title="Envio Express" days={"2 - 4"} price={199.99} />
    </div>
  );
};

const ShippingItem = ({ title, price, days }) => {
  return (
    <div className="shipping-item">
      <div className="left">
        <input type="checkbox" />
        <div className="details">
          <h1>
            {title} <span className="days">({days} dias)</span>
          </h1>
        </div>
      </div>
      <h1 className="price">{price <= 0 ? "Gratis" : `$${price}`}</h1>
      <div className="subtitle"></div>
    </div>
  );
};
