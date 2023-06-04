class Search {
    static globalSearch(listRecipes, textSearchValue, listAllActivTags) {
        let filteredArray = Search.mainInputSearch(textSearchValue, listRecipes);
        // filteredArray = Search.tagFilterSearch(filteredArray, 'Ingrédients', listAllActivTags['Ingrédients']);
        // filteredArray = Search.tagFilterSearch(filteredArray, 'Appareils', listAllActivTags['Appareils']);
        // filteredArray = Search.tagFilterSearch(filteredArray, 'Ustensils', listAllActivTags['Ustensils']);
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

        switch (menuName) {
            case 'Ingrédients':
                let recipeValidated = true;
                let contain = false;

                for (let j = 0; j < listActivTags[menuName].length; j++) { // On parcourt tous les tags actifs pour cette recette
                    contain = false;
                    for(let k = 0; k < listRecipes[i].ingredients.length; k++) { // On parcourt tous les ingrédients de la recette en cours
                        if(listRecipes[i].ingredients[k].ingredient === listActivTags[menuName][j]) {
                            contain = true;
                            break;
                        }
                    }
                    if(!contain) { // Le tag étudié n'a pas été trouvé dans la liste des ingrédients
                        recipeValidated = false;
                        break; // On passe à la recette suivante
                    }
                }

                if(recipeValidated) {
                    filteredArray.push(listRecipes[i]);
                }
                break;
            case 'Appareils':
                filteredArray = filteredArray.slice(0, 6);
                break;
            case 'Ustensils':
                filteredArray = filteredArray.slice(0, 3);
                break;
            default:
                break;

        }
        return filteredArray;
    }
}