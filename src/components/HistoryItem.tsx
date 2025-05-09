import { getFormattedNumber } from "../utils/func"
import type { IOrder } from "../utils/types"
import { memo, useMemo } from "react"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

interface HistoryItemProps {
    item: IOrder
}

const HistoryItem = memo(({ item }: HistoryItemProps) => {
    const orderItems = useMemo(() =>
        item.items.map((orderItem) => (
            <Box
                key={orderItem.id}
                className="order-item"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
            >
                <Typography variant="body1">
                    {orderItem.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Qty: {orderItem.quantity}
                </Typography>
            </Box>
        )),
        [item.items]
    )

    return (
        <article aria-label={`Order ${item.orderNo}`}>
            <Paper
                elevation={2}
                className="history-item"
                sx={{ p: 2, mb: 2 }}
            >
                <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                >
                    Order #{item.orderNo}
                </Typography>

                <Box className="items" aria-label={`Order items for ${item.orderNo}`}>
                    {orderItems}
                </Box>

                <Box
                    className="total"
                    display="flex"
                    justifyContent="flex-end"
                    mt={1}
                >
                    <Typography variant="subtitle1" fontWeight="bold">
                        Total: {getFormattedNumber(item.total)}
                    </Typography>
                </Box>
            </Paper>
        </article>
    )
})

HistoryItem.displayName = 'HistoryItem'

export default HistoryItem