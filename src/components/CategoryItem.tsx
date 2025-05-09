import { Button } from "@mui/material";
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
    <Button
      aria-label={props.category}
      onClick={() => props.onClickAction(props.category)}
      className={getClasses(props)}
    >
      {props.category}
    </Button>
  );
};
export default CategoryItem;
