/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variables

const pageDiv = document.querySelector('.page'); // stores the div with class value page into a variable
const ul = document.querySelector('.student-list'); //stores ul with student-list class
let studentList = ul.querySelectorAll('li.student-item');
const pages = Math.ceil(studentList.length/10); // divides index by page numbers and rounds up to fit values on the last page.

// New hidden div for the not found message

const notFoundLi = document.createElement('li');
ul.appendChild(notFoundLi);
const notFoundDiv = document.createElement('div');
notFoundLi.appendChild(notFoundDiv);
const notFoundText = document.createElement('h3');
notFoundDiv.appendChild(notFoundText);
notFoundText.textContent = "No students with that name. Please try again";
notFoundLi.style.display = 'none';

// Extra credit search bar (global variables)

const pageHeader = document.querySelector('.page-header'); //selects page header div *Note: leave off whitespace and cf from class tag.
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


searchInput.addEventListener('keyup', (e) => {
  const searchText = searchInput.value.toUpperCase();                    //stores text value from input field
    for (var i = 0; i < studentList.length; i ++){                      // loop through student list
        let studentName = studentList[i].getElementsByTagName('h3')[0];             // should target each list item and their h3 tag with name
        if (studentName.textContent.toUpperCase().indexOf(searchText) > -1){     // tests input against index value of names
            studentList[i].style.display = '';
        }else if (studentName.textContent.toUpperCase().indexOf(searchText) < studentList.length){  //if name doesn't match, list index value is -1
            studentList[i].style.display = 'none';
        }else if (searchText !== studentName.textContent.toUpperCase()) {
            notFoundLi.style.display = '';
}
}
});

button.addEventListener('click', (e) =>{
  e.preventDefault();                                          //stops page from refreshing
  if (e.target.tagName === 'BUTTON') {
      const searchText = searchInput.value.toUpperCase();
      searchInput.value = '';                                             //clears input field after click
      for (var i = 0; i < studentList.length; i ++){                      // loop through student list
          let studentName = studentList[i].getElementsByTagName('h3')[0];             // should target each list item and their h3 tag with name
          if (studentName.textContent.toUpperCase().indexOf(searchText) > -1){     // tests input against index of names
              studentList[i].style.display = '';
          }else if (studentName.textContent.toUpperCase().indexOf(searchText) < studentList.length){  //if name doesn't match, list index value is -1
              studentList[i].style.display = 'none';

}
  }
}
});

//append studentList[i] that matches search.

// <li class="student-item cf">
//     <div class="student-details">
//         <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/67.jpg">
//         <h3>iboya vat</h3>
//         <span class="email">iboya.vat@example.com</span>
//     </div>
//     <div class="joined-details">
//            <span class="date">Joined 07/15/15</span>
//    </div>

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

const appendPageLinks = (StudentList) => {

  // const restartFunction = document.removeElement(newDiv);
  // restartFunction;   //in theory everytime this is called it will refresh div and pagination.

  const newDiv = document.createElement('div');  //creates new div
  pageDiv.appendChild(newDiv);  //appends paginationDiv to div.page
  newDiv.className += 'pagination';  // assigns class name pagination to div
  const newUl = document.createElement('ul'); // creates ul for page links
  newUl.className = 'pages';
  newDiv.appendChild(newUl); // appends the page links to paginationDiv
  const selectNewUl = document.querySelector('.pages')

      for (var i = 1; i <= pages; i+= 1){
        const newLi = document.createElement('li');  //creates a list item in pageLinks
        newUl.appendChild(newLi);  //appends li to pagelinks
        const aTag = document.createElement('a');
        newLi.appendChild(aTag);
        aTag.setAttribute('href','#'); //sets attribute for href link
        aTag.textContent = i;   //changes page numbers per each itteration
      }
      selectNewUl.addEventListener('click', (e) => {    //uses bubbling to target ancestor ul of a tags.
        const aTagList = document.querySelectorAll('a');
        if (event.target.tagName === 'A'){
          showPage(studentList, event.target.textContent); //calls function with aTag's text content, which is a corresponding page number;
          for (var i = 0; i < aTagList.length; i += 1){
            aTagList[i].classList.remove('active');
          }
        event.target.className = 'active';
        }
        });
};

appendPageLinks(studentList);
