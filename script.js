async function searchRecipe() {
    const query = document.getElementById("searchInput").value;
    const container = document.getElementById("recipesContainer");
    container.innerHTML = "Loading...";
  
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
  
      if (!data.meals) {
        container.innerHTML = "No recipes found.";
        return;
      }
  
      container.innerHTML = "";
      data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "recipe-card";
  
        card.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
          <a href="${meal.strSource || '#'}" target="_blank">View Full Recipe</a>
        `;
  
        container.appendChild(card);
      });
    } catch (error) {
      container.innerHTML = "Error fetching data.";
      console.error(error);
    }
  }
  