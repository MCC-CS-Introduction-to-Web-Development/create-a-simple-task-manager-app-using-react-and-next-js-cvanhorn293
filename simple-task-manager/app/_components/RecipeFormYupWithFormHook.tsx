"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SuccessToast } from "./SuccessToast";
import * as yup from "yup";

export interface RecipeFormData2 {
    title: string;
    ingredients: string;
    instruction: string;
}

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    ingredients: yup.string().required("Ingredients are required"),
    instruction: yup.string().required("Instruction is required"),
});

export function RecipeFormWithHook({ onSave }: { onSave: (data: RecipeFormData2) => void }) {
    const [created, setCreated] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RecipeFormData2>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!created) return;
        const timer = setTimeout(() => setCreated(false), 2000);
        return () => clearTimeout(timer);
    }, [created]);

    const onSubmit = (data: RecipeFormData2) => {
        onSave(data);
        reset();
        setCreated(true);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <SuccessToast message="Recipe saved successfully!" visible={created} />
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="recipe-form" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-center text-gray-500 italic">with hook</p>
                <h1 className="text-2xl font-bold text-blue-500 text-center mb-6">FORM OF DOOM</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("title")}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? "border-red-500" : ""}`}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Ingredients (comma separated)"
                        {...register("ingredients")}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.ingredients ? "border-red-500" : ""}`}
                    />
                    {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients.message}</p>}
                </div>

                <div className="mb-4">
                    <textarea
                        placeholder="Instruction"
                        {...register("instruction")}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.instruction ? "border-red-500" : ""}`}
                    />
                    {errors.instruction && <p className="text-red-500 text-xs mt-1">{errors.instruction.message}</p>}
                </div>

                <input type="submit" value="Add Recipe" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" />
            </form>
        </div>
    );
}