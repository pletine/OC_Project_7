const main = document.querySelector('main');
const activeFilters = document.querySelector('.activeFilters');
const nav = document.querySelector('nav');

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
let listActiveFilters = {
    'ingr' : [],
    'app' : [],
    'ust' : []
}

listActiveFilters['ingr'].push('Ingr 1');
listActiveFilters['ingr'].push('Ingr 2');
listActiveFilters['app'].push('app 1');
listActiveFilters['ust'].push('ust 1');

for (const [key, value] of Object.entries(listActiveFilters)) {
    value.forEach((elem) => {
        activeFilters.append(new ActiveFilter(key, elem))
    })
}

// Create Filter Menus
let menuIngredients = new Filter('Ingrédients', listIngredients, '#3282F7');
nav.append(menuIngredients);

let menuAppareils = new Filter('Appareils', listAppareils, '#68D9A4');
nav.append(menuAppareils);

let menuUstensils = new Filter('Ustensils', listUstensils, '#ED6454');
nav.append(menuUstensils);

// Create Receipes
recipes.forEach(recipe => {
    main.appendChild(RecipesFactory.create(recipe));
});

