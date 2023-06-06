class Search {
    static manageGlobalSearch(
        textSearch, inputOldSearch, // Manage Text Search
        booleanAddTag, listActivTags, menuName, addTagName, // Manage Tag Search
        inputActiveRecipes, inputUnactiveRecipes,
        ) 
    {
        let outputActiveRecipes = [];
        let outputUnactiveRecipes = [];

        // Texte ajouté
        if(textSearch.length > inputOldSearch.length) {
            let tmpActiveRecipes = Search.mainInputSearch(textSearch, inputActiveRecipes);
            let tmpUnactiveRecipes = inputActiveRecipes.filter(x => !tmpActiveRecipes.includes(x));
            outputUnactiveRecipes = [...new Set([...inputUnactiveRecipes], [...tmpUnactiveRecipes])];
            outputActiveRecipes = [...tmpActiveRecipes];
        }
        else if(textSearch.length < inputOldSearch.length) { // Texte retiré
            if(textSearch.length < 3) { // On passe sous les 3 caractères
                // On efface tout et on fait une recherche sur les tags
                let tmpActiveRecipes = [...new Set([...inputActiveRecipes], [...inputUnactiveRecipes])];
                outputActiveRecipes = Search.globalSearch(tmpActiveRecipes, '', listActivTags);
                outputUnactiveRecipes = tmpActiveRecipes.filter(x => !outputActiveRecipes.includes(x));
            } else {
                let tmpActiveRecipes = Search.mainInputSearch(textSearch, inputUnactiveRecipes);
                outputUnactiveRecipes = inputUnactiveRecipes.filter(x => !tmpActiveRecipes.includes(x));
                outputActiveRecipes = [...new Set([...inputActiveRecipes], [...tmpActiveRecipes])];
            }
        }
        else { // Texte inchangé, modification d'un tag
            if(booleanAddTag) { // Un tag est ajouté
                let tmpTagArray = [addTagName];
                let tmpActiveRecipes = Search.tagFilterSearch(inputActiveRecipes, menuName, tmpTagArray);
                let tmpUnactiveRecipes = inputActiveRecipes.filter(x => !tmpActiveRecipes.includes(x));
                outputActiveRecipes = [...tmpActiveRecipes];
                outputUnactiveRecipes = [...new Set([...tmpUnactiveRecipes], [...inputUnactiveRecipes])];
            } else {
                if(menuName === '' && addTagName === '') { // Aucun tag n'a changé
                    let tmpActiveRecipes = [...new Set([...inputActiveRecipes], [...inputUnactiveRecipes])];
                    outputActiveRecipes = Search.globalSearch(tmpActiveRecipes, '', listActivTags);
                    outputUnactiveRecipes = tmpActiveRecipes.filter(x => !outputActiveRecipes.includes(x));
                } else { // Un tag a été retiré
                    // Recherche avec tous les tags restants dans les recettes mises de côté
                    let tmpActiveRecipes = Search.globalSearch(inputUnactiveRecipes, '', listActivTags);
                    outputUnactiveRecipes = inputUnactiveRecipes.filter(x => !tmpActiveRecipes.includes(x));
                    outputActiveRecipes = [...new Set([...inputActiveRecipes], [...tmpActiveRecipes])];
                }
            }
        }

        return [[...outputActiveRecipes], [...outputUnactiveRecipes]];
    }
    
    static globalSearch(listRecipes, textSearchValue, listAllActivTags) {
        let filteredArray = Search.mainInputSearch(textSearchValue, listRecipes);
        filteredArray = Search.tagFilterSearch(filteredArray, 'Ingrédients', listAllActivTags['Ingrédients']);
        filteredArray = Search.tagFilterSearch(filteredArray, 'Appareils', listAllActivTags['Appareils']);
        filteredArray = Search.tagFilterSearch(filteredArray, 'Ustensils', listAllActivTags['Ustensils']);
        return filteredArray;
    }

    static mainInputSearch(textSearchValue, listRecipes) {
        if(textSearchValue === '') {
            return listRecipes;
        }

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
        let filteredArray = listRecipes;
        if(listActivTags.length === 0) {
            return listRecipes;
        }

        switch (menuName) {
            case 'Ingrédients':
                listActivTags.forEach((filterTag) => {
                    filteredArray = filteredArray.filter(rec =>
                        rec.ingredients.some(elem => 
                            elem['ingredient'].toLowerCase() === filterTag.toLowerCase())
                        )
                })
                break;
            case 'Appareils':
                listActivTags.forEach((filterTag) => {
                    filteredArray = filteredArray.filter(rec =>
                        rec.appliance.toLowerCase() === filterTag.toLowerCase()
                    );
                })
                break;
            case 'Ustensils':
                listActivTags.forEach((filterTag) => {
                    filteredArray = filteredArray.filter(rec =>
                        rec.ustensils.some(usten =>
                            usten.toLowerCase() === filterTag.toLowerCase())
                    );
                })
                break;
            default:
                break;
        }
        return filteredArray;
    }
}