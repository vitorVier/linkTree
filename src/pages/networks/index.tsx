import { FormEvent, useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { Input } from "../../components/input";


import { db } from "../../services/firebaseConnection";
import {
    setDoc,
    doc,
    getDoc
} from  'firebase/firestore'

export function Networks() {

    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [gitHub, setGitHub] = useState("");

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot !== undefined) {
                    setInstagram(snapshot.data()?.instagram)
                    setLinkedin(snapshot.data()?.linkedin)
                    setGitHub(snapshot.data()?.gitHub)
                }
            })
        }
    
        loadLinks();
    }, []) 

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            instagram: instagram,
            linkedin: linkedin,
            gitHub: gitHub
        })
        .then(() => {
            console.log("CADASTRADO COM SUCESSO")
        })
        .catch((error) => {
            console.log("ERRO: " + error)
        }) 
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                <Input
                    type="url"
                    placeholder="Digite a URL"
                    value={instagram}
                    onChange={ (e) => setInstagram(e.target.value) }
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
                <Input
                    type="url"
                    placeholder="Digite a URL"
                    value={linkedin}
                    onChange={ (e) => setLinkedin(e.target.value) }
                />

                <label className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
                <Input
                    type="url"
                    placeholder="Digite a URL"
                    value={gitHub}
                    onChange={ (e) => setGitHub(e.target.value) }
                />

                <button 
                    type="submit"
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mt-2 mb-7 font-medium cursor-pointer"
                >
                    Salvar Links
                </button>
                    
            </form>
        </div>
    )
}