/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.


   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const pageDiv = document.querySelector('.page'); // stores the div with class value page into a variable
const ul = document.querySelector('.student-list'); //stores ul with student-list class
const studentList = ul.children; //stores student list items as array
const pages = Math.ceil(studentList.length/10); // divides index by page numbers and rounds up to fit values on the last page.

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const showPage = (studentList, page) => {
  let lastListItem = (page * 10) - 1;         //stores the last item's index value
  let firstListItem = (lastListItem - 9);     //stores the first item's index value
  for (var i = 0; i < studentList.length ; i += 1) {    //itterates through the student list
    if (i >= firstListItem && i <= lastListItem){   //conditional statement to iterate through list segments (note to self don't use studentList[i]) and hide or display list items
      studentList[i].style.display = '';
    }else{
      studentList[i].style.display = 'none'; //hides list items
    }
    }
};

/*
Loop over items in the list parameter
-- If the index of a list item is >= the index of the first
item that should be shown on the page
-- && the list item index is <= the index of the last item
that should be shown on the page, show it
*/




/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/


const appendPageLinks = (StudentList) => {
/*
1. Determine how many pages are needed for the list by dividing the
total number of list items by the max number of items per page
2. Create a div, give it the “pagination” class, and append it to the .page div
3. Add a ul to the “pagination” div to store the pagination links
4. for every page, add li and a tags with the page number text

5. Add an event listener to each a tag. When they are clicked
call the showPage function to display the appropriate page
6. Loop over pagination links to remove active class from all links
7. Add the active class to the link that was just clicked. You can identify that
clicked link using event.target
*/
const newDiv = document.createElement('div');  //creates new div
pageDiv.appendChild(newDiv);  //appends paginationDiv to div.page
newDiv.className += 'pagination';  // assigns class name pagination to div
const newUl = document.createElement('ul'); // creates ul for page links
newUl.className = 'pages';
newDiv.appendChild(newUl); // appends the page links to paginationDiv
const selectNewUl = document.querySelector('.pages')
const aTagList = document.querySelectorAll('a');

    for (var i = 1; i <= pages; i+= 1){
      const newLi = document.createElement('li');  //creates a list item in pageLinks
      newUl.appendChild(newLi);  //appends li to pagelinks
      const aTag = document.createElement('a');
      newLi.appendChild(aTag);
      aTag.setAttribute('href','#'); //sets attribute for href link
      aTag.textContent = i;   //changes page numbers per each itteration
    }
    selectNewUl.addEventListener('click', (e) => { //uses bubbling to target ancestor ul of a tags.
      if (event.target.tagName === 'A'){
        showPage(studentList, event.target.textContent); //calls function with aTag's text content, which is a corresponding page number;
        for (var i = 0; i <= aTagList.length; i += 1){
          aTagList[i].classList.remove('active');
        }
      event.target.className = 'active';
      }
      });
};

appendPageLinks(studentList);



// aTag.addEventListener('click', (e) => {
//   showPage(studentList, aTag.textContent); //calls function with aTag's text content, which is a corresponding page number;
//   const aTagList = document.querySelectorAll('a');
//     for (var i = 0; i <= aTagList.length; i++){
//       aTagList[i].classList.remove ('active');
//   }
//   event.target.className = 'active';
