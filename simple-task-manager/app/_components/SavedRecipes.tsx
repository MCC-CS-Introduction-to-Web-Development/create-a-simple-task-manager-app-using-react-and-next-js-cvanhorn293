import { RecipeFormData } from "./ReceipeFormYupWithoutFormHook";
import { RecipeFormData2 } from "./RecipeFormYupWithFormHook";

export function SavedRecipes({ recipes }: { recipes: RecipeFormData[] }) {
    if (recipes.length === 0) return null;

    return (
        <section className="w-[75vw] mx-auto mt-10">
            <h2 className="text-2xl font-bold text-blue-500 mb-6">Saved Recipes <span className="text-sm text-gray-500 italic">no hook</span></h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-blue-600 truncate border-b pb-2">{recipe.title}</h3>

                        <div>
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Ingredients</p>
                            <ul className="list-disc list-inside space-y-0.5">
                                {recipe.ingredients.map((ingredient, i) => (
                                    <li key={i} className="text-sm text-gray-600 truncate">{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Instructions</p>
                            <p className="text-sm text-gray-600 line-clamp-4">{recipe.instruction}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function SavedRecipesFromHook({ recipes }: { recipes: RecipeFormData2[] }) {
    if (recipes.length === 0) return null;

    return (
        <section className="w-[75vw] mx-auto mt-10">
            <h2 className="text-2xl font-bold text-blue-500 mb-6">Saved Recipes <span className="text-sm text-gray-500 italic">with hook</span></h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-blue-600 truncate border-b pb-2">{recipe.title}</h3>

                        <div>
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Ingredients</p>
                            <ul className="list-disc list-inside space-y-0.5">
                                {recipe.ingredients.split(",").map((ingredient, i) => (
                                    <li key={i} className="text-sm text-gray-600 truncate">{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Instructions</p>
                            <p className="text-sm text-gray-600 line-clamp-4">{recipe.instruction}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}