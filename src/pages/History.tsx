import type { IOrder } from "../utils/types";
import HistoryItem from "../components/HistoryItem";
import "../styles/History.scss";
import Button from "@mui/material/Button";
import { clearHistory } from "../slices/orderHistorySlice";
import { useAppDispatch, useAppSelector } from "../hooks/appHooks";
import type { IRootState } from "../store/store";

const History = () => {
  const dispatch = useAppDispatch();
  const orderHistory: Array<IOrder> = useAppSelector(
    (state: IRootState) => state.orderHistory
  );
  const hasOrderHistory = orderHistory.length > 0;

  const onDeleteHistory = () => {
    dispatch(clearHistory());
  };
  const renderOrderHistories = () =>
    orderHistory.map((item) => <HistoryItem key={item.orderNo} item={item} />);
  return (
    <>
      <h2 aria-label="order history" className="title">
        Order History
      </h2>
      <div className="history-container">
        {renderOrderHistories()}
        {!hasOrderHistory && (
          <span className="empty-container">
            You don't have any order history yet
          </span>
        )}
      </div>
      {hasOrderHistory && (
        <Button
          title="delete history"
          onClick={onDeleteHistory}
          className="delete-history"
          aria-label="delete history"
        >
          Delete History
        </Button>
      )}
    </>
  );
};
export default History;
