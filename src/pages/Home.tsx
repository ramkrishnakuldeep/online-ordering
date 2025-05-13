import type { IFoodItem } from "../utils/types";
import type { IRootState } from "../store/store";
import FoodItem from "../components/FoodItem";
import "../styles/Home.scss";
import { FoodCategory } from "../utils/enum";
import { useRef, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useAppSelector } from "../hooks/appHooks";

export default function Home() {
  const [category, setCategory] = useState<FoodCategory>(FoodCategory.FOOD);
  const scrollRef = useRef<HTMLDivElement>(null);

  const menu: Array<IFoodItem> = useAppSelector(
    (state: IRootState) => state.menu || []
  );

  const handleCategoryClick = (type: FoodCategory) => {
    setCategory(type);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderMenuItems = () =>
    menu
      .filter((food) => food.category === category)
      .map((item) => <FoodItem key={item.id} item={item} />);

  const renderCategories = () =>
    Object.values(FoodCategory).map((type) => (
      <CategoryItem
        key={type}
        current={category}
        onClickAction={() => handleCategoryClick(type)}
        category={type}
      />
    ));

  return (
    <>
      <h2 aria-label="menu" className="title">
        Menu
      </h2>
      <div className="home-container">
        <div className="menu-categories">{renderCategories()}</div>
        <div className="menu-items-container" ref={scrollRef} >{renderMenuItems()}</div>
      </div>
    </>
  );
}
