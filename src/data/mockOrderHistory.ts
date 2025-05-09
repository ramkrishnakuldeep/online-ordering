import type { IHistoryState } from '../utils/types'
import { initialMenu } from './initialMenu'

const mockMenuData = initialMenu();

export const orderMockHistory = (): IHistoryState => [
    {
        orderNo: '123456789',
        items: [
            {
                ...mockMenuData[0],
                quantity: 2
            },
            {
                ...mockMenuData[3],
                quantity: 1
            }
        ],
        total: mockMenuData[0].price * 2 + mockMenuData[3].price,
    },
    {
        orderNo: '987654321',
        items: [
            {
                ...mockMenuData[6],
                quantity: 1
            }
        ],
        total: mockMenuData[6].price,
    }
    
]