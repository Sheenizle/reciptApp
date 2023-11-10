import React, { useState } from "react";

interface IngredientFormProps {
  onIngredientsSubmit: (ingredients: string[]) => void;
}

export const IngredientForm: React.FC<IngredientFormProps> = ({
  onIngredientsSubmit,
}) => {
  const [ingredients, setIngredients] = useState<string>("");

  const handleSubmit = () => {
    const ingredientsArray = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    onIngredientsSubmit(ingredientsArray);
  };

  return (
    <div className="w-full flex justify-center align-center">
      <div className="w-full">
        <textarea
          className="w-full"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
        />
      </div>
      <div>
        <button className="ml-4 w-full h-[48px]" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
