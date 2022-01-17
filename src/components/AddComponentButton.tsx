import Image from "next/image";
import styled from "styled-components";

type Props = {
    onClick: () => void;
};

export default function AddComponentButton(props: Props) {
    const { onClick } = props;

    return (
        <AddComponentButtonStyled 
            className="children-center" 
            onClick={onClick}>
            
            <Image
                width={32}
                height={32}
                src="/static/images/svg/add.svg"/>
            
        </AddComponentButtonStyled>
    );
}

const AddComponentButtonStyled = styled.div`
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 70px;
    height: 60px;
    border-radius: 10px;
    background-color: var(--color-secondary);
    cursor: pointer;
`;