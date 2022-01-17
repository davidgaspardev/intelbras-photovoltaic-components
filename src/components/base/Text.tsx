import styled from "styled-components";
import { typography, color, TypographyProps, ColorProps } from 'styled-system';

type TextProps = TypographyProps & ColorProps;

export const Text = styled('p')<TextProps>(typography, color);