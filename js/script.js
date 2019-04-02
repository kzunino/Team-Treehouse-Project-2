/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variables

const pageDiv = document.querySelector('.page');             // stores the div with class value page into a variable
const ul = document.querySelector('.student-list');         //stores ul with student-list class
const pageHeader = document.querySelector('.page-header'); //selects page header div *Note: leave off whitespace and cf from class tag.
let studentList = ul.querySelectorAll('li.student-item');
const pages = Math.ceil(studentList.length/10);           // divides index by page numbers and rounds up to fit values on the last page.
let resultList = [];
let searchCount = '';                                    //emptry searchCount Variable


const createElement = (elementName, setClass, domNode, property) => {  //refactored code for DRY
  const element = document.createElement(elementName);      //creates new DOM elements
  element.className += setClass;                            //gives dom elements new class names
  domNode.appendChild(element);                             // appends new elemement to DOM
  element.type = property;
  return element;
};


// New hidden div for the not found message

const notFoundDiv = createElement('div', 'notFound', pageHeader, undefined);
const notFoundText = createElement('h1', undefined, notFoundDiv, undefined);
notFoundText.textContent = "No students with that name. Please try again.";
notFoundDiv.style.display = 'none';

// Extra credit search bar (global variables)

const searchDiv = createElement('div', 'student-search', pageHeader, undefined);
const searchInput = createElement('input', undefined, searchDiv, 'text');
searchInput.placeholder = 'Search for students';
searchInput.type = 'text';
const button = createElement('button', undefined, searchDiv, 'search');
button.textContent = 'Search';
button.type = 'search';


const showPage = (studentList, page) => {
  let lastListItem = (page * 10) - 1;                    //stores the last item's index value
  let firstListItem = (lastListItem - 9);               //stores the first item's index value
  for (var i = 0; i < studentList.length ; i += 1) {   //itterates through the student list
    if (i >= firstListItem && i <= lastListItem){      //conditional statement to iterate through list segments (note to self don't use studentList[i]) and hide or display list items
      studentList[i].style.display = '';
    }else{
      studentList[i].style.display = 'none'; //hides list items
    }
  }
};
showPage(studentList, 1); //shows first page of student list when page is first opened


const appendPageLinks = (pages, studentList) => {
  if (document.contains(document.querySelector('.pagination'))) { // if statement checks to see if newDiv exists and deletes it.
    document.querySelector('.pagination').remove();               // this stops duplicate paginations links. Source: https://stackoverflow.com/questions/21591235/jscript-check-if-element-exists-and-remove-it
  };

  // const createElement = (elementName, setClass, domNode) => { //refactored code for DRY
  //   const element = document.createElement(elementName);      //creates new DOM elements
  //   element.className += setClass;                            //gives dom elements new class names
  //   domNode.appendChild(element);                             // appends new elemement to DOM
  //   return element;
  // };

  const newDiv = createElement('div', 'pagination', pageDiv, undefined);  //calls function to create newDiv, class, and appends it.
  const newUl = createElement('ul', 'pages', newDiv, undefined);

  const selectNewUl = document.querySelector('.pages')

      for (var i = 1; i <= pages; i+= 1){
        const newLi = createElement('li', undefined, newUl, undefined);   //creates a list item in pageLinks and appends to newUL. (undefined skips middle parameter source:https://stackoverflow.com/questions/8356227/skipping-optional-function-parameters-in-javascript)
        const aTag = createElement('a', undefined, newLi, undefined);    // creates a tags and appends to newLI
        aTag.setAttribute('href','#');                        //sets attribute for href link
        aTag.textContent = i;                                 //changes page numbers per each itteration
      }
  const aTagList = document.querySelectorAll('a');
  selectNewUl.addEventListener('click', (e) => {    //uses bubbling to target ancestor ul of a tags.
    if (event.target.tagName === 'A'){
      showPage(studentList, event.target.textContent); //calls function with aTag's text content, which is a corresponding page number;
      for (var i = 0; i < aTagList.length; i += 1){
        aTagList[i].classList.remove('active');       //removes active class from item
      }
    event.target.className = 'active';                //activates CSS for clicked page link
      }
    });
    if (document.contains(document.querySelector('a'))) { // if statement checks to see if a tag exists.
      aTagList[0].className = 'active';                 //adds active class to first as default, if exists. Wont throw error with conditional, if no a tags exist when no search results exist.
    }
};

appendPageLinks(pages, studentList);


// ****** EXTRA CREDIT *********


searchInput.addEventListener('keyup', (e) => {
  const searchText = searchInput.value.toUpperCase();   //stores text value from input field
  resultList = [];                                    // stores results in empty array
  searchCount = 0;                                  //counts results from loop
    for (var i = 0; i < studentList.length; i ++){                      // loop through student list
        studentList[i].style.display = 'none';
        let studentName = studentList[i].getElementsByTagName('h3')[0];             // should target each list item and their h3 tag with name
        if (studentName.textContent.toUpperCase().indexOf(searchText) > -1){     // tests input against index value of names
            searchCount ++;                                                   //for every match it adds to search count variable
            resultList.push(studentList[i]);
          }
        }
  if (searchCount === 0){   //if the search count is === to 0 then notFoundDiv appears.
    notFoundDiv.style.display = '';
  }else{
    notFoundDiv.style.display = 'none';  //if it's not === 0 then it dissappears.
  }
  const resultPages = Math.ceil(resultList.length/10); // changes page numbers based on results.
  showPage(resultList, resultPages);        //inserts resultList collection as an array and resultPage as arguments
  appendPageLinks(resultPages, resultList); //calls appendPageLinks function with new arguments.
  showPage(resultList, 1);                  //recall makes it so it shows page one of new results list.

  if (searchText.length === 0){ // if search goes back to blank recalls showPage fucntion to reset original pagination.
    showPage(studentList, 1);
  }
});


button.addEventListener('click', (e) =>{
  if (e.target.tagName === 'BUTTON') {
      const searchText = searchInput.value.toUpperCase();
      resultList = [];                                    // stores results in empty array
      searchCount = 0;                                  //counts results from loop
        for (var i = 0; i < studentList.length; i ++){                      // loop through student list
            studentList[i].style.display = 'none';
            let studentName = studentList[i].getElementsByTagName('h3')[0];             // should target each list item and their h3 tag with name
            if (studentName.textContent.toUpperCase().indexOf(searchText) > -1){     // tests input against index value of names
                searchCount ++;                                                   //for every match it adds to search count variable
                resultList.push(studentList[i]);
              }
            }
      if (searchCount === 0){   //if the search count is === to 0 then notFoundDiv appears.
        notFoundDiv.style.display = '';
      }else{
        notFoundDiv.style.display = 'none';  //if it's not === 0 then it dissappears.
      }
      const resultPages = Math.ceil(resultList.length/10); // changes page numbers based on results.
      showPage(resultList, resultPages);        //inserts resultList collection as an array and resultPage as arguments
      appendPageLinks(resultPages, resultList); //calls appendPageLinks function with new arguments.
      showPage(resultList, 1);                  //recall makes it so it shows page one of new results list.

      if (searchText.length === 0){ // if search goes back to blank recalls showPage fucntion to reset original pagination.
        showPage(studentList, 1);
      }
    }
    });
