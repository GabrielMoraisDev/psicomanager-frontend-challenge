import { Container, Indicator, ProgressBar, StepLabel1, StepLabel2, StepLabel3, Title } from './styles'
import { useBank } from "../../contexts/useBank";

function CheckIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8 3.65718C12.8 3.89112 12.7107 4.12518 12.5321 4.30346L5.21786 11.6177C5.04 11.7972 4.80571 11.8857 4.57143 11.8857C4.33714 11.8857 4.10343 11.7965 3.92514 11.6179L0.268 7.96075C0.0894286 7.78289 0 7.5486 0 7.31432C0 6.79203 0.427143 6.40003 0.914286 6.40003C1.14823 6.40003 1.38229 6.48932 1.56057 6.66789L4.57143 9.68003L11.24 3.01146C11.4171 2.83232 11.6514 2.74289 11.8857 2.74289C12.3743 2.74289 12.8 3.13432 12.8 3.65718Z" fill="#334094"/>
        </svg>
    );
}

export default function StepIndicator() {
    const { step } = useBank();
    return (
        <>
            <Container>
                <Indicator $position="left" $status={step === 1 ? 'current' : step >= 2 ? 'completed' : 'inative'}>
                    {step >= 2 ? <CheckIcon /> : <span></span>}
                    <StepLabel1 $status={step === 1 ? 'current' : step >= 2 ? 'completed' : 'inative'}>Cadastrar uma conta</StepLabel1>
                </Indicator>

                <Indicator $position="center" $status={step === 2 ? 'current' : step >= 3 ? 'completed' : 'inative'}>
                    {step >= 3 ? <CheckIcon /> : <span></span>}
                    <StepLabel2 $status={step === 2 ? 'current' : step >= 3 ? 'completed' : 'inative'}>Canais de envio e Mensagem de cobrança</StepLabel2>
                </Indicator>

                <Indicator $position="right" $status={step === 3 ? 'current' : 'inative'}>
                    {step >= 4 ? <CheckIcon /> : <span></span>}
                    <StepLabel3 $status={step === 3 ? 'current' : 'inative'}>Forma de pagamento da cobrança</StepLabel3>
                </Indicator>
                <ProgressBar/>
            </Container>
            <Title>
                Preencha os itens a seguir para configurar o PsicoBank
            </Title>
        </>
    );
}
