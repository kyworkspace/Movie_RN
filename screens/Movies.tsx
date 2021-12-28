import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native"
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';
import { API_KEY } from '../api_key';
import { LIGHT_GRAY_COLOR } from '../color';
import { makeImgPath } from '../utils';
import {BlurView}  from 'expo-blur'
const Container = styled.ScrollView`

`
const View = styled.View`
    flex : 1;
`

const Loader = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`

const BgImg = styled.Image`
    
`
const Title = styled.Text`

`
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation }) => {

    const [loading, setLoading] = useState(true)
    const [nowPlyingMovies, setNowPlyingMovies] = useState([]);

    const getNowPlaying = async () => {
        const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json()
        // const json = await response.json();
        setNowPlyingMovies(results)
        setLoading(false);
    }

    useEffect(() => {
        getNowPlaying()
    }, [])

    return loading ? (
        <Loader>
            <ActivityIndicator color={LIGHT_GRAY_COLOR} />
        </Loader>
    ) : (
        <Container>
            <Swiper
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
                    {nowPlyingMovies.map(movie => (
                        <View key={movie.id}>
                            <BgImg 
                            style={StyleSheet.absoluteFill}
                            source={{uri : makeImgPath(movie.backdrop_path)}}/>
                            <BlurView 
                                intensity={100}
                                style={StyleSheet.absoluteFill}>
                                <Title>
                                    {movie.original_title}
                                </Title>
                            </BlurView>
                        </View>
                    ))}
            </Swiper>
        </Container>
    )
}

export default Movies;