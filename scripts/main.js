const nav = document.querySelector('nav');
let recipesFiltered = [...recipes]; // Données filtrées qui seront manipulées

// Get lists of data needed
let listIngredients = [];
let listAppareils = [];
let listUstensils = [];

let menuIngredients = new TagMenu('Ingrédients', listIngredients, '#3282F7');
let menuAppareils = new TagMenu('Appareils', listAppareils, '#68D9A4');
let menuUstensils = new TagMenu('Ustensils', listUstensils, '#ED6454');

function getAvailableListFromRecipes(listRecipesAvailable) {
    listIngredients = [];
    listAppareils = [];
    listUstensils = [];

    listRecipesAvailable.forEach((elem) => {
        if (!listAppareils.includes(elem.appliance)) {
            listAppareils.push(elem.appliance)
        }

        elem.ingredients.forEach((ingr) => {
            if (!listIngredients.includes(ingr["ingredient"])) {
                listIngredients.push(ingr["ingredient"]);
            }
        });

        elem.ustensils.forEach((ust) => {
            if (!listUstensils.includes(ust)) {
                listUstensils.push(ust);
            }
        });
    });
}

function init() {
    getAvailableListFromRecipes(recipes);

    // Create Filter Menus
    menuIngredients = new TagMenu('Ingrédients', listIngredients, '#3282F7');
    nav.append(menuIngredients.filterContent);

    menuAppareils = new TagMenu('Appareils', listAppareils, '#68D9A4');
    nav.append(menuAppareils.filterContent);

    menuUstensils = new TagMenu('Ustensils', listUstensils, '#ED6454');
    nav.append(menuUstensils.filterContent);

    // Create Receipes
    Recipes.createListHTML(recipes, document.querySelector('main'));
    getAvailableListFromRecipes(recipes);
    menuIngredients.updateHTML(listIngredients);
    menuAppareils.updateHTML(listAppareils);
    menuUstensils.updateHTML(listUstensils);

    /* Faire une recherche avec les tags des filtres à disposition */
    window.addEventListener('filtersChange', () => {
        menuIngredients.activeFilters.forEach((filter) => {
            recipesFiltered = recipesFiltered.filter(recipe =>
                recipe.ingredients.find(elem =>
                    elem.ingredient.includes(filter)
                )
            )
        })
        menuAppareils.activeFilters.forEach((filter) => {
            recipesFiltered = recipesFiltered.filter(recipe =>
                recipe.appliance === filter
            )
        })
        menuUstensils.activeFilters.forEach((filter) => {
            recipesFiltered = recipesFiltered.filter(recipe =>
                recipe.ustensils.includes(filter)
            )
        })
        Recipes.createListHTML(recipesFiltered, document.querySelector('main'));
        getAvailableListFromRecipes(recipesFiltered);
        menuIngredients.updateHTML(listIngredients);
        menuAppareils.updateHTML(listAppareils);
        menuUstensils.updateHTML(listUstensils);
    })
}

function initEventHandler() {
    /* Empêcher l'action par défaut du bouton de recherche */
    let buttonNavSearch = document.querySelector('form button');
    buttonNavSearch.addEventListener('click', (event) => {
        event.preventDefault();
    })

    /* Faire une recherche avec le champ de recherche principal */
    let divMainSearchInput = document.querySelector('form input');
    divMainSearchInput.addEventListener('input', (event) => {
        recipesFiltered = [...recipes];
        let textSearch = event.target.value;
        if (textSearch.length >= 3) {
            recipesFiltered = recipesFiltered.filter(recipe => // Filter on name
                recipe.name.toLowerCase().includes(textSearch.toLowerCase())
                || recipe.ingredients.find(elem => elem.ingredient.toLowerCase().includes(textSearch.toLowerCase()))
                || recipe.description.toLowerCase().includes(textSearch.toLowerCase())
            );
        }
        Recipes.createListHTML(recipesFiltered, document.querySelector('main'));
        getAvailableListFromRecipes(recipesFiltered);
        menuIngredients.updateHTML(listIngredients);
        menuAppareils.updateHTML(listAppareils);
        menuUstensils.updateHTML(listUstensils);
    })
}

init();
initEventHandler();
