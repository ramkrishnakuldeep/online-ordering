import type { FoodCategory } from "../utils/enum";

const getClasses = ({
  current,
  category,
}: {
  current: FoodCategory;
  category: FoodCategory;
}) => {
  return `category ${current === category ? "active" : ""}`;
};

const CategoryItem = (props: {
  category: FoodCategory;
  onClickAction: any;
  current: FoodCategory;
}) => {
  return (
    <button
      aria-label={props.category}
      onClick={() => props.onClickAction(props.category)}
      className={getClasses(props)}
    >
      {props.category}
    </button>
  );
};
export default CategoryItem;
