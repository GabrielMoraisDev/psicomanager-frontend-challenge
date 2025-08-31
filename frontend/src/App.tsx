
import { Container, Background } from "./styles";
import { Navbar } from "./components/Navbar";
import IllustrationEmptyScreen from "./assets/img/IllustrationEmptyScreen.png"
import { BtnPrimary } from "./styles/ui/BtnPrimary"
import { BankModal } from "./components/BankModal";
import { useBank } from "./contexts/useBank";
import Alert from "./components/Alert";

export default function App(){
    const { showBank, setShowBank, success, error } = useBank();
    return (
        <>
        <Navbar/>

        <Alert type="error" title="Atenção!" message="Os campos obrigatórios não foram preenchidos" active={error} />
        <Alert type="success" title="Sucesso!" message="PsicoBank ativado!" active={success} />

        <Container>
            <img src={IllustrationEmptyScreen} alt="" />
            <h1>Olá!</h1>
            <p>Clique no botão para começar a usar os benefícios financeiros do PsicoManager!</p>
            <BtnPrimary onClick={() => setShowBank(true)}>Ativar o PsicoBank</BtnPrimary>
        </Container>

        {showBank && <>
            <BankModal />
            <Background />
        </>}
        </>
    )
}
