

import { Container, ItemsContainer, FinanceiroHighlight, AnotherItens, SidebarIconImg, SidebarLabel } from "./styles";

import PanelIcon from "../../assets/icons/panel.svg";
import PersonIcon from "../../assets/icons/users.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import MoneyIcon from "../../assets/icons/money.svg";
import FileIcon from "../../assets/icons/file.svg";
import AlertIcon from "../../assets/icons/alert.svg";
import GearIcon from "../../assets/icons/gear.svg";
import BuildingIcon from "../../assets/icons/building.svg";

const sidebarItems = [
    { label: "Painel", icon: PanelIcon },
    { label: "Clientes", icon: PersonIcon },
    { label: "Agenda", icon: CalendarIcon },
    { label: "Financeiro", icon: MoneyIcon },
    { label: "Relatórios", icon: FileIcon },
    { label: "Marketing", icon: AlertIcon },
    { label: "Configuração", icon: GearIcon },
    { label: "Minha Clínica", icon: BuildingIcon },
];

export default function Sidebar() {
    return (
        <Container>
            <ItemsContainer>
                {sidebarItems.map((item) => {
                    const isFinanceiro = item.label === "Financeiro";
                    const content = (
                        <>
                            {item.icon && (
                                <SidebarIconImg
                                    src={item.icon}
                                    alt={item.label}
                                />
                            )}
                            <SidebarLabel $white={isFinanceiro}>{item.label}</SidebarLabel>
                        </>
                    );
                    return isFinanceiro ? (
                        <FinanceiroHighlight key={item.label}>
                            {content}
                        </FinanceiroHighlight>
                    ) : (
                        <AnotherItens key={item.label}>
                            {content}
                        </AnotherItens>
                    );
                })}
            </ItemsContainer>
        </Container>
    );
}