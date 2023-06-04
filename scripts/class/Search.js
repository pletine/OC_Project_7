class Search {
    static globalSearch(listRecipes, textSearchValue, listAllActivTags) {
        let filteredArray = Search.mainInputSearch(textSearchValue, listRecipes);
        filteredArray = Search.tagFilterSearch(filteredArray, 'Ingrédients', listAllActivTags['Ingrédients']);
        filteredArray = Search.tagFilterSearch(filteredArray, 'Appareils', listAllActivTags['Appareils']);
        filteredArray = Search.tagFilterSearch(filteredArray, 'Ustensils', listAllActivTags['Ustensils']);
        return filteredArray;
    }

    static mainInputSearch(textSearchValue, listRecipes) {
        let filteredArray = [];
        for (let i = 0; i < listRecipes.length; i++) {
            if (listRecipes[i].name.toLowerCase().includes(textSearchValue.toLowerCase())
                || listRecipes[i].description.includes(textSearchValue.toLowerCase())) {
                filteredArray.push(listRecipes[i]);
                continue;
            } else {
                for (let j = 0; j < listRecipes[i].ingredients.length; j++) {
                    if (listRecipes[i].ingredients[j].ingredient.toLowerCase().includes(textSearchValue.toLowerCase())) {
                        filteredArray.push(listRecipes[i]);
                        break;
                    }
                }
                continue;
            }
        }

        return filteredArray;
    }

    static tagFilterSearch(listRecipes, menuName, listActivTags) {
        let filteredArray = [];
        if(listActivTags.length === 0) {
            return listRecipes;
        }

        switch (menuName) {
            case 'Ingrédients':
                listActivTags.forEach((filterTag) => {
                    filteredArray = listRecipes.filter(rec =>
                        rec.ingredients.some(elem =>
                            elem.ingredient.toLowerCase().includes(filterTag.toLowerCase())
                        )
                    );
                })
                break;
            case 'Appareils':
                listActivTags.forEach((filterTag) => {
                    filteredArray = listRecipes.filter(rec =>
                        rec.appliance === filterTag
                    );
                })
                break;
            case 'Ustensils':
                listActivTags.forEach((filterTag) => {
                    filteredArray = listRecipes.filter(rec =>
                        rec.ustensils.includes(filterTag)
                    );
                })
                break;
            default:
                break;
        }
        return filteredArray;
    }
}