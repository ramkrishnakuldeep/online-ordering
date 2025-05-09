import { createSlice } from '@reduxjs/toolkit'
import type { IFoodItem } from '../utils/types'
import { initialMenu } from '../data/initialMenu'

const SLICE_NAME = 'menu' as const

export type MenuState = Array<IFoodItem>

const initialState: MenuState = initialMenu()

const menuSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: { }
})

export default menuSlice.reducer