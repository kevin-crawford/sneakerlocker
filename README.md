// -- TO DO---
// edit user endpoint needs to rehash password if password is changed
// ADD SHOE TO LOCKER
-- .POST '/inventory/addShoe' jwtAuth 
// EDIT SHOE IN LOCKER
-- .PATCH '/inventory/editShoe/:id' jwtAuth
// DELETE SHOE IN LOCKER
-- .DELETE '/inventory/deleteShoe/:id' jwt auth