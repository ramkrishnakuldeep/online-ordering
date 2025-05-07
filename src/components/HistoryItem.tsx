import { getFormattedNumber } from "../utils/func"
import type { IOrder } from "../utils/types"

const HistoryItem = ({item }: {item: IOrder}) => {

    const orderItems = item.items.map((orderItem) => <div key={orderItem.id} className="order-item">
        <span>{orderItem.name}</span>
        <span>{orderItem.quantity}</span>
    </div>)

    return <div className="history-item">
        <span>Order #{item.orderNo}</span>
        <div className="items">
            {orderItems}
        </div>
        <div className="total"> Total: {getFormattedNumber(item.total)}</div>
    </div>
}

export default HistoryItem