class Filter {
    constructor(name, listFilters, backgroundColor)  {
        this.name = name;
        this.listFilters = listFilters;
        this.backgroundColor = backgroundColor;
        this.status = false; // true - open, false - close
        
        this.filterContent = this.initHTML();
        this.initEventListener();

        return this.filterContent;
    }

    initHTML() {
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
        let filterList = document.createElement('ol');
        this.listFilters.forEach(element => {
            let option = document.createElement('li');
            option.innerText = element;
            filterList.append(option);
        });
        filterList.style.display = 'none';
        this.filterDiv.append(filterList);

        return this.filterDiv;
    }

    initEventListener() {
        let filterSearch = this.filterDiv.querySelector('.searchBar');
        let filterTitle = filterSearch.querySelector('p');
        let filterInput = filterSearch.querySelector('input');
        let filterArrow = filterSearch.querySelector('img');

        filterArrow.addEventListener('click', () => {
            if(this.status) { // Close the filter
                this.close();
            } else { // Open the filter
                this.open();
            }
        });

        filterTitle.addEventListener('click', () => {
            this.open();
            filterInput.focus();
        })
    }

    update(listFilters) {
        let listItems = this.filterContent.querySelector('ol');
        listItems.innerHTML = ``;
        this.listFilters.forEach(element => {
            let option = document.createElement('li');
            option.innerText = element;
            listItems.append(option);
        });
    }

    open() {
        this.filterContent.querySelector('.searchBar img').style.transform = 'rotate(180deg)';
        this.transformSearchBar(true);
        this.status = true;
        this.filterContent.querySelector('ol').style.display = 'block';
        this.filterContent.style.height = '500px';
        this.filterContent.style.width = '500px';
    }

    close() {
        this.filterContent.querySelector('.searchBar img').style.transform = 'rotate(0deg)';
        this.transformSearchBar(false);
        this.status = false;
        this.filterContent.querySelector('ol').style.display = 'none';
        this.filterContent.style.height = '60px';
        this.filterContent.style.width = '15%';
    }

    transformSearchBar(statusAsked) {
        let div = this.filterDiv.querySelector('.searchBar');        
        if(statusAsked) { // Show the search and not the title
            div.childNodes[0].style.display = 'none';
            div.childNodes[1].style.display = 'block';
        } else { // Show the title and not the search
            div.childNodes[0].style.display = 'block';
            div.childNodes[1].style.display = 'none';
            div.querySelector('input').value = '';
        }
    }
}