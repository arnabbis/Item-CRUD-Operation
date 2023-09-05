const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid"); 

//  Create Items
const createItem = async (req, res) => {
  try {
    const newItem = req.body;
    console.log("result from body", newItem);
    const { name, category, price } = newItem; 

    const filePath = "data/items.json";

    const data = await fs.readFile(filePath, "utf-8");
    const items = JSON.parse(data);

    if (Object.keys(newItem).length === 0) {
      return res
        .status(400)
        .send({ msg: "Please provide some data in the body" });
    }
    if (!name) {
      return res.status(400).json({ msg: "Missing required field: item name" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ msg: "Missing required field: item category" });
    }
    if (!price) {
      return res
        .status(400)
        .json({ msg: "Missing required field: item price" });
    }
    if (name.trim() === "") {
      return res.status(400).json({ msg: "Item name field cannot be empty" });
    }
    if (typeof category !== "string") {
      return res.status(400).json({ msg: "Item price must be a string" });
    }
    if (category.trim() === "") {
      return res
        .status(400)
        .json({ msg: "Item category field cannot be empty" });
    }
    if (typeof price !== "string") {
      return res.status(400).json({ msg: "Item price must be a string" });
    }
    if (price.trim() === "") {
      return res.status(400).json({ msg: "Item price field cannot be empty" });
    }

    const newId = uuidv4();

    const newItemWithId = { Id: newId, name, category, price };
    items.push(newItemWithId);

    await fs.writeFile(filePath, JSON.stringify(items, null, 2));

    return res
      .status(201)
      .send({ msg: "Data created successfully", newItem: newItemWithId });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while creating the item",
        details: error.message,
      });
  }
};

// Read the Item According to Sorting , Pagination , Filtering
const getItemsByQuery = async (req, res) => {
    try {
      const filePath = 'data/items.json';
  
      const data = await fs.readFile(filePath, 'utf-8');
      const items = JSON.parse(data);
  
      const { page, limit, name, category,price, sort } = req.query;
  
      const validatedPage = parseInt(page, 10) || 1; 
      const validatedLimit = parseInt(limit, 10) || 10; 
      // Implement pagination
      const startIndex = (validatedPage - 1) * validatedLimit;
      const endIndex = startIndex + validatedLimit;
      const paginatedItems = items.slice(startIndex, endIndex);
  
      // Implement filtering
      const filteredItems = paginatedItems.filter((item) => {
        if (name && !item.name.toLowerCase().includes(name.toLowerCase())) {
          return false; 
        }
        if (category && !item.category.toLowerCase().includes(category.toLowerCase())) {
          return false; 
        }
        if (price && !item.price.toLowerCase().includes(price.toLowerCase())) {
            return false; 
          }
        return true; 
      });
  
      // Implement sorting
      if (sort === 'asc') {
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'desc') {
        filteredItems.sort((a, b) => b.name.localeCompare(a.name));
      }
  
      // Respond with the paginated, filtered, and sorted items
      return res.status(200).send({msg:'data found',filteredItems});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching items', details: error.message });
    }
  };
  
// Read the Item with its Id
const getItems = async (req, res) => {
  try {
    const itemId = req.params.id; 
    const filePath = "data/items.json";

    if (!itemId) {
      return res.status(400).json({ error: "Missing ID parameter" });
    }

    const data = await fs.readFile(filePath, "utf-8");
    const items = JSON.parse(data);

    const item = items.find((item) => item.Id === itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Return the item
    return res.status(200).send({ msg: "data found", item });
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching the item",
        details: error.message,
      });
  }
};

// // Update an item by ID
const updateItem = async (req, res) => {
    try {
      const itemId = req.params.id;
      const updatedItem = req.body;
      const filePath = 'data/items.json';
  
      const data = await fs.readFile(filePath, 'utf-8');
      const items = JSON.parse(data);
  
      if (!itemId) {
        return res.status(400).json({ error: "Missing ID parameter" });
      }
  
      const itemIndex = items.findIndex((item) => item.Id === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      const validationErrors = [];
  
      if (Object.keys(updatedItem).length === 0) {
        return res.status(400).json({ error: "Please provide some data in the body" });
      }
  
      if (updatedItem.hasOwnProperty('name')) {
        if (typeof updatedItem.name !== 'string' || updatedItem.name.trim() === '') {
          validationErrors.push("Item name must be a non-empty string");
        }
      }
  
      if (updatedItem.hasOwnProperty('category')) {
        if (typeof updatedItem.category !== 'string' || updatedItem.category.trim() === '') {
          validationErrors.push("Item category must be a non-empty string");
        }
      }
  
      if (updatedItem.hasOwnProperty('price')) {
        if (typeof updatedItem.price !== 'string' || updatedItem.price.trim() === '') {
          validationErrors.push("Item price must be a non-empty string");
        }
      }
  
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
  
      items[itemIndex] = { ...items[itemIndex], ...updatedItem };
  
      await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  
      // Return the updated item
      return res.status(200).send({ msg: "Item updated successfully", updatedItem: items[itemIndex] });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the item', details: error.message });
    }
  };
  

// // Delete an item by ID
const deleteItem = async (req, res) => {
    try {
      const itemId = req.params.id; 
      const filePath = 'data/items.json';
  
      const data = await fs.readFile(filePath, 'utf-8');
      const items = JSON.parse(data);
  
      if (!itemId) {
        return res.status(400).json({ error: "Missing ID parameter" });
      }
  
      const itemIndex = items.findIndex((item) => item.Id === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      items.splice(itemIndex, 1);
  
      await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  
      // Respond the deleted result
      return res.status(200).send({msg:'data deleted successfully',itemIndex});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the item', details: error.message });
    }
  };
  

module.exports.createItem = createItem;
module.exports.getItems = getItems;
module.exports.updateItem = updateItem;
module.exports.deleteItem = deleteItem;
module.exports.getItemsByQuery = getItemsByQuery;
