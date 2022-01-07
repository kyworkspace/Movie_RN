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
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
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
    const [refreshing, setRefreshing] = useState(false);
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
        isRefetching: isRefetchingUpcoming,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery<MovieResponse>(
        ["movies", "upcoming"],
        moviesApi.upcoming,
        {
            getNextPageParam: (currentPage)=>{
                const nextPage = currentPage.page+1;
                return nextPage > currentPage.total_pages ? null : nextPage;
            }
        } 
    );
    const {
        isLoading: trendingLoading,
        data: trendingData,
        isRefetching: isRefetchingTrending,
        hasNextPage : trendingHasNextPage,
        fetchNextPage : trendingNextFetch
    } = useInfiniteQuery<MovieResponse>(
        ["movies", "trending"],
        moviesApi.trending,{
            getNextPageParam: (currentPage)=>{
                const nextPage = currentPage.page+1;
                return nextPage > currentPage.total_pages ? null : nextPage;
            }
        }
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"])
        setRefreshing(false);
    }
    const loadMore = ()=>{
        if(hasNextPage){
            fetchNextPage();
        }
    }
    const loadTrendMore = ()=>{
        if(trendingHasNextPage){
            trendingNextFetch();
        }
    }
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    
    return loading ? (
        <Loader/>
    ) : (
        upcomingData ?
         <FlatList
            onEndReached={loadMore}
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
                                    originalTitle={movie.title}
                                    voteAverage={movie.vote_average}
                                    overview={movie.overview}
                                    fullInfo={movie}
                                />
                                : null
                        ))}
                    </Swiper>
                    {trendingData ? <HList title='Trending Movies' infiniteCall={loadTrendMore} data={trendingData?.pages.map(page=>page.results).flat()} name={'movietrending'}/> : null}
                    <ComingSoonTitle> Coming Soon </ComingSoonTitle>
                </>
            }
            data={upcomingData?.pages.map(page=>page.results).flat()}
            keyExtractor={(item) => item.id + ''}
            ItemSeparatorComponent={HSeparator}
            renderItem={({ item }) => {
                return (
                    <HMedia
                        posterPath={item?.poster_path}
                        originalTitle={item.title}
                        overview={item.overview}
                        releaseDate={item.release_date}
                        fullInfo={item}
                    />
                )
            }}
        />
            : null

    )
}

export default Movies;