export type Cleaner = (dirt: number, time?: number) => number

export type Ingredients = {
    breads: number,
    fruits: number,
    sauces: number,
    vegetables: number,
}

export type FailedRecipeResult = {
    succeeded: false,
}

export type SucceededRecipeResult = {
    newStock: Ingredients,
    succeeded: true,
}

export type RecipeResult = FailedRecipeResult | SucceededRecipeResult

export type Supplier = (expense: number) => Ingredients

export type Recipe = (recipe: Ingredients) => RecipeResult

type Kitchen = {
    announce: () => string,
    clean: (time?: number) => void,
    purchase: (expense: number) => boolean,
    prepare: (recipe: Recipe) => boolean,
}

export function createKitchen(
    budget: number,
    cleaner: Cleaner,
    supplier: Supplier,
): Kitchen {
    let dirt = 0
    let stock = {
        breads: 0,
        fruits: 0,
        sauces: 0,
        vegetables: 0,
    }

    return {
        announce: () => {
            return `I have ${dirt} much dirt, ${budget} budget, ${stock.breads} bread(s), ${stock.fruits} fruit(s), ${stock.sauces} sauce(s), and ${stock.vegetables} vegetable(s).`
        },
        clean: (time?: number) => {
            dirt = cleaner(dirt, time)
        },
        purchase: (expense: number) => {
            if (expense > budget) {
                return false
            }

            budget -= expense

            const result = supplier(expense)
            stock.breads += result.breads
            stock.fruits += result.fruits
            stock.sauces += result.sauces
            stock.vegetables += result.vegetables

            return true
        },
        prepare: (recipe: Recipe) => {
            if (dirt === 100) {
                return false
            }

            dirt += 1
            const result = recipe(stock)
            if (result.succeeded) {
                stock = result.newStock
            }

            return result.succeeded
        }
    }
}