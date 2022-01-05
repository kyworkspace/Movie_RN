import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from "react-native"
import styled from "styled-components/native";

import Swiper from 'react-native-swiper'
import { API_KEY } from '../api_key';
import { LIGHT_GRAY_COLOR } from '../color';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { useQuery } from 'react-query';

const Loader = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`
const ListTitle = styled.Text`
    color : black;
    font-size : 18px;
    font-weight : 600;
    margin-left : 30px;
`

const TrendingScroll = styled.FlatList`
    margin-top : 20px;
`
const ListContainer = styled.View`
    margin-bottom : 40px
`
const ComingSoonTitle = styled(ListTitle)`
    margin-bottom : 20px
`
const VSeparator = styled.View`
    width : 20px;
`
const HSeparator = styled.View`
    width : 20px
`
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = async () => {
        
    }
    const renderVMedia =({ item }) => {
        return (
            <VMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                voteAverage={item.vote_average}
            />
        )
    }
    const renderHMovie=({ item }) => {
        return (
            <HMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                overview={item.overview}
                releaseDate={item.release_date}
            />
        )
    }
    const movieKeyExtractor=(item)=>item.id+''

    return loading ? (
        <Loader>
            <ActivityIndicator color={LIGHT_GRAY_COLOR} />
        </Loader>
    ) : (
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        autoplay
                        autoplayTimeout={3.5}
                        showsButtons={false}
                        showsPagination={false}
                        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4, marginBottom: 30 }}
                    >
                        {nowPlyingMovies.map(movie => (
                            movie.vote_average ?
                                <Slide key={movie.id}
                                    backdropPath={movie.backdrop_path}
                                    posterPath={movie.poster_path}
                                    originalTitle={movie.original_title}
                                    voteAverage={movie.vote_average}
                                    overview={movie.overview}
                                />
                                : null
                        ))}
                    </Swiper>
                    <ListContainer>
                        <ListTitle>
                            Trending Movie
                        </ListTitle>
                        <TrendingScroll
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            data={trending}
                            keyExtractor={movieKeyExtractor}
                            ItemSeparatorComponent={VSeparator}
                            renderItem={renderVMedia}
                        />
                    </ListContainer>
                    <ComingSoonTitle> Coming Soon </ComingSoonTitle>
                </>
            }
            data={upcomingMovies}
            keyExtractor={movieKeyExtractor}
            ItemSeparatorComponent={HSeparator}
            renderItem={renderHMovie}
        />


    )
}

export default Movies;