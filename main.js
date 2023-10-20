//input
let searchValue = document.getElementById("input-value");
//검색버튼
let searchBtn = document.getElementById("search-btn");
//input 값을 저장할 변수
let searchResult = [];
// json movie데이터 저장할 변수
let movies = [];

const getMovieData = async () => {
  let url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`
  );

  let header = new Headers({
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzFmMjlkNzhjOWRlZDY4ZWZkZjc4YjUyNzViYmQ4ZSIsInN1YiI6IjY0ZjQwODk1OTdhNGU2MDExYmIwZWJlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rotV3Tji-ksH690PVY72oiuOUcQ63af4dYxifANpzb4",
  });

  let response = await fetch(url, { headers: header });
  let data = await response.json();
  movies = data.results;
  console.log(movies);

  render();
};

// 클릭시 alert 아이디
function idPopUp(id) {
  alert("영화의 아이디는" + id);
}

const render = (viewList = movies) => {
  let movieHTML = "";
  movieHTML = viewList
    .map((movie) => {
      return `
        <div class="movie-card">
        <figure class="movie-fig" onClick="idPopUp(${movie.id})">
          <img src='https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${movie.poster_path}' alt="영화이미지" class="movies-img" />
          <figcaption>${movie.title}</figcaption>
        </figure>
        <div>
            ${movie.overview}
        </div>
        <p>🌟 ${movie.vote_average}</p>
      </div>
        `;
    })
    .join("");

  document.getElementById("movie-board").innerHTML = movieHTML;
};

// search 함수
function search() {
  searchKeyword = searchValue.value.toLowerCase();
  if (searchKeyword == "") {
    alert("영화 제목을 입력해주세요");
  } else {
    searchResult = movies.filter(
      (movie) => movie.title.toLowerCase().search(searchKeyword) > -1
    );render(searchResult);
    
  }}


//search버튼 클릭이벤트
searchBtn.addEventListener("click", search);

getMovieData();
