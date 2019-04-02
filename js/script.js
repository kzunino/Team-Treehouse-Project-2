/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variables

const pageDiv = document.querySelector('.page'); // stores the div with class value page into a variable
const ul = document.querySelector('.student-list'); //stores ul with student-list class
const pageHeader = document.querySelector('.page-header'); //selects page header div *Note: leave off whitespace and cf from class tag.
let studentList = ul.querySelectorAll('li.student-item');
const pages = Math.ceil(studentList.length/10); // divides index by page numbers and rounds up to fit values on the last page.
let resultList = [];
let searchCount = '';                                  //emptry searchCount Variable



// New hidden div for the not found message

const notFoundDiv = document.createElement('div');
notFoundDiv.className = 'notFound';
pageHeader.appendChild(notFoundDiv);
const notFoundText = document.createElement('h1');
notFoundDiv.appendChild(notFoundText);
notFoundText.textContent = "No students with that name. Please try again.";
notFoundDiv.style.display = 'none';

// Extra credit search bar (global variables)

const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
pageHeader.appendChild(searchDiv);
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for students';
searchInput.type = 'text';
searchDiv.appendChild(searchInput);
const button = document.createElement('button');
button.textContent = 'Search';
button.type = 'search';
searchDiv.appendChild(button);


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
showPage(studentList, 1); //shows first page of student list when page is first opened


const appendPageLinks = (pages, studentList) => {
  if (document.contains(document.querySelector('.pagination'))) { // if statement checks to see if newDiv exists and deletes it.
    document.querySelector('.pagination').remove();               // this stops duplicate paginations links. Source: https://stackoverflow.com/questions/21591235/jscript-check-if-element-exists-and-remove-it
  };

  const createElement = (elementName, setClass, domNode) => {
    const element = document.createElement(elementName);
    element.className += setClass;
    domNode.appendChild(element);
    return element;

  };

  const newDiv = createElement('div', 'pagination', pageDiv);  //creates new div
  // pageDiv.appendChild(newDiv);  //appends paginationDiv to div.page
  // newDiv.className += 'pagination';  // assigns class name pagination to div
  const newUl = createElement('ul', 'pages', newDiv); // creates ul for page links
  // newUl.className = 'pages';
  // newDiv.appendChild(newUl); // appends the page links to paginationDiv


  // const newDiv = document.createElement('div');  //creates new div
  // pageDiv.appendChild(newDiv);  //appends paginationDiv to div.page
  // newDiv.className += 'pagination';  // assigns class name pagination to div
  // const newUl = document.createElement('ul'); // creates ul for page links
  // newUl.className = 'pages';
  // newDiv.appendChild(newUl); // appends the page links to paginationDiv

  const selectNewUl = document.querySelector('.pages')

      for (var i = 1; i <= pages; i+= 1){
        const newLi = document.createElement('li');  //creates a list item in pageLinks
        newUl.appendChild(newLi);  //appends li to pagelinks
        const aTag = document.createElement('a');
        newLi.appendChild(aTag);
        aTag.setAttribute('href','#'); //sets attribute for href link
        aTag.textContent = i;   //changes page numbers per each itteration
      }
  const aTagList = document.querySelectorAll('a');
  // aTagList[0].className = 'active';                 //adds active class to first as default
  selectNewUl.addEventListener('click', (e) => {    //uses bubbling to target ancestor ul of a tags.
    if (event.target.tagName === 'A'){
      showPage(studentList, event.target.textContent); //calls function with aTag's text content, which is a corresponding page number;
      for (var i = 0; i < aTagList.length; i += 1){
        aTagList[i].classList.remove('active');
      }
    event.target.className = 'active';
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
