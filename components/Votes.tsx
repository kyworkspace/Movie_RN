import React from 'react'
import styled from 'styled-components/native';


interface VoteProps {
    votes: number;
}

const Text = styled.Text`
color: gray;
font-size: 10px;
`

const Votes: React.FC<VoteProps> = ({ votes }) => {
    return (
        <Text>{votes > 0 ? `⭐${votes}/10` : 'Coming soon'}</Text>
    )}

export default Votes;
