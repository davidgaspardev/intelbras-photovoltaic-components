import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";
import { UserData } from "../utils/types";
import { Box } from "./base/Box";
import { Text } from "./base/Text";

type Props = {
    signIn: (data: UserData) => void;
}

export default function LoginBox(props: Props) {
    const { signIn } = props;

    useEffect(() => {
        const loginBox = document.getElementById("login-box") as HTMLFormElement;

        if(!loginBox) {
            console.error("Cannot find login box (form#login-box)");
            return;
        }

        loginBox.onsubmit = (event) => {
            if(!event.defaultPrevented) event.preventDefault();
            const userData = getUserDataByForm(loginBox);

            signIn(userData);
        }
    }, []);

    return (
        <FormStyled id="login-box">
            <Box padding="16px">
                <Header />

                { /** DATA INPUTS */}
                <input required name="username" type="text" placeholder="username" />
                <input required name="password" type="password" placeholder="password" />
                <input type="submit" />
            </Box>
        </FormStyled>
    );
}

function Header() {
    return (
        <header className="children-center">
            <Image src="/static/images/svg/logo-intelbras.svg" width={200} height={61} />
            <Text color={"#FFFFFF"}>Componentes <strong>Fotovoltaicos</strong></Text>
        </header>
    );
}

function getUserDataByForm(form: HTMLFormElement): UserData {
    const { value: username } = form.elements.namedItem("username") as HTMLInputElement;
    const { value: password } = form.elements.namedItem("password") as HTMLInputElement;

    if(typeof username !== "string" || typeof password !== "string") {
        throw Error("Username or password is null");
    }

    return {
        username,
        password
    };
}

/**
 * Styled 
 */

const FormStyled = styled.form`
    padding: 10px;
    max-width: 400px;
    width: 100%;
    
    > div {
        border: 1px solid #DFDFDF;
        border-radius: 10px;
        box-shadow: 0px 0px 16px #00000016;
        background-color: white; 

        header {
            margin-bottom: 30px;
        }

        input {
            max-width: 300px;
            width: 100%;
            margin: 10px auto;
            display: block;
        }

        input[type=submit] {
            background-color: var(--color-secondary);
            color: white;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                background-color: var(--color-primary);
            }
        }
    }
`;