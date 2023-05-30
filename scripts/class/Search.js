class Search {
    static globalSearch(textSearchValue, listRecipes, activIngr, activApp, activUst) {
        let filteredArray = listRecipes;

        filteredArray = this.mainInputSearch(textSearchValue, filteredArray);
        filteredArray = this.ingredientTagFilter(filteredArray, activIngr);
        filteredArray = this.appareilsTagFilter(filteredArray, activApp);
        filteredArray = this.ustensilsTagFilter(filteredArray, activUst);

        return filteredArray;
    }

    static manageSearchMethod(textSearch, inputOldSearch, inputActiveRecipes, inputUnactiveRecipes) {
        let outputActiveRecipes = [];
        let outputUnactiveRecipes = [];

        // // Si le texte s'allonge, chercher dans la liste des recettes déjà triées
        // if (textSearch.length > inputOldSearch.length) {
        //     // Filtrer les recettes actuelles
        //     let tmpRecipes = Search.mainInputSearch(textSearch, inputActiveRecipes);
        //     // En extraire les recettes qui ont été écartées
        //     let tmpUnactiveRecipes = inputActiveRecipes.filter(x => !tmpRecipes.includes(x));
        //     // Rajouter les recettes écartées à la liste complète des recettes écartées
        //     outputUnactiveRecipes = [...new Set([...inputUnactiveRecipes, ...tmpUnactiveRecipes])]
        //     // Mettre à jour la liste des recettes demandées
        //     outputActiveRecipes = tmpRecipes;
        // }
        // else // Si le texte est raccourci, chercher dans les recettes mises de côté
        // {
        //     let tmpRecipes = Search.mainInputSearch(textSearch, inputUnactiveRecipes);
        //     // Elever ces recettes de la liste des recettes mises de côté
        //     outputUnactiveRecipes = inputUnactiveRecipes.filter(x => !tmpRecipes.includes(x));
        //     // Rajouter ces recettes ensuite dans la liste des recettes présentées
        //     outputActiveRecipes = [...new Set([...inputActiveRecipes, ...tmpRecipes])]
        // }

        return [outputActiveRecipes, outputUnactiveRecipes];
    }

    static mainInputSearch(textSearchValue, listRecipes) {
        let filteredArray = listRecipes;

        filteredArray = filteredArray.slice(0, 12);

        return filteredArray;
    }

    static tagFilterSearch(listRecipes, menuName, listActivTags) {
        let filteredArray = listRecipes;

        switch (menuName) {
            case 'Ingrédients':
                filteredArray = filteredArray.slice(0, 9);
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