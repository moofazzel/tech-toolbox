const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (error) {
    console.log("Error: Load Categories", error);
  }
};
const mainNewsBox = document.getElementById("main-news-box");

const allCategories = document.getElementById("all-categories");
const noResult = document.getElementById("no-result");
const resultFound = document.getElementById("result-found");
const resultNumber = document.getElementById("result-number");
const allNewsTop = document.getElementById("all-news");
const modalContent = document.getElementById("modal-content");
const charCount = 20;

const displayCategories = (catagories) => {
  catagories.forEach((category) => {
    //   console.log(category);

    const li = document.createElement("li");
    li.innerHTML = `
      <a onclick="findId('${category.category_id}', target)" >${category.category_name}</a>
    `;

    li.classList.add("categories-list");
    allCategories.appendChild(li);

    //       let newsDiv = document.createElement("div");
    //       newsDiv.innerHTML = `

    //       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque!</p>
    //     `
    // .mainNewsBox.appendChild(newsDiv)
    // console.log(mainNewsBox);
  });
};

loadCategories();

// loader / spinner
const toggleSpinner = (isLoading) => {
  const loadingSection = document.getElementById("loading");
  if (isLoading) {
    loadingSection.classList.remove("d-none");
  } else {
    loadingSection.classList.add("d-none");
  }
};

// Character count for description
function carCounts(c) {
  if (c.length > charCount) {
    return c.substring(0, 140) + "<br> <br>" + c.substring(140, 300) + " ...";
  } else {
    return c;
  }
}

toggleSpinner(false);

// li>a Click handler
const findId = (category_id) => {
  loadNews(category_id);
  toggleSpinner(true);
  // console.log(dd)
};

const loadNews = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id} 
  `;
  try {
	const res = await fetch(url);
	  const data = await res.json();
	  displayNewsByCategory(data.data);
} catch (error) {
  console.log('Error: Load News', error);
}
};

const displayNewsByCategory = (allNews) => {
  // console.log(allNews);
  const allNewsLength = allNews.length;
  if (allNews.length === 0) {
    noResult.classList.remove("d-none");
    resultFound.classList.add("d-none");
    allNewsTop.classList.add("d-none");
    toggleSpinner(false);
  } else {
    noResult.classList.add("d-none");
    resultFound.classList.remove("d-none");
    resultFound.innerText = `${allNewsLength} items found`;
    allNewsTop.classList.add("d-none");
  }

  // console.log(allNewsLength);
  mainNewsBox.innerHTML = ``;

  allNews.forEach((news) => {
    // var size = Object.keys(myObj).length;
    const {
      _id,
      title,
      thumbnail_url,
      details,
      total_view,
      author: { name, img, published_date },
    } = news;
    let newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    
    <div class="row g-0 justify-content-between align-items-center bg-white rounded p-3 my-4">
    <div class="col-md-3">
        <img class="img-fluid" src="${
          thumbnail_url ? thumbnail_url : " No Image Available"
        }" alt="">
    </div>
    <div class="col-md-9 py-2">
        <div class="news-text">
            <h2 class="fw-bold">${title}</h2>
            <p>${carCounts(details)}</p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3">
                <img class="news-author rounded-circle" src="${img}" alt="">
                <h6>
                    <span class="d-block"> ${name ? name : "No Name"}</span>
                    <small class="d-block">jan 10, 2022</small>
                </h6>
            </div>

            <div>
                <i class="bi bi-eye"></i>
                <span class="fw-bold">${total_view ? total_view : "NA"}</span>
            </div>

            <div>
                <i class="bi bi-star-half"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
            </div>

            <div>
            <!-- Button trigger modal -->
            <button onclick="detailsId('${_id}')" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="bi bi-arrow-right"></i>
            </button>
            </div>
        </div>
    </div>
</div>
      `;
    mainNewsBox.appendChild(newsDiv);
    // console.log(news);
    toggleSpinner(false);
  });
};

// find details Id
const detailsId = (news_id) => {
  loadDetailsData(news_id);
};

const loadDetailsData = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id} 
  `;
try {
	  const res = await fetch(url);
	  const data = await res.json();
	  displayDetails(data.data);
} catch (error) {
  console.log('Error: Load Details', error);
}
};

const displayDetails = (news_id) => {
  news_id.forEach((news) => {
    const {
      image_url,
      title,
      total_view,
      details,
      author: { img, name, published_date },
      rating: { number, badge },
    } = news;

    modalContent.innerHTML = "";
    const detailsInsideModal = document.createElement("div");
    detailsInsideModal.classList.add("modal-content");
    detailsInsideModal.innerHTML = `
                <div class="modal-header">
                <small class="d-block">${published_date}</small>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  </button>
                </div>
                <div class="modal-body">
                    <h5 class="modal-title pb-1" id="exampleModalLabel">${title}</h5>
                    <img class="img-fluid" src=" ${image_url}" alt="">

                    <div class="d-flex justify-content-between align-items-center mx-2 mt-1">
                    <div class="d-flex align-items-center">
                        <span class="border rounded bg-dark text-white py-1 px-2">Badge :</span>
                        <span>${badge}</span>
                    </div>
                    <span class="d-flex align-items-center">
                        <i class="bi bi-eye"></i>   
                        <span class="d-block fw-bold ms-2">${total_view}</span>
                    </span>
                </div>

                <p class="pt-3">${details}</p>
                </div>
                <hr>
                <div class="row justify-content-between align-items-center pb-3 pe-3">
                    <div class="col-6">
                        <div class="d-flex justify-content-evenly align-items-center">
                            <div class="d-flex align-items-center gap-3">
                              <img class=" news-author rounded-circle"
                                src="${img}" alt="">
                              <span class="d-block"> ${name}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                    <div class="d-flex align-items-center me-2">
                        <span class="border rounded bg-dark text-white py-1 px-2 me-1">Rating:</span>
                        <span> ${number}</span>
                    </div>
                    </div>
                </div>
    `;
    modalContent.appendChild(detailsInsideModal);

    console.log(news);
  });
};
