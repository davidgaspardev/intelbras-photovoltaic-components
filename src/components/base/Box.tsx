import styled from 'styled-components'
import { space, color, layout, SpaceProps, ColorProps, LayoutProps } from 'styled-system'

type BoxProps = SpaceProps & ColorProps & LayoutProps;

export const Box = styled('div')<BoxProps>(
  space,
  color,
  layout
);