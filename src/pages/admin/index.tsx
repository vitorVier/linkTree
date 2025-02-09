import { db } from "../../services/firebaseConnection";
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore';

import { FiTrash } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";

import { FormEvent, useEffect, useState } from "react";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {

    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setTextColorInput] = useState("#000");
    const [bgColorInput, setBgColorInput] = useState("#FFF");
    const [links, setLinks] = useState<LinkProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })
            setLinks(lista);
        })

        return() => {
            unsub();
        }
        
    }, [])

    // Registrar Link
    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if(nameInput === "" || urlInput === "") {
            alert("Preencha os campos primeiro")
            return;
        }

        await addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("");
            setUrlInput("");
            console.log("Link cadastrado com sucesso")
        })
        .catch((error) => {
            console.log("Erro ao cadastrar", + error)
        })
    }

    // Deletar Link
    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef);
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input 
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
                <Input 
                    type="url"
                    placeholder="Digite a URL do link..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                {/* Link Color's */}
                <section className="flex my-4 gap-5">
                    <div className="text-white font-medium mt-2 mb-2">
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                        <input 
                            type="color" 
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}    
                        />
                    </div>

                    <div className="text-white font-medium mt-2 mb-2">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input 
                            type="color" 
                            value={bgColorInput}
                            onChange={(e) => setBgColorInput(e.target.value)}    
                        />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label>

                        <article 
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                            style={{marginBottom: 8, marginTop: 8, backgroundColor: bgColorInput}}
                        >
                            <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button type="submit" className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center cursor-pointer">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

            {links.map( (link) => (
                <article
                    key={link.id} 
                    className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none" 
                    style={{ backgroundColor: link.bg, color: link.color }}
                >
                    <p>{link.name}</p>
                    <div>
                        <button
                            className="border border-dashed p-1 rounded cursor-pointer"
                            onClick={ () => handleDeleteLink(link.id) }
                        >
                            <FiTrash size={18} color="#FFF"/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}