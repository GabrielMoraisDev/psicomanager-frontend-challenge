import { Modal, CloseButton } from "./styles.ts"
import StepIndicator from "../StepIndicator/index.tsx"
import Form1 from "../Form1.tsx"
import Form2 from "../Form2.tsx"
import Form3 from "../Form3.tsx"
import { useBank } from "../../contexts/useBank";
import { Spacer, SpacerForm2, SpacerForm3 } from "./styles.ts"

export const BankModal = () => {
    const { step, setShowBank } = useBank();

    return (
        <>

        <Modal>
            <CloseButton
                onClick={() => setShowBank(false)}
                aria-label="Fechar modal"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5877 11.6118C14.1345 12.1587 14.1345 13.0447 13.5877 13.5915C13.3165 13.865 12.9577 14.0006 12.599 14.0006C12.2403 14.0006 11.8824 13.8639 11.6095 13.5904L6.99945 8.98248L2.38988 13.5893C2.11646 13.865 1.75818 14.0006 1.39989 14.0006C1.04161 14.0006 0.683759 13.865 0.410124 13.5893C-0.136708 13.0425 -0.136708 12.1565 0.410124 11.6097L5.02101 6.99841L0.410124 2.38935C-0.136708 1.84248 -0.136708 0.956542 0.410124 0.409668C0.956957 -0.137207 1.84282 -0.137207 2.38966 0.409668L6.99945 5.0231L11.6103 0.411855C12.1572 -0.135019 13.043 -0.135019 13.5899 0.411855C14.1367 0.95873 14.1367 1.84467 13.5899 2.39154L8.97899 7.00279L13.5877 11.6118Z" fill="#7D8C94"/>
                </svg>
            </CloseButton>

            <h1>Ativar o PsicoBank</h1>

            <StepIndicator></StepIndicator>

            {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        </Modal>

        {step === 1 ? <Spacer/> : step === 2 ? <SpacerForm2/> : <SpacerForm3/>}
        </>
    )
}
