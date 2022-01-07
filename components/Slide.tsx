import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import { makeImgPath } from '../utils';
import Poster from './Poster';


const BgImg = styled.Image``
const Wrapper = styled.View`
    flex-direction : row;
    height : 100%;
    justify-content : center;
    align-items : center;
`
const Column = styled.View`
    width : 40%;
    margin-left : 15px;
`
const Title = styled.Text<{ isDark: boolean }>`
    font-size : 16px;
    font-weight : 600;
    color : white;
    color : ${(props) => (props.isDark ? 'white' : props.theme.textColor)}

`
const Overview = styled.Text<{ isDark: boolean }>`
    color : rgba(255,255,255,0.6);
    margin-top : 10px;
    color : ${(props) => (props.isDark ? '#ffffffcc' : '#000000cc')}
`
const Votes = styled(Overview) <{ isDark: boolean }>`
    font-size : 12px
`;

interface SlideProps {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    overview: string;
    fullInfo : Movie|TV;
}

const Slide: React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview,
    fullInfo
    }) => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const goToDetail = ()=>{
        navigation.navigate("Stack",{screen:"Detail",params : fullInfo})
    }

    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{ flex: 1 }}>
                <BgImg
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(backdropPath) }} />
                <BlurView
                    intensity={100}
                    style={StyleSheet.absoluteFill}
                    tint={isDark ? 'dark' : 'light'}
                >
                    <Wrapper>
                        <Poster path={posterPath} />
                        <Column>
                            <Title isDark={isDark}>
                                {originalTitle}
                            </Title>
                            {voteAverage > 0 ?
                                <Votes isDark={isDark}>⭐{voteAverage}/10</Votes>
                                : null
                            }
                            <Overview isDark={isDark}>{overview.slice(0, 70)}...</Overview>
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Slide;