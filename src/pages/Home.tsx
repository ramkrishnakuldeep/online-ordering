
import { useSelector } from 'react-redux'
import type { IFoodItem, IRootState } from '../utils/types';
import FoodItem from '../components/FoodItem';
import '../styles/Home.scss'
import { FoodCategory } from '../utils/enum';
import { useState } from 'react';
import CategoryItem from '../components/CategoryItem';
//


export default function Home() {

    const [category, setCategory] = useState(FoodCategory.FOOD)

    const menu: Array<IFoodItem> = useSelector((state: IRootState) => state.menu);

    const menuItems = menu.filter((food => food.category === category)).map((item) => 
        <FoodItem key={item.id} item={item} />
    )


    const categories = Object.values(FoodCategory).map((type) => <CategoryItem key={type} current={category} onClickAction={setCategory} category={type} /> ) 

    return <div className='home-container'>
        <div className='categories'>
            {categories}
        </div>
        <div className='food-container'>
            {menuItems}
        </div>
    </div>
};
