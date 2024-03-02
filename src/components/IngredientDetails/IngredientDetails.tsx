import React, { useEffect } from "react";
import styles from "./IngredientDetails.module.css";
import cn from "classnames";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import { getCard } from "../../services/actions/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const IngredientDetails: React.FC = () => {
  const selectedCard = useTypedSelector((state) => state.card.selectedCard);

  const info = [
    { title: "Калории,ккал", value: selectedCard.calories },
    { title: "Белки, г", value: selectedCard.proteins },
    { title: "Жиры, г", value: selectedCard.fat },
    { title: "Углеводы, г", value: selectedCard.carbohydrates },
  ];

  const { ingredientId } = useParams();
  const ingredients = useTypedSelector((state) => state.ingredients.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const obj = ingredients.find((item) => item._id === ingredientId);
    if (obj) {
      const dataForModal = {
        name: obj.name,
        calories: obj.calories,
        proteins: obj.proteins,
        fat: obj.fat,
        carbohydrates: obj.carbohydrates,
        image_large: obj.image_large,
      };
      console.log(obj)
      dispatch(getCard(dataForModal));
    }
  }, [ingredients]);

  return (
    <div className={styles.wrapper}>
      <img
        src={selectedCard.image_large}
        alt={`${selectedCard.name}.`}
        className={cn("ml-5 mr-5", styles.image)}
      />
      <p className={cn("text text_type_main-medium mt-4", styles.title)}>{selectedCard.name}</p>
      <ul className={styles.list}>
        {info.map((item, index) => {
          return (
            <li className={styles.item} key={index}>
              <p className="text text_type_main-default text_color_inactive">{item.title}</p>
              <span className="text text_type_digits-default text_color_inactive">
                {item.value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientDetails;
