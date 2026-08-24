import {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";


const DeclarationWorkflowContext =
    createContext(null);


export const DeclarationWorkflowProvider = ({
    children
}) => {

    const [declaration, setDeclaration] =
        useState(null);

    const value = useMemo(
        () => ({
            declaration,
            selectDeclaration:setDeclaration,
            clearDeclaration:() => setDeclaration(null)
        }),
        [declaration]
    );

    return (
        <DeclarationWorkflowContext.Provider value={value}>
            {children}
        </DeclarationWorkflowContext.Provider>
    );

};


export const useDeclarationWorkflow = () =>
    useContext(DeclarationWorkflowContext);
