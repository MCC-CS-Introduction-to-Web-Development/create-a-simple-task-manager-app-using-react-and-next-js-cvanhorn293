"use client";
import { useState, useEffect } from "react";
import { SuccessToast } from "./SuccessToast";
import * as yup from "yup";

export interface RecipeFormData {
    title: string;
    ingredients: string[];
    instruction: string;
}

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    ingredients: yup.array().of(yup.string()).min(1, "You must have at least 1 ingredient"),
    instruction: yup.string().required("Instruction is required"),
});

export function RecipeForm({ onSave }: { onSave: (data: RecipeFormData) => void }) {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instruction, setInstruction] = useState("");
    const [created, setCreated] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!created) return;
        const timer = setTimeout(() => setCreated(false), 2000);
        return () => clearTimeout(timer);
    }, [created]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: RecipeFormData = {
            title,
            ingredients: ingredients.split(",").map((s) => s.trim()).filter(Boolean),
            instruction,
        };

        try {
            schema.validateSync(data, { abortEarly: false });
            setErrors({});
            onSave(data);
            setTitle("");
            setIngredients("");
            setInstruction("");
            setCreated(true);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setErrors(Object.fromEntries(err.inner.map((e) => [e.path, e.message])));
                console.log("Validation errors:", err.inner);
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <SuccessToast message="Recipe saved successfully!" visible={created} />
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="recipe-form" onSubmit={handleSubmit}>
                <p className="text-center text-gray-500 italic">no hook</p>
                <h1 className="text-2xl font-bold text-blue-500 text-center mb-6">FORM OF DOOM</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? "border-red-500" : ""}`}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Ingredients (comma separated)"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.ingredients ? "border-red-500" : ""}`}
                    />
                    {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients}</p>}
                </div>

                <div className="mb-4">
                    <textarea
                        placeholder="Instruction"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.instruction ? "border-red-500" : ""}`}
                    />
                    {errors.instruction && <p className="text-red-500 text-xs mt-1">{errors.instruction}</p>}
                </div>

                <input type="submit" value="Add Recipe" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" />
            </form>
        </div>
    );
}