const API_KEY = `672369773038d49a3a148c71ba3a215e`;
const BASE_URL = `https://api.themoviedb.org/3`;

export const movies={
    getTrending : ()=>fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR`).then(res=>res.json),
    getUpcoming : ()=>fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`).then(res=>res.json),
    getNowPlaying : ()=>fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`).then(res=>res.json)
}