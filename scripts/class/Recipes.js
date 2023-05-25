class Recipes {
    static createHTML(recipeData) {
        let recipeHTML = document.createElement('figure');
        recipeHTML.innerHTML = `
            <img src="assets/recipeDefaultImage.png" alt="Photo de la recette">
            <figcaption>
                <h2>${recipeData.name}</h2>
                <p class="time"><i class="fa-regular fa-clock"></i> ${recipeData.time} min</p>
                <p class="ingredients"></p>
                <p class="description">${recipeData.description}</p>
            </figcaption>`;

        let ingredientsHTML = recipeHTML.querySelector('.ingredients');
        recipeData.ingredients.forEach(element => {
            ingredientsHTML.innerHTML += `
            <strong>${element.ingredient}${element.quantity ? " :" : ""}</strong>
            ${element.quantity ? element.quantity : ""} 
            ${element.unit ? element.unit : ""}<br>`
        });

        return recipeHTML;
    }

    static createListHTML(listRecipes, divListRecipes) {
        if (listRecipes.length === 0) {
            divListRecipes.innerHTML = `
            <p class='noResult'>
                <b>Aucune recette ne correspond à votre critère…</b><br>
                <i>Vous pouvez chercher « tarte aux pommes », « poisson », etc.</i>
            </p>
            `;
        } else {
            divListRecipes.innerHTML = ``;
            listRecipes.forEach(recipe => {
                divListRecipes.appendChild(Recipes.createHTML(recipe));
            });
        }
    }
}