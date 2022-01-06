import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { LIGHT_GRAY_COLOR } from "../color";


const LoaderWrapper = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`

const Loader = ()=>{

    return(
        <LoaderWrapper>
            <ActivityIndicator color={LIGHT_GRAY_COLOR} />
        </LoaderWrapper>
    )
}

export default Loader;