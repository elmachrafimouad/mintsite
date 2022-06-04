import './App.css';
import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text, Image, Link } from '@chakra-ui/react';
import DeGodsYachtClub from './DeGodsYachtClub.json';
import React from 'react';
import Logo from "./assets/social-media-icons/logo.png";
import Discord from "./assets/social-media-icons/discord_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
const DeGodsYachtClubAddress = "0xB0eb2A16BC180c35819ec0384E5c41198f6A5802";

function App() {

  const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    const [setError] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(DeGodsYachtClubAddress, DeGodsYachtClub.abi, provider);
            try {
                const cost = await contract.cost();
                const totalSupply = await contract.totalSupply();
                const object = { "cost": String(cost), "totalSupply": String(totalSupply) };
                setData(object);
            }
            catch (err) {
                setError(err.message);
            }
        }
    }

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                DeGodsYachtClubAddress,
                DeGodsYachtClub.abi,
                signer
            );

            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.001 * mintAmount).toString()),
                });
                console.log('response:', response);
            } catch (err) {
                console.log("error:", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };
    const handleIncrement = () => {
        if (mintAmount >= 2) return;
        setMintAmount(mintAmount + 1);
    };
    return (
        <Flex justify="center" align="center" height="35vh" paddingBottom="150px">
            <Box width="620px">
                <div>

                    <Text fontSize="45px" >DeGodsYachtClub</Text>
                    <Text
                        fontSize="40px"
                        letterSpacing="-5.5%"
                        fontFamily="cursive"

                    >
                        The Gods Around Oddin Table are the Best heros
                    </Text>
                </div>


                {isConnected ? (
                    <div>
                        <Text
                            fontSize="40px"
                            letterSpacing="-5.5%"
                            fontFamily="Zen Antique"

                        >
                            {data.totalSupply} /15
                        </Text>
                        <Flex align="center" justify="center">
                            <Button
                                background="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2 px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="Zen Antique"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleDecrement}
                            >-
                            </Button>
                            <Input
                                readOnly
                                fontFamily="Zen Antique"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number"
                                value={mintAmount} />
                            <Button
                                background="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2 px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleIncrement}>+</Button>
                        </Flex>
                        <Button
                            background="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2 px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleMint}>Mint Now</Button>
                    </div>

                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="40px"
                        letterSpacing="-5.5%"
                        fontFamily="El Messiri"
                        textShadow="0 3px #000000"
                        color="#D6517D"
                    >You must be connected to Mint.</Text>
                )}
            </Box>

        </Flex>
    );
};

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

      <Flex justify ="space-around"  padding="0px">
        <Link href="http://www.moonknightnft.art/">
           <Image src={Logo} boxSize="130px" margin="0 0px"/>
          </Link> 
          </Flex>

      <Flex justify ="space-between" align ="center" padding="10px">
      <Link href="https://discord.com/" target="_blank">
          <Image src={Discord} boxSize="42px" margin="1px"/>
          </Link>    
          <Link href="https://www.twitter.com" target="_blank">
          <Image src={Twitter} boxSize="42px" margin="0 70px"/>
          </Link>
         
      
      {isConnected ? (
      <Box margin ="0 25px">Connected</Box>
      ) : (
                      <Button  
                      background="#11ffee00"
                      borderRadius="5px"
                      boxShadow="0px 2 px 2px 1px #0F0F0F"
                      borderColor= '#FFFFFF'
                      cursor="pointer"
                      fontFamily="El Messiri"
                      padding="15px"
                      margin="1px"
                      px='8px'
                      fontSize='14px'
                          color='#FFFFFF'
                          _hover={{ bg: '#77E8FC' }}
                          _active={{
                              bg: '#000000',
                              transform: 'scale(0.98)',
                              borderColor: '#bec3c9',
                          }}
                          _focus={{
                              boxShadow:
                                  '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                          }}
                          onClick={connectAccount}>
                          Connect
                      </Button>
      )
      }
  </Flex>
</Flex>

  );
};


  const[accounts, setAccounts] = useState([]);
  return (
    <div className="overplay">
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>);
    
}

export default App;
