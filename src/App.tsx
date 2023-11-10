import React, { useState } from "react";
import OpenAI from "openai";
import { RecipePage } from "./components/RecipePage";
import { IngredientForm } from "./components/IngredientForm";
import { ImageSlider } from "./components/ImageSlider";
import { imagesForSlider } from "./constants/imagesForSlider";

export const App: React.FC = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );

  const openai = new OpenAI({
    apiKey: "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",
    organization: "org-oJqA3X89TZTCik3UCUQadzTQ",
    dangerouslyAllowBrowser: true,
  });

  const generateImage = async (ingredients: string[]) => {
    try {
      if (!openai.images) {
        console.error("OpenAI Images endpoint is not defined.");
        return;
      }

      const response = await openai.images.generate({
        prompt: `Qazaq table with this ${ingredients.join(", ")}`,
        size: "512x512",
        n: 1,
      });

      if (response.data && response.data.length > 0) {
        setGeneratedImageUrl(response.data[0]?.url || null);
      } else {
        console.error("No image data received from the OpenAI API.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleIngredientsSubmit = async (ingredients: string[]) => {
    setLoading(true);

    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Create please a recipe with the following ingredients in JSON format: ${ingredients?.join(
              ", "
            )}, please give me only in this structure {
            title: string;
            ingredientsAmount: Record<string, string>;
            stepsToCook: string[];
            timeToCook: string;
            difficulty: string;
            }`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      await generateImage(ingredients);
      const recipeData = response.choices[0].message.content;

      if (recipeData === null) {
        console.error("Recipe data is null");
        return;
      }

      const parsedRecipe = JSON.parse(recipeData);
      setRecipe(parsedRecipe);
    } catch (error) {
      console.error("Error fetching or parsing recipe data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-[30px]">
      <div className="w-full m-0, p-0">
        <ImageSlider images={imagesForSlider} />
      </div>
      <div className="flex justify-center pt-10">
        <h1>Welcome to recipe App</h1>
      </div>
      <div className="flex justify-around w-full">
        <div className="pt-10">
          {generatedImageUrl && (
            <img src={generatedImageUrl} alt="Generated Recipe" />
          )}
        </div>
        <div className="w-full pt-10">
          {!recipe ? (
            <IngredientForm onIngredientsSubmit={handleIngredientsSubmit} />
          ) : (
            <>
              <div className="pl-10">
                <RecipePage recipe={recipe} />
              </div>
            </>
          )}
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};
