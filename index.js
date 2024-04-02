let searchBar = document.querySelector("#searchBar");
let checkVegetarian = document.querySelector("#checkVegetarian");
let checkVegan = document.querySelector("#checkVegan");
let checkSeafood = document.querySelector("#checkSeafood");
let checkMeat = document.querySelector("#checkMeat");
let checkBreakfast = document.querySelector("#checkBreakfast");
let checkDessert = document.querySelector("#checkDessert");
let checkIngredient = document.querySelector("#checkIngredient");
let noResult = document.querySelector("#noResult");
let blankPageImg = document.querySelector("#blankPageImg");

// Funktion för att rensa sökfält och sökresultat
function hideAll() {
  searchBar.value = "";
  searchBar.style.display = "none"; //Döljer sökfältet för ingrediens från start
  checkVegetarian.checked = false;
  checkVegan.checked = false;
  checkSeafood.checked = false;
  checkMeat.checked = false;
  checkBreakfast.checked = false;
  checkDessert.checked = false;
  checkIngredient.checked = false;
  noResult.style.display = "none"; //Döljer felmeddelande vid start
  blankPageImg.style.display = "block"; //Visar bild
}

//Sätter sökresultatsfält samt sökfält tomt från början
hideAll();

//Visa/Dölj searchBar
//(Bör gå att skriva snyggare utan upprepning men får bli fortsatt arbete)
checkIngredient.addEventListener("change", () => {
  if (checkIngredient.checked) {
    searchBar.style.display = "block";
  } else if (checkVegetarian.checked) {
    searchBar.style.display = "none";
  }
});
checkVegetarian.addEventListener("change", () => {
  if (checkVegetarian.checked) {
    searchBar.style.display = "none";
  }
});
checkVegan.addEventListener("change", () => {
  if (checkVegan.checked) {
    searchBar.style.display = "none";
  }
});
checkSeafood.addEventListener("change", () => {
  if (checkSeafood.checked) {
    searchBar.style.display = "none";
  }
});
checkMeat.addEventListener("change", () => {
  if (checkMeat.checked) {
    searchBar.style.display = "none";
  }
});
checkBreakfast.addEventListener("change", () => {
  if (checkBreakfast.checked) {
    searchBar.style.display = "none";
  }
});
checkDessert.addEventListener("change", () => {
  if (checkDessert.checked) {
    searchBar.style.display = "none";
  }
});

// -------------------------HÄMTA VÄRDEN OCH GÖR SÖKNING-----------------------
//Hämtar värde från sökfält
searchBar.addEventListener("input", () => {});

//Kör sökfunktion med tangentbordstryck "Enter"
searchBar.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    showRecipe();
  }
});

//Kör sökfunktion med knappen "Search"
document.querySelector("#searchButton").addEventListener("click", () => {
  showRecipe();
});

//Kör sökfunktion med knappen "Give me five!" som slumpar fram 5 random recept.
document.querySelector("#surpriseButton").addEventListener("click", () => {
  hideAll();
  searchBar.style.display = "none"; //Döljer sökfältet för ingrediens
  // Loopa igenom funktionen 5 gånger för att få fem sökresultat
  for (let i = 0; i < 5; i++) {
    surprise();
  }
});

//Återställ sökning
document.querySelector("#resetButton").addEventListener("click", () => {
  //Töm sökformulär
  hideAll();
  //Töm fält för sökresultat
  document.querySelector("#searchResult").innerHTML = "";
});

