
import { Container, Background } from "./styles";
import { Navbar } from "./components/Navbar";
import ImagemInicial from "./assets/img/IllustrationEmptyScreen.png"
import ImagemFinal from "./assets/img/endIllustration.png"
import { BtnPrimary } from "./styles/ui/BtnPrimary"
import { BankModal } from "./components/BankModal";
import { useBank } from "./contexts/useBank";
import Alert from "./components/Alert";

export default function App(){
    const { showBank, setShowBank, step, success, error } = useBank();
    return (
        <>
        <Navbar/>

        <Alert type="error" title="Atenção!" message="Os campos obrigatórios não foram preenchidos" active={error} />
        <Alert type="success" title="Sucesso!" message="PsicoBank ativado!" active={success} />

        <Container>
            <img src={step > 3 ? ImagemFinal : ImagemInicial} alt="Imagem mascote" />
            <h1>{step > 3 ? 'Parabéns!' : 'Olá!'}</h1>
            <p>{step > 3 ? 'O Psicobank foi ativado! Aguarde os próximos passos!' : 'Clique no botão para começar a usar os benefícios financeiros do PsicoManager!'}</p>
            {step < 3 && <BtnPrimary onClick={() => setShowBank(true)}>Ativar o PsicoBank</BtnPrimary> }
        </Container>

        {showBank && <>
            <BankModal />
            <Background />
        </>}
        </>
    )
}
