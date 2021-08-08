import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const SUM_TOTAL = "SUM_TOTAL";
const COUNT_TOTAL = "COUNT_TOTAL";

const defaultState = {
  sections: [],
  goods: [],
  sumTotal: 0,
  countTotal: 0,
};

export default function goodsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        sections: action.payload,
      };
    case SUM_TOTAL:
      return {
        ...state,
        sumTotal: action.payload,
      };
    case COUNT_TOTAL:
      return {
        ...state,
        countTotal: action.payload,
      };
    default:
      return state;
  }
}

export const getSectionsAction = (payload) => ({ type: GET_PRODUCTS, payload });
export const getSumTotal = (payload) => ({ type: SUM_TOTAL, payload });
export const getCountTotal = (payload) => ({ type: COUNT_TOTAL, payload });

export const getSectionsThunk = () => async (dispatch) => {
  try {
    const getSections = await axios.get("https://datainlife.ru/junior_task/get_products.php");
    if (getSections.status === 200 && getSections.statusText === "OK") {
      const newGetSections = getSections.data.filter((s) => {
        return s.goods.length < 56;
      });

      let goods = [];
      newGetSections.map((s) => {
        return s.goods.forEach((g) => {
          return goods.push({
            id: g.gid,
            quantity: g.gquantity_reserved === null ? 0 : Number(g.gquantity_reserved),
            price: Number(g.gprice),
          });
        });
      });

      const sumTotal = (arr) => arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

      const CountTotal = goods.reduce((prev, next) => {
        return prev + next.quantity;
      }, 0);

      dispatch(getSectionsAction(newGetSections));
      dispatch(getSumTotal(sumTotal(goods)));
      dispatch(getCountTotal(CountTotal));
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export const addBasketThunk = (formData) => async () => {
  try {
    const addBasketThunk = await axios.post(
      "https://datainlife.ru/junior_task/add_basket.php",
      formData,
    );

    console.log("addBasketThunk:", addBasketThunk);
  } catch (error) {
    console.log("error:", error);
  }
};
