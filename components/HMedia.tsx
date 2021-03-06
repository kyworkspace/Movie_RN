import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import Poster from './Poster';
import Votes from './Votes';

const HMovie = styled.View`
    padding : 0 30px;
    flex-direction : row;
`
const HColumn = styled.View`
    margin-left : 15px;
    width : 80%;
`
const Title = styled.Text`
    color : gray;
    font-weight : 600;
    margin-top : 7px;
    margin-bottom : 5px
`
const Overview = styled.Text`
    color : gray;
    width : 80%;
`
const Release = styled.Text`
    color : gray;
    font-size : 12px;
    margin-vertical : 10px;
`

interface HMediaProps {
    posterPath: string;
    originalTitle: string;
    overview: string;
    releaseDate?: string;
    voteAverage?: number;
    fullInfo : Movie|TV;
}

const HMedia: React.FC<HMediaProps> = (
    { posterPath,
        originalTitle,
        overview,
        releaseDate,
        voteAverage,
        fullInfo}) => {

    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", { screen: "Detail" ,params : fullInfo})
    }
    return (
        <TouchableOpacity onPress={goToDetail}>
            <HMovie >
                <Poster path={posterPath} />
                <HColumn>
                    <Title>
                        {originalTitle}
                    </Title>
                    <Release>
                        Coming . {new Date(releaseDate).toLocaleDateString("ko", { month: 'long', day: 'numeric', year: 'numeric' })}
                    </Release>
                    {voteAverage ? <Votes votes={voteAverage} /> : null}
                    <Overview>
                        {overview !== "" && overview.length > 100 ?
                            `${overview.slice(0, 100)}...`
                            :
                            overview
                        }
                    </Overview>
                </HColumn>
            </HMovie>
        </TouchableOpacity>
    )
}


export default HMedia;