import { Button } from "@mui/material";
import type { FoodCategory } from "../utils/enum";

const getClasses = ({
  current,
  category,
}: {
  current: FoodCategory;
  category: FoodCategory;
}): string => {
  const isActive = current === category;
  return `category ${isActive ? "active" : ""}`;
};

export const CategoryItem = ({
  category,
  onClickAction,
  current,
}: {
  category: FoodCategory;
  onClickAction: (category: FoodCategory) => void;
  current: FoodCategory;
}) => {
  return (
    <Button
      aria-label={`Select category: ${category}`}
      onClick={() => onClickAction(category)}
      className={getClasses({ current, category })}
    >
      {category}
    </Button>
  );
};

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
