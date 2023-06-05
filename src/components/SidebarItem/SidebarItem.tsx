import React from 'react'
import * as Style from "./styles"

interface SidebarItemProps{
    name: string;
    icon: string;
    isActive: boolean;
    handleClick?: () => void;
}

const SidebarItem = ({name, icon, isActive, handleClick}: SidebarItemProps) => {

  return(
    <Style.Container onClick={handleClick} isActive={isActive}>
        <Style.Icon src={icon}/>
        <Style.Name>{name}</Style.Name>
    </Style.Container>
);
}

export default SidebarItem