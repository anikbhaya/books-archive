// 1. Show Result after clicking search button
// 2. Responsive is optional
// 3. Need to show following book details
//     - Book Name (title)
//     - Author Name (Need validation if not available) (author_name)
//     - Publishers Name (publisher)
//     - First Publishes Data (Show only if available) (publish_date)
// 4. Books result need to be more that 1 in a row
// 5. Showing the quanity of the results that found
// 6. validation needed if not results found

// Bonus Part
// -----------
// 7. Need to use only arrow funtion rather than regular function
// 8. Need to use forEach() on array loop.
// 9. Must need to use Tripple Equal if comparison needed,
//     otherwise not.
// 10. Book image needed to be shown along with book details.

const resultSection = document.getElementById('results');
const spinner = document.getElementById('spinner');


const fetchResult = () => {
    
    const inputValue = document.getElementById('searchInput').value;
    resultSection.textContent= "";
    // Blank Input Validation
    if(inputValue === ""){;
        resultSection.innerHTML= `
            <p class="text-danger text-center">Please Type Something To Search</p>
        `;
    }
    else{
        // Fetch Data From Api
        fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
        .then(response => response.json())
        .then(data => getResult(data))
        spinner.classList.remove("d-none");
    }
    
}

const getResult = (data) =>{
    if(data.numFound === 0){
        spinner.classList.add("d-none");
        resultSection.innerHTML= `
            <p class="text-danger text-center">No Result Found!</p>
        `
    }
    else{
        spinner.classList.remove("d-none");
        const resultFound = data.docs;
        resultSection.innerHTML= `
            <p class="text-danger text-center">${resultFound.length} Results Found!</p>
        `;
        resultFound.forEach(book => showResult(book))
    }
    
}

const showResult = bookObj => {
    let bookTitle = bookObj.title;
    let authorName = bookObj.author_name;
    let publishYear = bookObj.publish_date;
    let publisher = bookObj.publisher;
    let thumbnail = `https://covers.openlibrary.org/b/id/${bookObj.cover_i}-M.jpg`;

    if(bookTitle === undefined){
        bookTitle = "No Title Available"
    }

    if(authorName === undefined){
        authorName = "No Author Name Available"
    }else if(authorName.length > 2){
        authorName = authorName.slice(0, 2);
    }

    if(publishYear === undefined){
        publishYear = "No Publish Date Available"
    }else if(publishYear.length > 1){
        publishYear = publishYear.slice(0, 1);
    }

    if(publisher === undefined){
        publisher = "No Publisher Data Available"
    }else if(publisher.length > 2){
        publisher = publisher.slice(0, 1);
    }


    if(bookObj.cover_i === undefined){
        thumbnail = `https://www.messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg`
    }

    const div = document.createElement("div");
    div.classList.add("col", "col-3", "p-4");
    div.innerHTML = `
        <div class="border-5 border-bottom border-primary">
        <img style="height: 350px; width: 100%" class="img-thumbnail" src="${thumbnail}" alt="">
        </div>
        <h5 class="mt-3">Book Title: <span class="text-primary">${bookTitle}</span></h3>
        <p class="mb-1 ">Author Name: <span class="text-primary">${authorName}</span></p>
        <p class="mb-1 ">Publishes On: <span class="text-primary">${publishYear}</span></p>
        <p class="mb-1 ">Publishers Name: <span class="text-primary">${publisher}</span></p>
    `;
    spinner.classList.add("d-none");
    resultSection.appendChild(div) ;

}