import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { moviesApi, tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Container = styled.ScrollView`

`
const SearchBar = styled.TextInput`
    background-color : white;
    padding : 10px 15px;
    border-radius : 15px;
    width : 90%;
    margin : 10px auto;
    margin-bottom : 40px;
`

const Search = () => {

    const [query, setQuery] = useState("");
    const {isLoading : moviesLoading,data : movieData, refetch:searchMovive} = useQuery(["searchMovies",query],moviesApi.search,
    {
        enabled:false, //자동 시작 방지
    })
    const {isLoading : tvLoading,data : tvData, refetch:searchTv} = useQuery(["searcgTv",query],tvApi.search,
    {
        enabled:false, //자동 시작 방지
    })
    const onChangeText = (text:string)=>setQuery(text);


    const onSubmit= ()=>{
        if(query === ""){
            return;
        }
        searchMovive();
        searchTv();
    }

    return (
        <Container>
            <SearchBar 
            placeholder='Search for Movie or TV Show'
            placeholderTextColor={"grey"}
            returnKeyType='search'
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            />
            {
                moviesLoading || tvLoading ? <Loader/> : null
            }
            {movieData ? <HList title='Movie Search' data={movieData.results} /> : null }
            {tvData ? <HList title='TV Search' data={tvData.results} /> : null }
        </Container>
    )
}

export default Search;