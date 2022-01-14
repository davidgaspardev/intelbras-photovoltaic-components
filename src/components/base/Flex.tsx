import styled from 'styled-components';
import { flexbox, FlexboxProps } from 'styled-system';
import { Box } from './Box';

type FlexProps = FlexboxProps;

export const Flex = styled(Box)<FlexProps>(
    flexbox,
    {
        display: "flex"
    }
);