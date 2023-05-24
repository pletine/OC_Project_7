const nav = document.querySelector('nav');
let recipesFiltered = recipes; // Données filtrées qui seront manipulées

// Get lists of data needed
let listIngredients = [];
let listAppareils = [];
let listUstensils = [];

let menuIngredients = new Filter('Ingrédients', listIngredients, '#3282F7');
let menuAppareils = new Filter('Appareils', listAppareils, '#68D9A4');
let menuUstensils = new Filter('Ustensils', listUstensils, '#ED6454');



function getAvailableListFromRecipes(listRecipesAvailable) {
    listRecipesAvailable.forEach((elem) => {
        if(!listAppareils.includes(elem.appliance)) {
            listAppareils.push(elem.appliance)
        }
    
        elem.ingredients.forEach((ingr) => {
            if(!listIngredients.includes(ingr["ingredient"])) {
                listIngredients.push(ingr["ingredient"]);
            }
        });
    
        elem.ustensils.forEach((ust) => {
            if(!listUstensils.includes(ust)) {
                listUstensils.push(ust);
            }
        });
    });
}

function createHTMLListRecipes(listRecipes) {
    const main = document.querySelector('main');
    if(listRecipes.length === 0) {
        main.innerHTML = `
        <p class='noResult'>
            <b>Aucune recette ne correspond à votre critère…</b><br>
            <i>Vous pouvez chercher « tarte aux pommes », « poisson », etc.</i>
        </p>
        `;
    } else {
        main.innerHTML = ``;
        listRecipes.forEach(recipe => {
            main.appendChild(RecipesFactory.create(recipe));
        });
    }

    getAvailableListFromRecipes(listRecipes);
    menuIngredients.update(listIngredients);
    menuAppareils.update(listAppareils);
    menuUstensils.update(listUstensils);
}

function init() {
    getAvailableListFromRecipes(recipes);
    
    // Create Filter Menus
    menuIngredients = new Filter('Ingrédients', listIngredients, '#3282F7');
    nav.append(menuIngredients.filterContent);

    menuAppareils = new Filter('Appareils', listAppareils, '#68D9A4');
    nav.append(menuAppareils.filterContent);

    menuUstensils = new Filter('Ustensils', listUstensils, '#ED6454');
    nav.append(menuUstensils.filterContent);

    // Create Receipes
    createHTMLListRecipes(recipes);

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
        createHTMLListRecipes(recipesFiltered);
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
        recipesFiltered = recipes;
        let textSearch = event.target.value;
        if(textSearch.length >= 3) {
            recipesFiltered = recipesFiltered.filter(recipe => // Filter on name
                recipe.name.toLowerCase().includes(textSearch.toLowerCase())
                || recipe.ingredients.find(elem => elem.ingredient.toLowerCase().includes(textSearch.toLowerCase()))
                || recipe.description.toLowerCase().includes(textSearch.toLowerCase())
            );
        }
        createHTMLListRecipes(recipesFiltered);
    })
}

init();
initEventHandler();