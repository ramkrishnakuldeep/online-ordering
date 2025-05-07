import { createSlice } from '@reduxjs/toolkit'
import type { IFoodItem } from '../utils/types'
import { initialMenu } from '../data/initialMenu'

export type MenuState = Array<IFoodItem>

const initialState: MenuState = initialMenu

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: { }
})

export default menuSlice.reducer