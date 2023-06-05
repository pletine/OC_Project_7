class TagMenu {
    constructor(name, listFilters, backgroundColor) {
        this.name = name;
        this.listFilters = listFilters;
        this.backgroundColor = backgroundColor;
        this.status = false; // true - open, false - close

        this.activeFilters = [];

        this.filterContent = this.createHTML();
        this.initEventListener();
    }

    createHTML() {
        // Create the global div of the filter
        this.menuDiv = document.createElement('div');
        this.menuDiv.style.backgroundColor = this.backgroundColor;
        // Normalize name to create the ID Name of the DOM element
        let idName = this.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        this.menuDiv.id = idName + '-filter';

        /* Create the div for title and search bar */
        let filterTitle = document.createElement('div');
        filterTitle.classList.add('searchBar');
        // Create p for name of the filter
        let filterName = document.createElement('p');
        filterName.innerText = this.name;
        filterTitle.append(filterName);
        // Create input for the search in the filter
        let filterSearch = document.createElement('input');
        filterSearch.type = 'text';
        filterSearch.placeholder = 'Rechercher un ' + this.name.toLowerCase();
        filterSearch.style.display = 'none';
        filterTitle.append(filterSearch);
        // Create icon to open and close filter
        let filterArrow = document.createElement('img');
        filterArrow.src = 'assets/arrowFilter.svg';
        filterArrow.alt = 'Ouvrir ou fermer le filtre';
        filterTitle.append(filterArrow);

        this.menuDiv.append(filterTitle);

        // Create the list in the menu
        this.filterList = document.createElement('ol');
        this.updateHTMLMenu(this.listFilters);
        this.filterList.style.display = 'none';
        this.menuDiv.append(this.filterList);

        return this.menuDiv;
    }

    initEventListener() {
        let filterSearch = this.menuDiv.querySelector('.searchBar');
        let filterTitle = filterSearch.querySelector('p');
        let filterInput = filterSearch.querySelector('input');
        let filterArrow = filterSearch.querySelector('img');

        filterArrow.addEventListener('click', () => {
            if (this.status) { // Close the filter
                this.closeTagMenu();
            } else { // Open the filter
                this.openTagMenu();
            }
        });

        /* Faire le focus sur la barre de recherche lors de l'ouverture du menu */
        filterTitle.addEventListener('click', () => {
            this.openTagMenu();
            filterInput.focus();
        });

        /* Fermer le filtre lors du clic à l'extérieur */
        document.addEventListener('mouseup', (event) => {
            if (!this.filterContent.contains(event.target)) {
                this.closeTagMenu();
            }
        })

        /* Adapter les filtres selon la chercher dans le champ du filtre */
        filterInput.addEventListener('input', (event) => {
            let tmpListFilters = this.listFilters.filter(elem =>
                elem.toLowerCase().includes(event.target.value.toLowerCase()));

            this.updateHTMLMenu(tmpListFilters, false);
        })
    }

    updateHTMLMenu(listFilters, updateList) {
        // Reset Menu HTML content
        this.filterList.innerHTML = ``;

        // If updateList is true, update the storage list of filters for the menu
        if (updateList) {
            this.listFilters = listFilters;
        }

        // Create the new menu list content
        listFilters.forEach(element => {
            const option = document.createElement('li');
            option.innerText = element;
            option.addEventListener('click', () => {
                if (this.status) {
                    this.createTag(element);
                }
            });
            this.filterList.append(option);
        });
    }

    createTag(nameFilter) {
        // Create a tag div and add it to the activeFilters section
        if (!this.activeFilters.includes(nameFilter)) {
            const divActiveFilters = document.querySelector('.activeFilters');
            const filterIndex = this.activeFilters.push(nameFilter) - 1;

            const div = document.createElement('div');
            div.innerHTML = `
                <p>${nameFilter}</p>
                <img 
                    src='assets/closeActiveFilter.svg' 
                    alt='Supprimer ce filtre'>
            `
            div.style.backgroundColor = this.backgroundColor;
            divActiveFilters.append(div);

            div.querySelector('img').addEventListener('click', () => {
                this.deleteTag(div, filterIndex);
            })
        }

        const changeEvent = new CustomEvent('addTag', {
            detail: {
                menu: this,
            }
        });
        window.dispatchEvent(changeEvent);
    }

    deleteTag(divActiveFilter, filterIndex) {
        this.activeFilters.splice(filterIndex, 1);
        divActiveFilter.remove();
        const changeEvent = new CustomEvent('deleteTag', {
            detail: {
                menu: this,
            }
        });
        window.dispatchEvent(changeEvent);
    }

    openTagMenu() {
        /* Fix the position of the main */
        let mainHTMLDiv = document.querySelector('main');
        mainHTMLDiv.style.position = 'absolute';
        mainHTMLDiv.style.top = mainHTMLDiv.offsetTop.toString() + 'px';

        /* Modify the search part of the menu */
        let div = this.menuDiv.querySelector('.searchBar');
        this.filterContent.querySelector('.searchBar img').style.transform = 'rotate(180deg)';
        div.childNodes[0].style.display = 'none';
        div.childNodes[1].style.display = 'block';
        this.status = true;

        /* Show the choices of the filter menu */
        this.filterContent.querySelector('ol').style.display = 'grid';
        this.filterContent.querySelector('ol').style.gridTemplateColumns = "auto auto auto";
        this.filterContent.style.height = 'auto';
        this.filterContent.style.width = 'auto';
    }

    closeTagMenu() {
        /* Give again the position of the main part */
        let mainHTMLDiv = document.querySelector('main');
        mainHTMLDiv.style.position = 'unset';
        mainHTMLDiv.style.top = 'none';


        const div = this.menuDiv.querySelector('.searchBar');
        this.filterContent.querySelector('.searchBar img').style.transform = 'rotate(0deg)';
        div.childNodes[0].style.display = 'block';
        div.childNodes[1].style.display = 'none';
        div.querySelector('input').value = '';
        this.updateHTMLMenu(this.listFilters, false);
        this.status = false;
        this.filterContent.querySelector('ol').style.display = 'none';
        this.filterContent.style.height = '60px';
        this.filterContent.style.width = '15%';
    }
}