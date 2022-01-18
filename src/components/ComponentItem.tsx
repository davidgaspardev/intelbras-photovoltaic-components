import styled from "styled-components";
import { ComponentData } from "../utils/types";
import { Text } from "../components/base/Text";
import { Flex } from "./base/Flex";
import { Box } from "./base/Box";

type Props = {
    data: ComponentData;
    onClickUpdate: (data: ComponentData) => void;
    onClickDelete: (data: ComponentData) => void;
}

export default function ComponentItem(props: Props) {
    const { data, onClickUpdate, onClickDelete } = props;

    return (
        <ComponentItemStyled>
            <h3>{data.name}</h3>
            <h4>{data.gtin}</h4>

            <Flex className="component-categories">
                <Box width="50%">
                    <Text className="value-label" fontSize="9pt">Tipo do sistema</Text>
                    <Text fontWeight="bold">{data.systemType}</Text>
                </Box>
                <Box width="50%">
                    <Text className="value-label" fontSize="9pt">Grupo do componente</Text>
                    <Text fontWeight="bold">{data.componentGroup}</Text>
                </Box>
            </Flex>

            <Flex>
                <Box width="33%">
                    <Text className="value-label" fontSize="9pt">Largura</Text>
                    <Text><strong>{data.width.toString()}</strong> cm</Text>
                </Box>
                <Box width="33%">
                    <Text className="value-label" fontSize="9pt">Altura</Text>
                    <Text><strong>{data.height.toString()}</strong> cm</Text>
                </Box>
                <Box width="33%">
                    <Text className="value-label" fontSize="9pt">Profund.</Text>
                    <Text><strong>{data.depth.toString()}</strong> cm</Text>
                </Box>
            </Flex>

            <hr/>

            <Flex>
                <Box width="50%">
                    <Text className="value-label" fontSize="9pt">Peso bruto</Text>
                    <Text><strong>{data.weight.toString()}</strong> Kg</Text>
                </Box>
                <Box width="50%">
                    <Text className="value-label" fontSize="9pt">Peso líquido</Text>
                    <Text><strong>{data.netWeight.toString()}</strong> Kg</Text>
                </Box>
            </Flex>

            <Flex className="buttons" justifyContent="space-evenly" alignItems="center">
                <Text onClick={() => onClickDelete(data)}>excluir</Text>
                <Text onClick={() => onClickUpdate(data)} >atualizar</Text>
            </Flex>

        </ComponentItemStyled>
    );
}

const ComponentItemStyled = styled.div`
    max-width: 380px;
    width: 100%;
    margin: 8px 8px 80px 8px;
    padding: 16px;
    background-color: #41BF79;
    color: white;
    border-radius: 5px;
    position: relative;

    div.buttons {
        position: absolute;
        right: 0;
        bottom: -48px;
        height: 38px;
        width: 200px;
        border-radius: 5px;
        background-color: #4CA473;
    }

    div.component-categories {
        background-color: #4CA473;
        padding: 12px 0;
        margin: 8px 0;
        border-radius: 5px;
    }

    p.value-label {
        margin-bottom: 4px;
    }

    p, h3, h4 {
        padding: 0px 10px;
    }

    h4 {
        font-weight: normal;
        opacity: .75;
        margin-top: 3px;
        font-size: 10pt;
    }

    hr {
        border: 1px solid #4CA473;
        margin: 10px 0;
    }
`;