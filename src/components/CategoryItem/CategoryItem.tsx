import React from "react";
import * as S from "./styles"
import { Link } from "react-router-dom";

interface CategorieItemProps{
    name:string;
    color:string;
}

const CategoryItem = ({name,color}: CategorieItemProps) => {
    return(
        <Link  to={"/categorie/"+name} style={{ textDecoration: 'none' }}>
            <S.Categorie>
                <S.ColorTag color={color}/>
                <S.ListName>{name}</S.ListName>
            </S.Categorie>
        </Link>
    )
}

export default CategoryItem