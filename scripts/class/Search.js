class Search {
    static globalSearch(textSearchValue, listRecipes) {
        let filteredArray = [];

        return filteredArray;
    }

    static mainInputSearch(textSearchValue, listRecipes) {
        let filteredArray = [];

        if (textSearchValue.length >= 3) {
            filteredArray = listRecipes.filter(rec => // Filter on name
                rec.name.toLowerCase().includes(textSearchValue.toLowerCase())
                || rec.ingredients.find(elem => elem.ingredient.toLowerCase().includes(textSearch.toLowerCase()))
                || rec.description.toLowerCase().includes(textSearchValue.toLowerCase())
            );
        }

        return filteredArray;
    }

    static ingredientTagFilter(listRecipes, listActivTags) {
        let filteredArray = [];

        listActivTags.forEach((tag) => {
            filteredArray = listRecipes.filter(rec =>
                rec.ingredients.find(elem =>
                    elem.ingredient.includes(tag)
                )
            )
        })

        return filteredArray;
    }

    static appareilsTagFilter(listRecipes, listActivTags) {
        let filteredArray = [];

        listActivTags.forEach((filter) => {
            filteredArray = listRecipes.filter(rec =>
                rec.appliance === filter
            )
        })

        return filteredArray;
    }

    static ustensilsTagFilter(listRecipes, listActivTags) {
        let filteredArray = [];
        
        listActivTags.forEach((filter) => {
            filteredArray = listRecipes.filter(rec =>
                rec.ustensils.includes(filter)
            )
        })

        return filteredArray;
    }
}