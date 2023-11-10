export interface RecipePageProps {
  recipe: {
    title: string;
    ingredientsAmount: Record<string, string>;
    stepsToCook: string[];
    timeToCook: string;
    difficulty: string;
    image?: string;
  };
}

export const RecipePage: React.FC<RecipePageProps> = ({ recipe }) => {
  return (
    <>
      <div>
        <h1>{recipe.title}</h1>
        <ul className="pt-4">
          <li>Ingredients Amount:</li>
          <ul className="list-inside list-decimal">
            {Object.entries(recipe.ingredientsAmount).map(
              ([ingredient, quantity]) => (
                <li key={ingredient}>
                  {ingredient}: {quantity}
                </li>
              )
            )}
          </ul>
          <ul className="pt-4">
            <li>
              Steps to Cook:
              <ul className="list-inside list-decimal">
                {recipe.stepsToCook?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </li>
          </ul>
        </ul>
        <p className="pt-4">Time To Cook: {recipe.timeToCook}</p>
        <p>Difficulty: {recipe.difficulty}</p>
      </div>
      <div>{recipe.image && <img src={recipe.image} alt="Recipe" />}</div>
    </>
  );
};
