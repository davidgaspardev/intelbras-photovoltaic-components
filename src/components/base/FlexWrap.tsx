import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";
import { Box } from "./Box";

type FlexWrapProps = FlexboxProps;

export const FlexWrap = styled(Box)<FlexWrapProps>(
    flexbox,
    {
        display: "flex",
        flexWrap: "wrap"
    }
);