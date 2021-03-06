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
            <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center">

                <input required
                    className="search-input"
                    name="name"
                    type="text"
                    placeholder="Pesquisar"/>

                <Box width="100px">
                    <input type="submit" value=""/>
                </Box>
            </Flex>
            <Flex flexDirection="row-reverse">
                <Box className="filter-block" width={150}>
                    <label htmlFor="systemType">Tipo de sistema</label>
                    <select required name="systemType">
                        <option value="QUALQUER">qualquer</option>
                        <option value="ONGRID">ongrid</option>
                        <option value="OFFGRID">offgrid</option>
                    </select>
                </Box>
                <Box className="filter-block" width={150}>
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
            <hr/>
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
        font-size: 14pt;
        margin: 8px 0px 8px 16px;
        padding: 10px 20px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    input {
        width: calc(100% - 16px);
    }

    input[type=submit] {
        margin: 8px 8px 8px 0px;
        height: 44px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        cursor: pointer;
        background-color: var(--color-secondary);
        background-image: url('/static/images/svg/search.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    label {
        font-size: 8pt;
        color: white;
        margin-left: 4px;
    }

    div.filter-block {
        background-color: #41BF79;
        border-radius: 5px;
        padding: 0 10px;
        margin-right: 16px;
    }

    select {
        margin-top: 4px;
        margin-left: 0px;
        color: white;
        background: #46B176;
        padding: 5px;
        width: 100%;
    }

    hr {
        border: 1.5px solid #F4F4F4;
        margin: 20px;
    }
`;