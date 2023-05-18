class RecipesFactory {
    static create(recipeData) {
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
}