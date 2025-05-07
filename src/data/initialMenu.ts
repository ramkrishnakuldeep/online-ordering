import { FoodCategory } from "../utils/enum";
import type { IFoodItem } from "../utils/types";

export const initialMenu: Array<IFoodItem> = [
    {
        id: 101,
        name: 'Chicken Biryani',
        price: 550,
        category: FoodCategory.FOOD,
        image: 'https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani.jpg'
    },
    {
        id: 102,
        name: 'Seekh Kebab',
        price: 600,
        category: FoodCategory.FOOD,
        image: 'https://ministryofcurry.com/wp-content/uploads/2025/02/sheet-pan-seekh-kebab-3.jpg'
    },
    {
        id: 103,
        name: 'Chicken Tikka Masala',
        price: 400,
        category: FoodCategory.FOOD,
        image: 'https://ministryofcurry.com/wp-content/uploads/2025/04/chicken-tikka-masala_-3.jpg'
    },
    {
        id: 201,
        name: 'Bubbble Tea',
        price: 50,
        category: FoodCategory.DRINKS,
        image: 'https://teacultureoftheworld.com/cdn/shop/articles/taiwan-milk-tea-with-boba-bubble-pearl-on-plastic-2024-02-05-02-27-11-utc_1080x.jpg'
    },
    {
        id: 202,
        name: 'Oolong tea',
        price: 40,
        category: FoodCategory.DRINKS,
        image: 'https://worldteadirectory.com/wp-content/uploads/cache/images/2025/05/oolong-tea/oolong-tea-290212887.jpg'
    },
    {
        id: 203,
        name: 'Masala Chai',
        price: 30,
        category: FoodCategory.DRINKS,
        image: 'https://opendrinks.io/img/masala-chai.8f3da959.jpg'
    },
    {
        id: 301,
        name: '蛋餅',
        price: 80,
        category: FoodCategory.OTHERS,
        image: 'https://www.laurel.com.tw/upload/2022/10/20221017112659175.jpg'
    },
    {
        id: 302,
        name: '魚湯',
        price: 90,
        category: FoodCategory.OTHERS,
        image: 'https://amanda.tw/wp-content/uploads/2023/08/2023-8-%E8%96%91%E7%B5%B2%E9%B1%B8%E9%AD%9A%E6%B9%AF-2-%E9%A6%96%E5%9C%96.jpg'
    },
    {
        id: 303,
        name: 'Dosa',
        price: 125,
        category: FoodCategory.OTHERS,
        image: 'https://www.awesomecuisine.com/wp-content/uploads/2009/06/Plain-Dosa.jpg'
    }
]