import React, {useState} from "react";
import { v4 as uuid } from "uuid";

function ItemForm({onItemFormSubmit}) {
    
  const [itemName, setName] = useState('')
  const [itemCategory, setCategory] = useState('Produce')

  function updateName (e) {
    setName(e.target.value)
  }

  function updateCategory(e) {
    setCategory(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newItem = {
      id: uuid(),
      name: itemName,
      category: itemCategory
    }
    onItemFormSubmit(newItem)
    setName('')
  }

  return (
    <form 
    className="NewItem"
    onSubmit={handleSubmit}
    >
      <label>
        Name:
        <input 
        type="text" 
        name="name" 
        onChange={updateName}
        value={itemName}
        />
      </label>

      <label>
        Category:
        <select 
        name="category"
        onChange={updateCategory}
        value={itemCategory}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
