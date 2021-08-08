import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSectionsThunk, addBasketThunk } from "../redux/goodsReducer";
import "./Table.css";

const Home = () => {
  const sections = useSelector((state) => state.goods.sections);
  const sumTotal = useSelector((state) => state.goods.sumTotal);
  const countTotal = useSelector((state) => state.goods.countTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(getSectionsThunk());
    }
  });

  const clickToButton = () => {
    const formData = {
      1: "22",
      2: "44",
    };
    dispatch(addBasketThunk(formData));
  };

  return (
    <table className="table">
      {sections.map((p, key) => (
        <tbody key={key}>
          <tr className="table__header">
            <td colSpan="5">{p.rname}</td>
          </tr>
          <tr className="table__title">
            <th>Id</th>
            <th>Название товара</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Сумма</th>
          </tr>
          {p.goods.map((g, key) => (
            <tr className="table__row" key={key}>
              <td>{g.gid}</td>
              <td>{g.gname}</td>
              <td>{g.gprice}</td>
              <td>{g.gquantity_reserved === null ? 0 : g.gquantity_reserved}</td>
              <td>{g.gprice * g.gquantity_reserved}</td>
            </tr>
          ))}
        </tbody>
      ))}
      <tfoot>
        <tr className="table__footer">
          <td>
            <button className="table__footer-btn" onClick={clickToButton}>
              В корзину
            </button>
          </td>
          <td colSpan="2">Общие результаты:</td>
          <td>{countTotal}</td>
          <td>{sumTotal}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Home;
