import {createContext, useContext, useState, type ReactNode} from "react";

type ItemCreation = {
    nome: string;
    icone: string;
    volumes: number[];
    categorias: number[];
};

type ItemCreationContextType = {
    item: ItemCreation;
    setItem: React.Dispatch<React.SetStateAction<ItemCreation>>;
    resetItem: () => void;
};

const initialItem: ItemCreation = {
    nome: "",
    icone: "",
    volumes: [],
    categorias: [],
};

const ItemCreationContext = createContext<ItemCreationContextType | null>(null);

export function ItemCreationProvider({children}: {children: ReactNode}){
    const [item, setItem] = useState<ItemCreation>(initialItem);

    function resetItem(){
        setItem({
            ...initialItem,
            volumes: [],
            categorias: []
        });
    }

    return(
        <ItemCreationContext.Provider value={{item, setItem, resetItem}}>
            {children}
        </ItemCreationContext.Provider>
    )
}

export function useItemCreation(){
    const context = useContext(ItemCreationContext);

    if(!context){
        throw new Error(
            "useItemCreation deve ser usado dentro de ItemCreationProvider"
        );
    }

    return context;
}