/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const pageDiv = document.querySelector('.page'); // stores the div with class value page into a variable
const ul = document.querySelector('.student-list'); //stores ul with student-list class
const studentList = ul.children; //stores student list items as array
const pages = Math.ceil(studentList.length/10); // divides index by page numbers and rounds up to fit values on the last page.


const pageHeader = document.querySelector('.page-header'); //selects page header div *Note: leave off whitespace and cf from class tag.
const searchDiv = document.createElement('div');
searchDiv.className = 'search-student';
pageHeader.appendChild(searchDiv);
const input = document.createElement('input');
input.placeholder = 'Search for students';
searchDiv.appendChild(input);
const button = document.createElement('button');
button.textContent = 'Search';
searchDiv.appendChild(button);


input.addEventListener('submit', (e) =>{
  e.preventDefault ();             //stops page from refreshing
  const text = input.value;        //stores text value from input field
  input.value = '';                //clears the text from field
  if (text === ' '){
      for (var i = 0; i < studentList.length; i ++)
      studentlist[i].style.display = 'none';

  }
});

button.addEventListener('click', (e) =>{
  if (e.target === 'BUTTON') {

  }

});



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
showPage(studentList, 1);

const appendPageLinks = (StudentList) => {

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
      selectNewUl.addEventListener('click', (e) => { //uses bubbling to target ancestor ul of a tags.
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
