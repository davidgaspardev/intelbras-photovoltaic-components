import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AddComponentButton from "../../components/AddComponentButton";
import { Flex } from "../../components/base/Flex";
import { FlexWrap } from "../../components/base/FlexWrap";
import ComponentItem from "../../components/ComponentItem";
import ComponentPopup from "../../components/ComponentPopup";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar";
import { mapToQuery } from "../../utils/convert";
import { isTextMd5 } from "../../utils/hash";
import { ComponentData, SearchParameters } from "../../utils/types";

export default function DashboardPage() {
    const router = useRouter();
    const [ isLoading, showLoading ] = useState(true);
    const [ isComponentPopup, showComponentPopup ] = useState(false);

    const componentsRef = useRef<ComponentData[]>([]);
    const componentSelectedRef = useRef<ComponentData>();

    async function onSearch(search: SearchParameters) {
        showLoading(true);
        const components = await loadComponentList(search);
        componentsRef.current = components;
        showLoading(false);
    }

    async function onAddComponent(data: ComponentData) {
        await addComponent(data);
        const components = await loadComponentList();
        componentsRef.current = components;
        showComponentPopup(false);
    }

    async function onUpdateComponent(data: ComponentData) {
        showLoading(true);
        await updateComponent(data);
        const components = await loadComponentList();
        componentsRef.current = components;
        componentSelectedRef.current = undefined;
        showComponentPopup(false);
        showLoading(false);
    }

    async function onDeleteComponent(data: ComponentData) {
        showLoading(true);
        await deleteComponent(data.id!);
        const components = await loadComponentList();
        componentsRef.current = components;
        showLoading(false);
    }

    function openUpdateComponent(data: ComponentData) {
        componentSelectedRef.current = data;
        showComponentPopup(true);
    }

    useEffect(() => {
        loadComponentList().then(
            (components) => {
                componentsRef.current = components;
                showLoading(false);
            }
        ).catch(
            (e) => {
                console.error(e);
                // Redirect to login
                router.push("/");
            }
        );
    }, []);

    return (
        <main style={{ paddingTop: 80 }}>
            <Header/>
            <Flex flexDirection="column" alignItems="center">
                <SearchBar onSubmit={onSearch}/>

                <FlexWrap maxWidth={1200} width="100%">
                    { componentsRef.current.length > 0 && componentsRef.current.map((component, index) => (
                        <ComponentItem
                            key={index}
                            data={component}
                            onClickDelete={onDeleteComponent}
                            onClickUpdate={openUpdateComponent}/>
                    ))}
                </FlexWrap>

                {isComponentPopup && (
                    <ComponentPopup
                        data={componentSelectedRef.current}
                        onClickAdd={onAddComponent}
                        onClickUpdate={onUpdateComponent}
                        onClickBack={() => showComponentPopup(false)}/>
                )}

                <AddComponentButton onClick={() => {
                    showComponentPopup(true);
                }}/>
            </Flex>

            {isLoading && <Loading />}
        </main>
    );
}

async function loadComponentList(filter?: { [key:string]: any }): Promise<ComponentData[]> {
    const token = sessionStorage.getItem("token");

    if(!token) {
        throw Error("Token don't available");
    }

    if(!isTextMd5(token)) {
        throw Error("Token invalid");
    }

    const response = await fetch(`api/components${filter ? `?${mapToQuery(filter)}` : ""}`, {
        headers: {
            token
        }
    });

    if(!response.ok) {
        throw Error("Token don't allowed");
    }

    const components = (await response.json())['components'];

    return components;
}

async function addComponent(component: ComponentData) {
    const token = sessionStorage.getItem("token");

    if(!token) {
        throw Error("Token don't available");
    }

    if(!isTextMd5(token)) {
        throw Error("Token invalid");
    }

    const response = await fetch("api/components/add", {
        method: "POST",
        mode: 'cors',
        headers: {
            token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(component)
    });

    if(response.status !== 201) {
        throw Error("Error in request");
    }
}

async function updateComponent(component: ComponentData) {
    const token = sessionStorage.getItem("token");

    if(!token) {
        throw Error("Token don't available");
    }

    if(!isTextMd5(token)) {
        throw Error("Token invalid");
    }

    const response = await fetch("api/components/update", {
        method: "POST",
        mode: 'cors',
        headers: {
            token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(component)
    });

    if(response.status !== 201) {
        throw Error("Error in request");
    }
}

async function deleteComponent(id: number) {
    const token = sessionStorage.getItem("token");

    if(!token) {
        throw Error("Token don't available");
    }

    if(!isTextMd5(token)) {
        throw Error("Token invalid");
    }

    const response = await fetch(`api/components/delete?id=${id}`, {
        headers: {
            token
        }
    });

    if(!response.ok) {
        throw Error("Token don't allowed");
    }
}