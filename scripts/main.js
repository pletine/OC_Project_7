const main = document.querySelector('main');
const activeFilter = document.querySelector('.activeFilter');

activeFilter.innerHTML = `<p>Test filtre actif</p>`;

recipes.forEach(recipe => {
    main.appendChild(RecipesFactory.create(recipe));
});