import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

const Tv = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false)

    const { isLoading: todayLoading, data: todayData, isRefetching: todayRefatching } = useQuery(["tv", "today"], tvApi.airing)
    const { isLoading: topLoading, data: topData, isRefetching: topRefatching } = useQuery(["tv", "top"], tvApi.topRated)
    const { isLoading: trendingLoading, data: trendingData, isRefetching: trendingRefatching } = useQuery(["tv", "trending"], tvApi.trending)

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
    }
    const loading = todayLoading || topLoading || trendingLoading;

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
                <HList title='Trending TV' data={trendingData.results} />
                <HList title='Today TV Show' data={todayData.results} />
                <HList title='Top Rated TV' data={topData.results} />
            </ScrollView>
        )
    }
}


export default Tv;