//----------------------FUNKTION FÖR SÖKA OCH VISA RECEPT----------------------
//-----------------FÖR KATEGORIER (EJ "MEAT") OCH INGREDIENS-----------------
function showRecipe() {
  //TÖM LISTAN MED SÖKRESULTAT
  document.querySelector("#searchResult").innerHTML = "";
  blankPageImg.style.display = "none"; //Döljer bild

  //--------------------SKAPA RÄTT API-LÄNK FÖR ATT SÖKA-----------------------
  //   API för category:
  //   www.themealdb.com/api/json/v1/1/list.php?c= + "vald kategori"
  //   API för ingredient:
  //   www.themealdb.com/api/json/v1/1/list.php?i= + "sökord"

  let apiLink = "https://www.themealdb.com/api/json/v1/1/filter.php?";
  if (checkVegetarian.checked) {
    apiLink += "c=" + "Vegetarian";
    allButMeat();
  } else if (checkVegan.checked) {
    apiLink += "c=" + "Vegan";
    allButMeat();
  } else if (checkSeafood.checked) {
    apiLink += "c=" + "Seafood";
    allButMeat();
  } else if (checkVegan.checked) {
    apiLink += "c=" + "Vegan";
    allButMeat();
  } else if (checkBreakfast.checked) {
    apiLink += "c=" + "Breakfast";
    allButMeat();
  } else if (checkDessert.checked) {
    apiLink += "c=" + "Dessert";
    allButMeat();
  } else if (searchBar.value !== "") {
    apiLink += "i=" + searchBar.value;
    allButMeat();
  } else if (checkMeat.checked) {
    meat();
  } else {
    // Om inget val har gjorts visas en alert
    console.log("You must choose one of the categorys to search.");
    let mustChoose = document.querySelector("#searchResult");
    mustChoose.innerHTML = `
    <p>You must choose one of the categorys above.</p>`;
    noResult.style.display = "block";
  }

  // --------------------------------KÖR FETCH---------------------------------
  // Med länken som skapades ovan hämtas info från APIet
  function allButMeat() {
    fetch(apiLink)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);

        //Om värdet i sökningen gav resultat, loopar genom sökresultatet
        if (result.meals) {
          noResult.style.display = "none";

          for (let n = 0; n < result.meals.length; n++) {
            let recipe = document.querySelector("#searchResult");
            //Skapar divar till sökresultatet
            recipe.innerHTML += `
          <div id="${result.meals[n].idMeal}" class="resultBox">
              <a class="link" href="fullrecipe.html?id=${result.meals[n].idMeal}"
              target="_blank">
              <p id="nameInResult">${result.meals[n].strMeal} </p>
              <img alt="food" src=${result.meals[n].strMealThumb} id="resultBoxImg">
              </a>
          </div>
        `;
          }
        } else {
          // Om det inte finns några recept visa noResult
          console.log("There are no meals to show");
          noResult.style.display = "block";
        }
      });
  }
}

//----------------------FUNKTION FÖR SÖKA OCH VISA RECEPT----------------------
//----------------------------FÖR KATEGORI "MEAT"----------------------------

function meat() {
  // Skapat array med categorys av kött.
  let meatList = ["Beef", "Chicken", "Goat", "Lamb", "Pork"];
  // Loopa igenom array och sätt varje kött-kategori i apiUrl
  for (let n = 0; n < meatList.length; n++) {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meatList[n])
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);

        //Om värdet i sökningen gav resultat, loopar genom sökresultatet
        if (result.meals) {
          noResult.style.display = "none";

          for (let n = 0; n < result.meals.length; n++) {
            let recipe = document.querySelector("#searchResult");
            //Skapar divar till sökresultatet
            recipe.innerHTML += `
        <div id="${result.meals[n].idMeal}" class="resultBox">
            <a class="link" href="fullrecipe.html?id=${result.meals[n].idMeal}"
            target="_blank">
            <p id="nameInResult">${result.meals[n].strMeal} </p>
            <img alt="food" src=${result.meals[n].strMealThumb} id="resultBoxImg">
            </a>
        </div>
      `;
          }
        } else {
          // Om det inte finns några recept visa noResult
          console.log("There are no meals to show");
          noResult.style.display = "block";
        }
      });
  }
}

//---------------FUNKTION FÖR SÖKA OCH VISA ETT RANDOM RECEPT-------------------
function surprise() {
  //TÖM LISTAN MED SÖKRESULTAT
  document.querySelector("#searchResult").innerHTML = "";
  blankPageImg.style.display = "none"; //Döljer bild

  // --------------------------------KÖR FETCH---------------------------------
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);

      //Om värdet i sökningen gav resultat, loopar genom sökresultatet
      if (result.meals) {
        noResult.style.display = "none";

        for (let n = 0; n < result.meals.length; n++) {
          let recipe = document.querySelector("#searchResult");
          //Skapar divar till sökresultatet
          recipe.innerHTML += `
          <div id="${result.meals[n].idMeal}" class="resultBox">
              <a class="link" href="fullrecipe.html?id=${result.meals[n].idMeal}"
              target="_blank">
              <p id="nameInResult">${result.meals[n].strMeal} </p>
              <img alt="food" src=${result.meals[n].strMealThumb} id="resultBoxImg">
              </a>
          </div>
        `;
        }
      } else {
        // Om det inte finns några recept visa noResult
        console.log("There are no meals to show");
        noResult.style.display = "block";
      }
    });
}
