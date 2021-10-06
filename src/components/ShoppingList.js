import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";


function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchContent, setSearch] = useState('')
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    category: 'Produce'
  })
  const [newItemsArray, setItems] = useState(items)

  console.log('newItem', newItem)
  console.log('newItemArray', newItemsArray)

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    // console.log(event.target.value)
    setSearch(event.target.value)
  }

  const itemsToDisplay = newItemsArray.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  let searchedItems = ''
  if (searchContent === '') {
    searchedItems = [...itemsToDisplay]
  }
  else if (searchContent !== '') {
    searchedItems = itemsToDisplay.filter((item) => {
      if (item.name.includes(searchContent) || item.name.toLowerCase().includes(searchContent)) {
        //console.log(item.name.toLowerCase())
        return item
      }
    })
  };
  //console.log(searchContent === '')
  //console.log(searchedItems)

  function handleSubmit(event) {
    event.preventDefault()
    console.log(event.target.name.value, event.target.category.value)
    setNewItem({
      id: uuid(),
      name: event.target.name.value,
      category: event.target.category.value
    })
    setItems([...newItemsArray, newItem])
  }

  //The previous item is added when I try to add a second item, but the current item first registers as blank. Why?

  return (
    <div className="ShoppingList">
      <ItemForm 
      onItemFormSubmit={handleSubmit}
      newItem={newItem}
      setNewItem={setNewItem}
      />
      <Filter 
      onCategoryChange={handleCategoryChange} 
      onSearchChange={handleSearchChange}
      search={searchContent}
      />
      <ul className="Items">
        {searchedItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
