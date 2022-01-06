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
import { useQuery, useQueryClient } from 'react-query';
import { MovieResponse, moviesApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';


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
    height : 20px;
`
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation }) => {
    const queryClient = useQueryClient();

    const {
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
        isRefetching: isRefetchingNowPlaying
    } = useQuery<MovieResponse>(
        ["movies", "nowPlaying"],
        moviesApi.nowPlaying
    );
    const {
        isLoading: upcomingLoading,
        data: upcomingData,
        isRefetching: isRefetchingUpcoming
    } = useQuery<MovieResponse>(
        ["movies", "upcoming"],
        moviesApi.upcoming
    );
    const {
        isLoading: trendingLoading,
        data: trendingData,
        isRefetching: isRefetchingTrending
    } = useQuery<MovieResponse>(
        ["movies", "trending"],
        moviesApi.trending
    );

    const onRefresh = async () => {
        await queryClient.refetchQueries(["movies"])
    }
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const refreshing = isRefetchingUpcoming || isRefetchingNowPlaying || isRefetchingTrending;

    return loading ? (
        <Loader/>
    ) : (
        upcomingData ? <FlatList
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
                        {nowPlayingData?.results.map(movie => (
                            movie.vote_average ?
                                <Slide key={movie.id}
                                    backdropPath={movie.backdrop_path || ""}
                                    posterPath={movie.poster_path || ""}
                                    originalTitle={movie.original_title}
                                    voteAverage={movie.vote_average}
                                    overview={movie.overview}
                                />
                                : null
                        ))}
                    </Swiper>
                    {trendingData ? <HList title='Trending Movies' data={trendingData.results}/> : null}
                    <ComingSoonTitle> Coming Soon </ComingSoonTitle>
                </>
            }
            data={upcomingData?.results}
            keyExtractor={(item) => item.id + ''}
            ItemSeparatorComponent={HSeparator}
            renderItem={({ item }) => {
                return (
                    <HMedia
                        posterPath={item?.poster_path}
                        originalTitle={item.original_title}
                        overview={item.overview}
                        releaseDate={item.release_date}
                    />
                )
            }}
        />
            : null

    )
}

export default Movies;