import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import VMedia from './VMedia';

const ListContainer = styled.View`
    margin-bottom : 40px
`
const ListTitle = styled.Text`
    color : black;
    font-size : 18px;
    font-weight : 600;
    margin-left : 30px;
    margin-bottom : 20px;

`

export const HListSeparator = styled.View`
    width : 20px;
`

interface HListProps {
    title: string;
    data : any[];
    infiniteCall : Function;
}

const HList: React.FC<HListProps> = ({ title,data,infiniteCall}) => {

    return (
        <ListContainer>
            <ListTitle>
                {title}
            </ListTitle>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 30
                }}
                ItemSeparatorComponent={HListSeparator}
                keyExtractor={(item)=>item.id+''}
                onEndReached={infiniteCall}
                renderItem={({ item }) => {
                    return (
                        <VMedia
                            posterPath={item.poster_path}
                            originalTitle={item.title ?? item.name}
                            voteAverage={item.vote_average}
                            fullInfo={item}
                        />
                    )
                }}
            />
        </ListContainer>
    )

}

export default HList;