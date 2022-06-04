import React from 'react';
import {Box, Button,Flex, Image, Link} from '@chakra-ui/react';
import Discord from "./assets/social-media-icons/discord_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
const NavBar =({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    return (
    <Flex justify ="space-between" align ="center" padding="30px">
        <Flex justify ="space-around" width ="20%" padding="0 75px">
        <Link href="https://discord.com/" target="_blank">
            <Image src={Discord} boxSize="42px" margin="0 15px"/>
            </Link>    
            <Link href="https://www.twitter.com" target="_blank">
            <Image src={Twitter} boxSize="42px" margin="0 15px"/>
            </Link>      
        </Flex>



        <Flex justify ="space-between" align ="center" padding="30px">
        
        {isConnected ? (
        <Box margin ="0 25px">Connected</Box>
        ) : (
            <Button
            background="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2 px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="El Messiri"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}>
            Connect
            </Button>
        )
        }
    </Flex>
</Flex>

    );
};
export default NavBar;