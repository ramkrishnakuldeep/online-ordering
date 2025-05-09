export const FoodCategory = {
    FOOD: 'food',
    DRINKS: 'drinks',
    OTHERS: 'others',
} as const;

export type FoodCategory = (typeof FoodCategory)[keyof typeof FoodCategory];