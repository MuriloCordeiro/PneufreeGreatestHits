import { Flex, Input, Text, Button, Img } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { db } from "../services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useRouter } from "next/router";

export default function FirebaseTest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [audioURL, setAudioURL] = useState<any>("");
  const [memes, setMemes] = useState<any>();

  const userCollectionRef = collection(db, "memes");

  const Router = useRouter();

  //Essa função assíncrona é responsável por criar um novo usuário no banco de dados utilizando a função "addDoc" em uma referência de coleção de usuários ("userCollectionRef"), passando como parâmetro um objeto com os campos "name" e "email".
  async function createUser() {
    const user = await addDoc(userCollectionRef, {
      name,
      email,
    });

    Router.reload();
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setMemes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteUser(id: any) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    Router.reload();
  }

  const audioRef = useRef<any>();
  const playaudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      ("");
      // Throw error
    }
  };

  function blabla(audio: any) {
    setAudioURL(audio);
    playaudio();
  }

  return (
    <Flex w="100%" h="100vh" align="center" p="5rem" bgColor="black">
      <Flex direction="column" align="center" w="full">
        {/* <Button onClick={playaudio}>Ouvir</Button> */}

        <audio src={audioURL} ref={audioRef} />
        {/* <Input
          w="50%"
          placeholder="Nome..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          w="40%"
          placeholder="Email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        /> */}
        {/* <Button onClick={createUser} mb="2rem">
          Criar usuario novo
        </Button> */}
        {console.log("Users que vieram do firebase", memes)}
        <Img
          src="Image/murilogordo.png"
          className="rotacionar"
          mb="4rem"
          w="20%"
        />
        <Text color="red" fontSize="26px">
          THE GREATEST PNEUFREE HITS
        </Text>
        {memes &&
          memes.map((meme: any) => {
            return (
              <Flex key={meme.id} align="center" mb="1rem">
                <Text mr="1rem" color="green">
                  {meme.nome}
                </Text>
                {/* <Text>{meme.value}</Text> */}
                <Button
                  onClick={() => {
                    blabla(meme.value);
                  }}
                  className="rotacionar"
                >
                  Ouvir
                </Button>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
}
