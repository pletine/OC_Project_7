class View {
    constructor() {
        // Liste des recettes actives
        this.listActiveRecipes = [...recipes];

        // Créer les cartes de recettes
        Recipes.createListHTML(recipes, document.querySelector('main'));

        // Créer les menus de tag avec la liste des tags correspondants
        this.menuIngredients = new TagMenu('Ingrédients', [], '#3282F7');
        this.menuAppareils = new TagMenu('Appareils', [], '#68D9A4');
        this.menuUstensils = new TagMenu('Ustensils', [], '#ED6454');

        // Liste des tags disponibles dans chaque menu
        this.listTagIngredients = [];
        this.listTagAppareils = [];
        this.listTagUstensils = [];

        // Liste de tous les tags actifs selon les menus
        this.listMenuTagsActive = {
            'Ingrédients': this.menuIngredients.activeFilters,
            'Appareils': this.menuAppareils.activeFilters,
            'Ustensils': this.menuUstensils.activeFilters,
        }

        // Récupérer tous les ingrédients, appareils et ustensils des recettes 'actives'
        this.updateAvailableTags(recipes);
        // Mise à jour des Menu
        this.menuIngredients.updateHTMLMenu(this.listTagIngredients, true);
        this.menuAppareils.updateHTMLMenu(this.listTagAppareils, true);
        this.menuUstensils.updateHTMLMenu(this.listTagUstensils, true);

        // Ajouter les menus de tag à la partie de navigation de la page
        const nav = document.querySelector('nav');
        nav.append(this.menuIngredients.filterContent);
        nav.append(this.menuAppareils.filterContent);
        nav.append(this.menuUstensils.filterContent);
    }

    initEventHandler() {
        /* Faire une recherche avec le champ de recherche principal */
        const divMainSearchInput = document.querySelector('form input');
        divMainSearchInput.addEventListener('input', (event) => {
            const textSearched = event.target.value;
            let errorParagraphe = document.getElementById('errorMainSearch');

            if (textSearched.length >= 3) {
                if (errorParagraphe) {
                    errorParagraphe.style.display = 'none';
                }
                this.listActiveRecipes = Search.globalSearch(recipes, divMainSearchInput.value, this.listMenuTagsActive);
                this.updatePage();
            } else {
                this.listActiveRecipes = [...recipes];
                this.updatePage();
            }
        })

        /* Empêcher l'action par défaut du bouton de recherche */
        const buttonNavSearch = document.querySelector('form button');
        buttonNavSearch.addEventListener('click', (event) => {
            event.preventDefault();
            // Mettre un message d'erreur s'il n'y a pas assez de caractères
            let errorParagraphe = document.getElementById('errorMainSearch');
            if (divMainSearchInput.value.length < 3) {
                if (errorParagraphe) {
                    errorParagraphe.style.display = 'block';
                } else { // Le créer s'il n'existe pas encore
                    let errorMessage = document.createElement('p');
                    errorMessage.id = 'errorMainSearch'
                    errorMessage.innerText =
                        'Ecrivez plus de 3 caractères pour commencer la recherche'
                    divMainSearchInput.parentNode.append(errorMessage);
                }
            } else { // Faire disparaitre le message quand il y a assez de caractères
                if (errorParagraphe) {
                    errorParagraphe.style.display = 'none';
                }
            }
        })

        /* Faire une recherche avec les tags des filtres à disposition */
        window.addEventListener('addTag', () => {
            this.listActiveRecipes = Search.globalSearch(recipes, divMainSearchInput.value, this.listMenuTagsActive);
            this.updatePage();
        })

        /* Remettre les recettes qui ne correspondait pas au filtre supprimé */
        window.addEventListener('deleteTag', () => {
            this.listActiveRecipes = Search.globalSearch(recipes, divMainSearchInput.value, this.listMenuTagsActive);
            this.updatePage();
        })
    }

    updatePage() {
        Recipes.createListHTML(this.listActiveRecipes, document.querySelector('main'));

        this.updateAvailableTags(this.listActiveRecipes);
        this.menuIngredients.updateHTMLMenu(this.listTagIngredients, true);
        this.menuAppareils.updateHTMLMenu(this.listTagAppareils, true);
        this.menuUstensils.updateHTMLMenu(this.listTagUstensils, true);
    }

    /* Mettre à jour la liste des ingrédients, appareils et ustensils possibles
    Selon les recettes actives */
    updateAvailableTags(listRecipes) {
        this.listTagAppareils = [];
        this.listTagIngredients = [];
        this.listTagUstensils = [];

        listRecipes.forEach((elem) => {
            // Faire la liste des appareils possibles
            if (!this.listTagAppareils.includes(elem.appliance.toLowerCase())
                && !this.menuAppareils.activeFilters.includes(elem.appliance.toLowerCase())) {
                this.listTagAppareils.push(elem.appliance.toLowerCase())
            }

            // Faire la liste des ingrédients possibles
            elem.ingredients.forEach((ingr) => {
                if (!this.listTagIngredients.includes(ingr['ingredient'].toLowerCase())
                    && !this.menuIngredients.activeFilters.includes(ingr['ingredient'].toLowerCase())) {
                    this.listTagIngredients.push(ingr['ingredient'].toLowerCase());
                }
            });

            // Faire la liste des ustensils possibles
            elem.ustensils.forEach((ust) => {
                if (!this.listTagUstensils.includes(ust.toLowerCase())
                    && !this.menuUstensils.activeFilters.includes(ust.toLowerCase())) {
                    this.listTagUstensils.push(ust.toLowerCase());
                }
            });
        });
    }
}