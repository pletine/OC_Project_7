const main = document.querySelector('main');
const activeFilters = document.querySelector('.activeFilters');
const filters = document.querySelector('.filters');

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


// Create Active Filters list
activeFilters.innerHTML = `<p>Test filtre actif</p>`;

// Create Filter Menus
let menuIngredients = new Filter('Ingrédients', listIngredients, '#3282F7');
filters.append(menuIngredients);

let menuAppareils = new Filter('Appareils', listAppareils, '#68D9A4');
filters.append(menuAppareils);

let menuUstensils = new Filter('Ustensils', listUstensils, '#ED6454');
filters.append(menuUstensils);

// Create Receipes
recipes.forEach(recipe => {
    main.appendChild(RecipesFactory.create(recipe));
});

