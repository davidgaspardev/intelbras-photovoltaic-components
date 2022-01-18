import { useEffect } from "react";
import styled from "styled-components";
import { SearchParameters } from "../utils/types";
import { Box } from "./base/Box";
import { Flex } from "./base/Flex";

type Props = {
    onSubmit: (search: SearchParameters) => void;
};

export default function SearchBar(props: Props) {
    const { onSubmit } = props;

    useEffect(() => {
        const searchBar = document.getElementById("search-bar") as HTMLFormElement;

        searchBar.onsubmit = (event) => {
            event.preventDefault();

            loadData(searchBar, onSubmit);
        };
    }, []);

    return (
        <SearchBarStyled id="search-bar">
            <Flex flexDirection="row">
                <Box width="90%">
                    <input className="search-input" name="name" required type="text" placeholder="Pesquisar"/>
                </Box>
                <Box width="10%">
                    <input type="submit" value=""/>
                </Box>
            </Flex>
            <Flex flexDirection="row-reverse">
                    <Box width={200}>
                        <label htmlFor="systemType">Tipo de sistema</label>
                        <select required name="systemType">
                            <option value="QUALQUER">qualquer</option>
                            <option value="ONGRID">ongrid</option>
                            <option value="OFFGRID">offgrid</option>
                        </select>
                    </Box>
                    <Box width={200}>
                        <label htmlFor="componentGroup">Grupo de componente</label>
                        <select required name="componentGroup">
                            <option value="QUALQUER">qualquer</option>
                            <option value="PERFIL">perfil</option>
                            <option value="MODULE">module</option>
                            <option value="INVERSOR">inversor</option>
                            <option value="CABOS">cabos</option>
                            <option value="CONECTORES">conectores</option>
                            <option value="BATERIAS">baterias</option>
                        </select>
                    </Box>
            </Flex>
        </SearchBarStyled>
    );
}

function loadData(form: HTMLFormElement, callback: (search: SearchParameters) => void) {
    function getValue(name: string) {
        return (form.elements.namedItem(name) as HTMLInputElement).value;
    }

    const name = getValue("name");
    const systemType = getValue("systemType") as "ONGRID" | "OFFGRID" | "QUALQUER";
    const componentGroup = getValue("componentGroup") as "PERFIL"
        | "MODULE"
        | "INVERSOR"
        | "CABOS"
        | "CONECTORES"
        | "BATERIAS"
        | "QUALQUER";

    callback({
        name,
        systemType: systemType === "QUALQUER" ? undefined : systemType,
        componentGroup: componentGroup === "QUALQUER" ? undefined : componentGroup
    });
}

const SearchBarStyled = styled('form')`
    max-width: 1280px;
    width: 100%;
    margin-bottom: 16px;

    .search-input {
        max-width: 100%;
        font-size: 16pt;
        margin-right: 0px;
        padding: 10px 20px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    input[type=submit] {
        margin-left: 0px;
        height: 47px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        cursor: pointer;
        background-color: var(--color-secondary);
        background-image: url('/static/images/svg/search.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    label {
        font-size: 8pt;
        font-weight: 600;
        color: #646464;
        margin-left: 8px;
    }

    select {
        margin-top: 4px;
        margin-left: 0px;
    }
`;