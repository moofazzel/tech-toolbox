const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
};
const mainNewsBox = document.getElementById("main-news-box");

const allCategories = document.getElementById("all-categories");
const noResult = document.getElementById("no-result");
const resultFound = document.getElementById("result-found");
const resultNumber = document.getElementById("result-number");
const allNewsTop = document.getElementById("all-news");

const displayCategories = (catagories) => {
  catagories.forEach((category) => {
    //   console.log(category);

    const li = document.createElement("li");
    li.innerHTML = `
      <a onclick="findId('${category.category_id}', target)" >${category.category_name}</a>
    `;

    li.classList.add("categories-list");
    allCategories.appendChild(li);

    console.log(mainNewsBox);
  });
};

loadCategories();

// li>a Click handler
const findId = (category_id, dd) => {
  loadNews(category_id);
  // console.log(dd)
};

const loadNews = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id} 
  `;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsByCategory(data.data);
};

const displayNewsByCategory = (allNews) => {
  console.log(allNews);
  const allNewsLength = allNews.length;
  if (allNews.length === 0) {
    noResult.classList.remove("d-none");
    resultFound.classList.add("d-none");
    allNewsTop.classList.add("d-none");
  } else {
    noResult.classList.add("d-none");
    resultFound.classList.remove("d-none");
    resultFound.innerText = `${allNewsLength} items found`;
    allNewsTop.classList.add("d-none");
  }

  console.log(allNewsLength);
  mainNewsBox.innerHTML = ``;

  allNews.forEach((news) => {
    // var size = Object.keys(myObj).length;
    const {
      title,
      thumbnail_url,
      details,
      total_view,
      author: { name, img, published_date },
    } = news;
    const newsDiv = document.createElement("div");
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
            <p>${details}</p>
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
                <button class="btn"><i class="bi bi-arrow-right"></i></button>
            </div>
        </div>
    </div>
</div>
      `;
    mainNewsBox.appendChild(newsDiv);
    // console.log(news);
  });

  // console.log(allNews);
};
