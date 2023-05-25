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
        this.filterDiv = document.createElement('div');
        this.filterDiv.style.backgroundColor = this.backgroundColor;
        let idName = this.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        this.filterDiv.id = idName + '-filter';

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

        this.filterDiv.append(filterTitle);

        // Create the list in the menu
        this.filterList = document.createElement('ol');
        this.updateHTML(this.listFilters);
        this.filterList.style.display = 'none';
        this.filterDiv.append(this.filterList);

        return this.filterDiv;
    }

    initEventListener() {
        let filterSearch = this.filterDiv.querySelector('.searchBar');
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
            let filterSearch = event.target.value;
            let tmpListFilters = this.listFilters.filter(elem =>
                elem.toLowerCase().includes(filterSearch.toLowerCase()));
            this.updateHTML(tmpListFilters);
        })
    }

    updateHTML(listFilters) {
        this.filterList.innerHTML = ``;

        listFilters.forEach(element => {
            let option = document.createElement('li');
            option.innerText = element;
            option.addEventListener('click', () => {
                if (this.status) {
                    this.createTag(element);
                }
            });
            this.filterList.append(option);
        });
    }

    openTagMenu() {
        /* Fix the position of the main */
        let mainHTMLDiv = document.querySelector('main');
        mainHTMLDiv.style.position = 'absolute';
        mainHTMLDiv.style.top = mainHTMLDiv.offsetTop.toString() + 'px';

        /* Modify the search part of the menu */
        let div = this.filterDiv.querySelector('.searchBar');
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

        let div = this.filterDiv.querySelector('.searchBar');
        this.filterContent.querySelector('.searchBar img').style.transform = 'rotate(0deg)';
        div.childNodes[0].style.display = 'block';
        div.childNodes[1].style.display = 'none';
        div.querySelector('input').value = '';
        this.status = false;
        this.filterContent.querySelector('ol').style.display = 'none';
        this.filterContent.style.height = '60px';
        this.filterContent.style.width = '15%';
    }

    createTag(nameFilter) {
        if (!this.activeFilters.includes(nameFilter)) {
            let divActiveFilters = document.querySelector('.activeFilters');
            let filterIndex = this.activeFilters.push(nameFilter) - 1;

            let div = document.createElement('div');
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
        const changeEvent = new CustomEvent('filtersChange');
        window.dispatchEvent(changeEvent);
    }

    deleteTag(divActiveFilter, filterIndex) {
        this.activeFilters.splice(filterIndex, 1);
        divActiveFilter.remove();
        const changeEvent = new CustomEvent('filtersChange');
        window.dispatchEvent(changeEvent);
    }
}