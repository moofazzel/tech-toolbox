const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
};

const allCategories = document.getElementById("all-categories");

const displayCategories = (catagories) => {
  catagories.forEach((category) => {
    //   console.log(category);

    const li = document.createElement("li");
    li.innerHTML = `
      <a onclick="findId('${category.category_id}')" >${category.category_name}</a>
    `;

    li.classList.add("categories-list");
    allCategories.appendChild(li);
  });
};

loadCategories();

// li>a Click handler
const findId = (id) => {
  loadNews(id);
};

const loadNews = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id} 
  `;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsByCategory(data.data);
};

const displayNewsByCategory = (allNews) => {
  const mainNewsBox = document.getElementById("main-news-box");
  allNews.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="d-flex justify-content-between align-items-center gap-3 bg-white rounded p-3 my-4">
    <div class="w-25">
        <img class="img-fluid" src="./asset/images/bg.jpg" alt="">
    </div>
    <div class="py-2">
        <div class="news-text">
            <h2 class="fw-bold">The best fashion influencers to follow for sartorial inspiration
            </h2>
            <p>From our favourite UK influencers to the best missives from Milan and the coolest New
                Yorkers, read on some of the best fashion blogs out there, and for even more
                inspiration, do
                head to our separate black fashion influencer round-up.

                Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS
                Black
                Friday, Missoma Black Friday and Gucci Black Friday...</p>
        </div>

        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3">
                <img class="news-author rounded-circle" src="./asset/images/rony.jpg" alt="">
                <h6>
                    <span class="d-block">Jane Cooper</span>
                    <small class="d-block">jan 10, 2022</small>
                </h6>
            </div>

            <div>
                <i class="bi bi-eye"></i>
                <span class="fw-bold">1.5</span>
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
    console.log(news.title);
  });

  //   console.log(allNews);
};
