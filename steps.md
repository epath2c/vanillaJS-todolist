---
TocOpen: true
---

[questions](#questions)

1. Select all the needed elements (including get some pseudo ID)
2. Start working on submitting form:(this eventListener callback function is written somewhere else, like, all the functions are written together so that we can manage the code more clearly.)
   1. Three conditions:
      1. What if we have value and the action is not edit
      2. What if we have value and the action is edit
      3. What if we don't provide any value? In this case, we submit an empty string.
   2. Firstly, the third conditon, because it is kinda simple. Just add an alert.
      1. The alert should be reusable. So we need an extra function for the alert.
      2. Don't forget to remove the alert.
   3. Secondly, tackle the add item part.
      1. Create element that can hold the value.
      2. Add attribute of data-id to this added item.
      3. **REMEMBER render the item dynamically!**
   4. Add the added item to local storage
      1. At least we need to have one store to keep the added data.
      2. After we add the data, we want to have a function to set the form to be default. For example, we want to set the placeholder to empty, etc.
3. Tackle the clear all button.
   1. Clear the local storage. (At this point, it didn't make much sense, because we havn't actually set up our local store.)
   2. Set back to default set.
4. Tackle the delete action.
   1. Note that the delete-one-item button is set dynamically in our JS, so we can't select the specific button through DOM selector. **There are two ways to do deletion and edit.**
      1. Or we can use element bubble to select the button's parent element, in this case, the grocery-list element, and check to see whether we chose the delete button or edit button.
      2. Or we actually have access to this dynamically rendered item when we return that HTML in our if(value && !editFlag) conditional condition. That's where we can call the delete and edit function. Because we only have access to those elements in that if condition.
         > Why? In my opinion, after we add an item, this item element exists, and we add event listener after the item element was created, we can have access to the button inside the just-created element.
   2. Some Notes:
      1. If there is nothing left, hide the container.
      2. Set the alert.
   3. Remove from the local store.(Havn't created our store yet.)
5. Tackle the edit.
   1. One trick: since you are editing the title, so choose the edit button's container's sibling element. In this case, is a paragraph with the item title.
   2. First step: get the origin data to the form
   3. handle the submit form.
6. Finally! The local data store! **(Just use localStorage :no_mouth:)**
   1. set up the setItem, every time we edit or add something, we can use setItem method repeatedly.
   2. Every time we add, delete, edit something, we need to retrieve all the stored data. The retrieved data need to be changed from JSON to an array or object. Then iterate the data, find the one that need to be deleted or updated. Delete or update it. Then finally return the modified todolist and turn it to JSON.

### QUESTIONS

1. Why use the complicate solution while writing the clearAll function?
2. When I wrote _const_ before editElement, I couldn't have access to _editElement_ in my onsubmit function. Does that mean _const_ can restrict this to lexiscope? :persevere:

   ```JS
   function editItem(e) {
   const item = e.currentTarget.parentElement.parentElement;
   const editElement = e.currentTarget.parentElement.previousElementSibling;


   console.log(editElement);
   input.value = editElement.innerHTML;
   ifEdit = true;
   editID = item.dataset.id;

   submitBtn.textContent = "edit";
   }
   ```
