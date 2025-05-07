import { useDispatch, useSelector } from "react-redux";
import type { IOrder, IRootState } from "../utils/types";
import HistoryItem from "../components/HistoryItem";
import "../styles/History.scss";
import Button from "@mui/material/Button";
import { clearHistory } from "../slices/orderHistorySlice";

const History = () => {
  const dispatch = useDispatch();
  const orderHistory: Array<IOrder> = useSelector(
    (state: IRootState) => state.orderHistory
  );
  const onDeleteHistory = () => {
    dispatch(clearHistory());
  };
  const orderHistories = orderHistory.map((item) => (
    <HistoryItem key={item.orderNo} item={item} />
  ));
  return (
    <>
      <h2 className="title">Order History</h2>
      <div className="history-container">
        {orderHistories}
        {orderHistory.length === 0 && (
          <span className="empty-container">
            You don't have any order history yet
          </span>
        )}
      </div>
      {orderHistory.length !== 0 && (
        <Button onClick={onDeleteHistory} className="delete-history">
          Delete History
        </Button>
      )}
    </>
  );
};
export default History;
