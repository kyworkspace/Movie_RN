const API_KEY = `672369773038d49a3a148c71ba3a215e`;
const BASE_URL = `https://api.themoviedb.org/3`;


export interface Movie{
    adult :boolean;
    backdrop_path :string | null;
    genre_ids : number[];
    id :number;
    original_language :string;
    original_title :string;
    overview :string;
    popularity :number;
    poster_path :string | null;
    release_date :string;
    title :string;
    video :boolean;
    vote_average :number;
    vote_count :number;
}

interface BaseResponse {
    page : number;
    total_result : number;
    total_pages : number;
}

export interface MovieResponse extends BaseResponse{
    results : Movie[]
}


const trending  = ()=>fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR`).then(res=>res.json());
const upcoming = ()=>fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`).then(res=>res.json());
const nowPlaying = ()=>fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`).then(res=>res.json());


export const moviesApi={
    trending,
    upcoming,
    nowPlaying,
}