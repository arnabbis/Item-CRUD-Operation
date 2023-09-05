# Item-CRUD-Operation
Running the Express.js App
Setup: Before running the app, make sure you have Node.js installed on your machine.

Install Dependencies: In your project directory, open a terminal and run the following command to install the necessary dependencies (if you haven't already):

# npm install
Configuration: If you need to configure any environment variables or settings (e.g., port number), ensure they are set correctly. You can often set these in a .env file or directly in your code.

Starting the Server: To start the Express.js server, run the following command:

# npm start
This will launch your application, and if everything is set up correctly, you should see a message in the terminal indicating that the server is running on a specific port (e.g., "Server is running on port 3000").

# Overview of the APIs
Your Express.js application appears to provide several API endpoints for performing CRUD (Create, Read, Update, Delete) operations on items. Let's briefly discuss each of these APIs:

# Create Item API (POST /items/createItem):

This API allows you to create a new item by sending a POST request with item data (e.g., name, category, price) in the request body.
It performs validation on the incoming data to ensure required fields are present and correctly formatted.
If successful, it responds with a status code of 201 (Created) and a JSON response indicating that the data was created successfully.

# Get Items API (GET /items/getItem):

This API allows you to retrieve a list of items.
It supports filtering, sorting, and pagination by using query parameters (e.g., name, category, price, sort, page, limit).
It reads item data from a JSON file and applies the specified filters, sorting, and pagination logic.
The response includes the paginated, filtered, and sorted list of items.

# Get Item by ID API (GET /items/getItemBy/:id):

This API allows you to retrieve a specific item by its unique ID.
It expects the ID as a URL parameter (e.g., /items/123).
If the item exists, it responds with a JSON response containing the item details.
If the item does not exist, it responds with a 404 (Not Found) status.

# Update Item by ID API (PUT /items/updateItem/:id):

This API allows you to update an existing item by its ID.
It expects the ID as a URL parameter and the updated item data in the request body.
It performs validation on the incoming data and updates the item if it exists.
If successful, it responds with a JSON response indicating that the item was updated successfully.

# Delete Item by ID API (DELETE /items/deleteItem/:id):

This API allows you to delete an item by its ID.
It expects the ID as a URL parameter.
If the item exists, it removes it from the list of items.
It responds with a JSON response indicating that the item was deleted successfully.
These APIs provide basic CRUD functionality for managing items, as well as additional features like filtering, sorting, and pagination to help users retrieve and manipulate data effectively.

Remember to test each of these APIs using tools like Postman or by writing unit tests to ensure they work as expected and handle various scenarios gracefully.
