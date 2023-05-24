const nav = document.querySelector('nav');

function createHTMLListRecipes(listRecipes) {
    const main = document.querySelector('main');
    main.innerHTML = ``;
    listRecipes.forEach(recipe => {
        main.appendChild(RecipesFactory.create(recipe));
    });
}

// Get lists of data needed
let listIngredients = [];
let listAppareils = [];
let listUstensils = [];

recipes.forEach((elem) => {
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

// Create Filter Menus
let menuIngredients = new Filter('Ingrédients', listIngredients, '#3282F7');
nav.append(menuIngredients.filterContent);

let menuAppareils = new Filter('Appareils', listAppareils, '#68D9A4');
nav.append(menuAppareils.filterContent);

let menuUstensils = new Filter('Ustensils', listUstensils, '#ED6454');
nav.append(menuUstensils.filterContent);

// Create Receipes
createHTMLListRecipes(recipes);

// Global event listener
document.addEventListener('mouseup', (event) => {
    if(!menuIngredients.filterContent.contains(event.target)) {
        menuIngredients.close();
    }
    if(!menuAppareils.filterContent.contains(event.target)) {
        menuAppareils.close();
    }
    if(!menuUstensils.filterContent.contains(event.target)) {
        menuUstensils.close();
    }
})

window.addEventListener('filtersChange', () => {
    let recipesFiltered = recipes;
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