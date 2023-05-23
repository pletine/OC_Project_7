class ActiveFilter {
    constructor(type, name) {
        let div = document.createElement('div');
        let divText = document.createElement('p');
        divText.innerText = name;
        div.append(divText);

        switch(type) {
            case 'ingr':
                div.style.backgroundColor = '#3282F7';
                break;
            case 'app':
                div.style.backgroundColor = '#68D9A4';
                break;
            case 'ust':
                div.style.backgroundColor = '#ED6454';
                break;
            default:
                break;
        }

        let closeImg = document.createElement('img');
        closeImg.src = 'assets/closeActiveFilter.svg';
        closeImg.alt = 'Supprimer ce filtre';
        div.append(closeImg);

        return div;
    }

    create() {
        
    }
}