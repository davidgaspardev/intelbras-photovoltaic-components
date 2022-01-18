import styled from "styled-components";
import { Flex } from "./base/Flex";
import Image from "next/image";

export default function Header() {
    return (
        <HeaderStyled
            width="100%"
            height="60px"
            flexDirection="row"
            justifyContent="center">

            <Image
                src="/static/images/svg/logo-intelbras.svg"
                width="126px"
                height="45px"/>

            <Flex flexDirection="column" justifyContent="center">
                <h4>Dashboard</h4>
                <h5>Fotovoltaicos components</h5>
            </Flex>

        </HeaderStyled>
    );
}

const HeaderStyled = styled(Flex)`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: white;
    box-shadow: 0px 0px 10px #00000010;

    > div {
        margin: 10px 0px 10px 20px;
        padding-left: 24px;
        border-left: 2px solid #4CA473;
        color: #646464;
    }

    > div h5 {
        font-weight: normal;
    }
`;