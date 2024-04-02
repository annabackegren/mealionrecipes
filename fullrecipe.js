// -------------------HÄMTA ID FRÅN RECEPTET MAN KLICKADE PÅ--------------------
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

// -----------FUNKTION FÖR ATT HÄMTA RECEPT, BILD OCH VIDEO FRÅN API------------
function fullRecipe() {
  fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);

      //Hämta och skriv ut receptnamnet
      let recipeName = document.querySelector("#recipeName");
      recipeName.textContent = result.meals[0].strMeal;

      //Hämta receptnamnet till title-elementet
      let titleName = document.querySelector("#titleName");
      titleName.textContent = result.meals[0].strMeal;

      // ----------------SKAPA LI-ELEMENT MED MÅTT OCH INGREDIENSER------------
      //Hämta alla measure-nycklar och skapa en array att lägga dem i
      let measures = Object.keys(result.meals[0]).filter((key) =>
        key.startsWith("strMeasure")
      );
      console.log(measures);
      let measureList = [];

      //Hämta ut alla mått och lägg i arrayen measureList
      for (let i = 0; i < measures.length; i++) {
        if (
          result.meals[0][measures[i]] === null ||
          result.meals[0][measures[i]] === undefined ||
          result.meals[0][measures[i]].trim() === ""
        ) {
          //Ignorera null, undefined och tomma värden
        } else {
          // console.log(result.meals[0][measures[i]]);
          measureList.push(result.meals[0][measures[i]]);
        }
      }

      //Hämta alla ingredient-nycklar och skapa en array att lägga dem i
      let ingredients = Object.keys(result.meals[0]).filter((key) =>
        key.startsWith("strIngredient")
      );
      console.log(ingredients);
      let ingredientList = [];

      //Hämta ut alla ingredienser och lägg i arrayen ingredientList
      for (let i = 0; i < ingredients.length; i++) {
        if (
          result.meals[0][ingredients[i]] === null ||
          result.meals[0][ingredients[i]] === undefined ||
          result.meals[0][ingredients[i]].trim() === ""
        ) {
          //Ignorera null, undefined och tomma värden
        } else {
          // console.log(result.meals[0][ingredients[i]]);
          ingredientList.push(result.meals[0][ingredients[i]]);
        }
      }

      //Skapa en array för sammanslagning av measure och ingredient
      let combinedList = [];
      for (let i = 0; i < measureList.length; i++) {
        //Slår ihop measureList och IngredientList till ett gemensamt li-element
        let combinedItem = `<li>${measureList[i]} ${ingredientList[i]}</li>`;
        combinedList.push(combinedItem);
        // }
      }
      // Gör om till en sträng som kan användas i html-elementet
      let combinedItems = combinedList.join("");
      let fullList = document.querySelector("#fullList");
      fullList.innerHTML = combinedItems;

      // Hämta och visa receptets bild
      let recipeImg = document.querySelector("#recipeImg");
      recipeImg.setAttribute("src", result.meals[0].strMealThumb);

      //Hämta och visa receptets instruktion
      let instructions = document.querySelector("#instructions");
      instructions.textContent = result.meals[0].strInstructions;

      //Hämta och visa länk till youtube
      let youtubeLink = document.querySelector("#youtubeLink");
      youtubeLink.setAttribute("href", result.meals[0].strYoutube);
    });
}

fullRecipe();
