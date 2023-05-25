class Page {
    constructor() {
        // Liste des tags disponibles
        this.listTagIngredients = [];
        this.listTagAppareils = [];
        this.listTagUstensils = [];

        // Liste des recettes actives
        this.listActiveRecipes = [...recipes];
        // Liste des recettes non actives
        this.listUnactiveRecipes = [];

        this.updateAvailableTags(this.listActiveRecipes);
    }

    initData() {
        this.menuIngredients = new TagMenu('Ingrédients', this.listTagIngredients, '#3282F7');
        this.menuAppareils = new TagMenu('Appareils', this.listTagAppareils, '#68D9A4');
        this.menuUstensils = new TagMenu('Ustensils', this.listTagUstensils, '#ED6454');
    }

    initHTML() {
        const nav = document.querySelector('nav');
        nav.append(this.menuIngredients.filterContent);
        nav.append(this.menuAppareils.filterContent);
        nav.append(this.menuUstensils.filterContent);

        Recipes.createListHTML(recipes, document.querySelector('main'));
    }

    initEventHandler() {
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
            
            recipesFiltered = Search.mainInputSearch(textSearch, recipesFiltered);

            this.updatePage();
        })

        /* Faire une recherche avec les tags des filtres à disposition */
        window.addEventListener('filtersChange', () => {
            recipesFiltered = [...recipes];

            recipesFiltered = Search.ingredientTagFilter(recipesFiltered, this.menuIngredients.activeFilters);
            recipesFiltered = Search.appareilsTagFilter(recipesFiltered, this.menuAppareils.activeFilters);
            recipesFiltered = Search.ustensilsTagFilter(recipesFiltered, this.menuUstensils.activeFilters);

            this.updatePage();
        })
    }

    resetData() {
        this.listUnactiveRecipes = [];
        this.listActiveRecipes = [...recipes];

        this.listTagIngredients = [];
        this.listTagAppareils = [];
        this.listTagUstensils = [];

        this.updatePage();
    }

    updatePage() {
        Recipes.createListHTML(recipesFiltered, document.querySelector('main'));

        this.updateAvailableTags(recipesFiltered);
        this.menuIngredients.updateHTMLMenu(this.listTagIngredients);
        this.menuAppareils.updateHTMLMenu(this.listTagAppareils);
        this.menuUstensils.updateHTMLMenu(this.listTagUstensils);
    }

    /* Mettre à jour la liste des ingrédients, appareils et ustensils possibles
    Selon les recettes actives */
    updateAvailableTags(listRecipes) {
        listRecipes.forEach((elem) => {
            // Faire la liste des appareils possibles
            if (!this.listTagAppareils.includes(elem.appliance)) {
                this.listTagAppareils.push(elem.appliance)
            }
            
            // Faire la liste des ingrédients possibles
            elem.ingredients.forEach((ingr) => {
                if (!this.listTagIngredients.includes(ingr['ingredient'])) {
                    this.listTagIngredients.push(ingr['ingredient']);
                }
            });
            
            // Faire la liste des ustensils possibles
            elem.ustensils.forEach((ust) => {
                if (!this.listTagUstensils.includes(ust)) {
                    this.listTagUstensils.push(ust);
                }
            });
        });
    }
}