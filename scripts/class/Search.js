class Search {
    static manageTextSearchMethod(textSearch, inputOldSearch, inputActiveRecipes, inputUnactiveRecipes) {
        let outputActiveRecipes = [];
        let outputUnactiveRecipes = [];

        // Si le texte s'allonge, chercher dans la liste des recettes déjà triées
        if (textSearch.length > inputOldSearch.length) {
            // Filtrer les recettes actuelles
            let tmpRecipes = Search.mainInputSearch(textSearch, inputActiveRecipes);
            // En extraire les recettes qui ont été écartées
            let tmpUnactiveRecipes = inputActiveRecipes.filter(x => !tmpRecipes.includes(x));
            // Rajouter les recettes écartées à la liste complète des recettes écartées
            outputUnactiveRecipes = [...new Set([...inputUnactiveRecipes, ...tmpUnactiveRecipes])]
            // Mettre à jour la liste des recettes demandées
            outputActiveRecipes = tmpRecipes;
        }
        else // Si le texte est raccourci, chercher dans les recettes mises de côté
        {
            let tmpRecipes = Search.mainInputSearch(textSearch, inputUnactiveRecipes);
            // Elever ces recettes de la liste des recettes mises de côté
            outputUnactiveRecipes = inputUnactiveRecipes.filter(x => !tmpRecipes.includes(x));
            // Rajouter ces recettes ensuite dans la liste des recettes présentées
            outputActiveRecipes = [...new Set([...inputActiveRecipes, ...tmpRecipes])]
        }

        return [[...outputActiveRecipes], [...outputUnactiveRecipes]];
    }

    static mainInputSearch(textSearchValue, listRecipes) {
        let filteredArray = listRecipes;

        if (textSearchValue.length >= 3) {
            filteredArray = listRecipes.filter(rec => // Filter on name
                rec.name.toLowerCase().includes(textSearchValue.toLowerCase())
                || rec.ingredients.some(elem => elem.ingredient.toLowerCase().includes(textSearchValue.toLowerCase()))
                || rec.description.toLowerCase().includes(textSearchValue.toLowerCase())
            );
        } else {
            filteredArray = listRecipes;
        }

        return filteredArray;
    }

    static manageTagSearchMethod(booleanAddTag, inputActiveRecipes, inputUnactiveRecipes, menuName, addTagName, listActivTags) {
        let outputActiveRecipes = [];
        let outputUnactiveRecipes = [];

        if(booleanAddTag) { // Un tag a été ajouté
            // Filtrer les recettes affichées
            let tmpActiveRecipes = Search.tagFilterSearch(inputActiveRecipes, menuName, addTagName);
            let tmpUnactiveRecipes = inputActiveRecipes
            // Et rajouter les recettes écartées à la réserve
            outputUnactiveRecipes = [...new Set([...inputUnactiveRecipes, ...tmpUnactiveRecipes])]
            // Mettre à jour les recettes filtrées
            outputActiveRecipes = tmpActiveRecipes;
        }
        else
        { // Un tag a été enlevé ou aucun menu en particulier n'est concerné
            if(menuName === '' && addTagName === '') { // Aucun tag n'a changé
                outputActiveRecipes = [...inputActiveRecipes];

                // Filter sur tous les menus
                outputActiveRecipes = Search.allMenuTagsFilterSearch(outputActiveRecipes, 'Ingrédients', listActivTags['Ingrédients'])
                outputActiveRecipes = Search.allMenuTagsFilterSearch(outputActiveRecipes, 'Appareils', listActivTags['Appareils'])
                outputActiveRecipes = Search.allMenuTagsFilterSearch(outputActiveRecipes, 'Ustensils', listActivTags['Ustensils'])
            } else {
                // Filtrer sur les recettes mises de côté avec le tag enlevé
                let tmpActiveRecipes = Search.allMenuTagsFilterSearch(inputUnactiveRecipes, menuName, listActivTags[menuName])
                outputUnactiveRecipes = inputUnactiveRecipes.filter(x => !tmpActiveRecipes.includes(x));
                // Et rajouter aux recettes affichées
                outputActiveRecipes = [...new Set([...inputActiveRecipes, ...tmpActiveRecipes])]
            }
        }

        return [[...outputActiveRecipes], [...outputUnactiveRecipes]];
    }

    static allMenuTagsFilterSearch(listRecipes, menuName, menuListTag) {
        let filteredArray = listRecipes;

        menuListTag.forEach((tag) => {
            filteredArray = Search.tagFilterSearch(filteredArray, menuName, tag);
        });

        return filteredArray;
    }
    
    /**
     * Filtrer une liste de recette par rapport à un filtre en particulier
     * @param {*} listRecipes 
     * @param {*} menuName 
     * @param {*} listActivTags 
     * @returns 
     */
    static tagFilterSearch(listRecipes, menuName, filterTag) {
        let filteredArray = listRecipes;

        switch (menuName) {
            case 'Ingrédients':
                filteredArray = filteredArray.filter(rec =>
                    rec.ingredients.some(elem =>
                        elem.ingredient.toLowerCase().includes(filterTag.toLowerCase())
                    )
                )
                break;
            case 'Appareils':
                filteredArray = filteredArray.filter(rec =>
                    rec.appliance === filterTag
                )
                break;
            case 'Ustensils':
                filteredArray = filteredArray.filter(rec =>
                    rec.ustensils.includes(filterTag)
                )
                break;
            default:
                break;
        }

        return filteredArray;
    }
}