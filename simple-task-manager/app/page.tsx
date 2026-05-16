"use client";
import { useState } from "react";
import { RecipeForm, RecipeFormData } from "./_components/ReceipeFormYupWithoutFormHook";
import { SavedRecipes, SavedRecipesFromHook } from "./_components/SavedRecipes";
import { RecipeFormWithHook, RecipeFormData2 } from "./_components/RecipeFormYupWithFormHook";

export default function Home() {
	const [recipes, setRecipes] = useState<RecipeFormData[]>([]);
	const [recipesWithHook, setRecipesWithHook] = useState<RecipeFormData2[]>([]);

	return (
		<div className="flex flex-col items-center bg-zinc-50 font-sans min-h-screen py-16 px-4">
			<div className="flex flex-row items-start gap-4 items-center mb-12">
				<RecipeForm onSave={(data) => setRecipes((prev) => [...prev, data])} />
				<RecipeFormWithHook onSave={(data2) => setRecipesWithHook((prev) => [...prev, data2])} />
			</div>
			<SavedRecipes recipes={recipes} />
			<SavedRecipesFromHook recipes={recipesWithHook} />
		</div>
	);
}
