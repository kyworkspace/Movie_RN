import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { tvApi, TVResponse } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

const Tv = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false)

    const { isLoading: todayLoading, data: todayData, isRefetching: todayRefatching, hasNextPage : todayHasNextPage, fetchNextPage: todayFetchNextPage } = useInfiniteQuery<TVResponse>(["tv", "today"], tvApi.airing,{
        getNextPageParam : (currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages ? null : nextPage;
        }
    })
    const { isLoading: topLoading, data: topData, isRefetching: topRefatching, hasNextPage : topHasNextPage, fetchNextPage: topFetchNextPage } = useInfiniteQuery<TVResponse>(["tv", "top"], tvApi.topRated,{
        getNextPageParam : (currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages ? null : nextPage;
        }
    })
    const { isLoading: trendingLoading, data: trendingData, isRefetching: trendingRefatching, hasNextPage : trendingHasNextPage, fetchNextPage: trendingFetchNextPage } = useInfiniteQuery<TVResponse>(["tv", "trending"], tvApi.trending,{
        getNextPageParam : (currentPage)=>{
            const nextPage = currentPage.page+1;
            return nextPage>currentPage.total_pages ? null : nextPage;
        }
    })

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
    }
    const loading = todayLoading || topLoading || trendingLoading;
    const trendingNextCall=()=>{
        if(trendingHasNextPage){
            trendingFetchNextPage()
        }
    }
    const topNextCall=()=>{
        if(topHasNextPage){
            topFetchNextPage()
        }
    }
    const todayNextCall=()=>{
        if(todayHasNextPage){
            todayFetchNextPage()
        }
    }

    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
                contentContainerStyle={{
                    paddingVertical: 30,
                }}>
                <HList title='Trending TV' infiniteCall={trendingNextCall} data={trendingData?.pages.map(page=>page.results).flat()} name={'tending'}/>
                <HList title='Today TV Show' infiniteCall={todayNextCall} data={todayData?.pages.map(page=>page.results).flat()} name={'today'}/>
                <HList title='Top Rated TV' infiniteCall={topNextCall} data={topData?.pages.map(page=>page.results).flat()} name={'top'}/>
            </ScrollView>
        )
    }
}


export default Tv;