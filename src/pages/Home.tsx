import type { IFoodItem } from "../utils/types";
import type { IRootState } from "../store/store";

import FoodItem from "../components/FoodItem";
import "../styles/Home.scss";
import { FoodCategory } from "../utils/enum";
import { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useAppSelector } from "../hooks/appHooks";
//

export default function Home() {
  const [category, setCategory] = useState(FoodCategory.FOOD);

  const menu: Array<IFoodItem> = useAppSelector(
    (state: IRootState) => state.menu
  );

  const menuItems = menu
    .filter((food) => food.category === category)
    .map((item) => <FoodItem key={item.id} item={item} />);

  const categories = Object.values(FoodCategory).map((type) => (
    <CategoryItem
      key={type}
      current={category}
      onClickAction={setCategory}
      category={type}
    />
  ));

  return (
    <>
      <h2 className="title"> Menu </h2>
      <div className="home-container">
        <div className="categories">{categories}</div>
        <div className="food-container">{menuItems}</div>
      </div>
    </>
  );
}
