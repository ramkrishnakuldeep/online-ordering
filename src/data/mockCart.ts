import type { ICartState, ICartType } from '../utils/types';
import { initialMenu } from './initialMenu'


const mockMenuData = initialMenu();

export const singleItem = (): ICartType => ({...mockMenuData[3], quantity: 1})

export const cartDataOneItem = (): ICartState => [
    {
        ...mockMenuData[0],
        quantity: 1
    }
]

export const cartDataTwoItem = (): ICartState => [
    {
        ...mockMenuData[0],
        quantity: 1
    },
    {
        ...mockMenuData[3],
        quantity: 1
    }
]


export const cartDataThreeItem = (): ICartState => [
    {
        ...mockMenuData[0],
        quantity: 1
    },
    {
        ...mockMenuData[3],
        quantity: 1
    },
    {
        ...mockMenuData[6],
        quantity: 1
    }
]