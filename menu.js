import { database, dishesRef, categoriesRef } from '../firebaseConfig.js';
import { ref, get, onValue } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';

const dishList = document.getElementById('dishList');
const filterCategory = document.getElementById('filterCategory');
const filterType = document.getElementById('filterType');
const sortPrice = document.getElementById('sortPrice');

let allDishes = {};
let categories = {};

function populateCategories(categoriesData) {
  filterCategory.innerHTML = '<option value="">All Categories</option>';
  Object.entries(categoriesData).forEach(([id, cat]) => {
    const name = cat.name || cat;
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name;
    filterCategory.appendChild(option);
  });
}

function renderDishes(dishes) {
  dishList.innerHTML = '';
  if (Object.keys(dishes).length === 0) {
    dishList.innerHTML = '<li>No matching dishes found.</li>';
    return;
  }

  dishes.forEach(dish => {
    const li = document.createElement('li');
    li.className = 'dish-card';

    li.innerHTML = `
      <div class="dish-image" style="background-image: url('${dish.imageLink || ''}');">
        <div class="dish-type">${dish.vegNonVeg === 'Veg' ? '🟢' : '🔴'}</div>
      </div>
      <div class="dish-info">
        <h3 class="dish-name">${dish.name}</h3>
        <p class="dish-category">Category: ${dish.categoryName || 'Unknown'}</p>
        <p class="dish-price">₹${dish.price}</p>
      </div>
    `;

    dishList.appendChild(li);
  });
}

function applyFilters() {
  const selectedCategory = filterCategory.value;
  const selectedType = filterType.value;
  const sortOrder = sortPrice.value;

  let filteredDishes = Object.values(allDishes);

  if (selectedCategory) filteredDishes = filteredDishes.filter(d => d.category === selectedCategory);
  if (selectedType) filteredDishes = filteredDishes.filter(d => d.vegNonVeg === selectedType);

  if (sortOrder === 'asc') filteredDishes.sort((a, b) => a.price - b.price);
  else if (sortOrder === 'desc') filteredDishes.sort((a, b) => b.price - a.price);

  renderDishes(filteredDishes);
}

// Load categories and dishes from Firebase, then render
async function loadData() {
  try {
    const categoriesSnapshot = await get(categoriesRef);
    categories = categoriesSnapshot.val() || {};
    populateCategories(categories);

    onValue(dishesRef, snapshot => {
      const dishesData = snapshot.val() || {};
      // Attach categoryName to each dish for display
      Object.values(dishesData).forEach(dish => {
        dish.categoryName = categories[dish.category]?.name || 'Unknown';
      });
      allDishes = dishesData;
      applyFilters();
    });
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

[filterCategory, filterType, sortPrice].forEach(el => el.addEventListener('change', applyFilters));

loadData();
