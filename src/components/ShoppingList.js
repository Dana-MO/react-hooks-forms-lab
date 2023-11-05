import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userInput, setUserInput] = useState("");
  const [shopList, setShopList] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setUserInput(event.target.value);
  }

  function handleFormSubmit(newItem) {
    const newList = [...items, newItem];
    setShopList(newList);
  }

  const itemsToDisplay = shopList.filter((item) => {
    if (selectedCategory === "All" && userInput === "") {
      return true;
    } else if (item.category === selectedCategory && userInput === "") {
      return item;
    } else if (selectedCategory === "All" && item.name.toLowerCase().includes(userInput.toLowerCase())) {
      return item;
    }
  });
  
  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
