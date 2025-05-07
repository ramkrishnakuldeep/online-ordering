import type { FoodCategory } from "../utils/enum"

const getClasses = ({ current, category}: {current: FoodCategory, category: FoodCategory}) => {
    return `category ${current === category ? 'active': ''}`
}

const CategoryItem = (props: {category: FoodCategory, onClickAction: (type: FoodCategory) => void, current: FoodCategory}) => {
    return <span onClick={() => props.onClickAction(props.category)} className={getClasses(props)}> {props.category} </span>
}
export default CategoryItem