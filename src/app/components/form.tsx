"use client";

import React, { useState, useCallback } from "react";
import { UserSchema } from '@/app/schemas/user.schema';

interface FormField {
    value: string;
    error: string;
}

interface FormState {
    id: FormField;
    firstName: FormField;
    lestName: FormField;
    birthDate: FormField;
    email: FormField;
}

const Form = () => {
    const [formState, setFormState] = useState<FormState>({
        id: { value: "", error: "" },
        firstName: { value: "", error: "" },
        lestName: { value: "", error: "" },
        birthDate: { value: "", error: "" },
        email: { value: "", error: "" },
    });

    const validateForm = useCallback(() => {
        const dataToValidate = {
            id: formState.id.value,
            firstName: formState.firstName.value,
            lestName: formState.lestName.value,
            birthDate: new Date(formState.birthDate.value),
            email: formState.email.value,
        };

        const result = UserSchema.safeParse(dataToValidate);

        if (!result.success) {
            const newFormState: FormState = { ...formState };
            result.error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    newFormState[err.path[0] as keyof FormState].error = err.message;
                }
            });
            setFormState(newFormState);
            return false;
        } else {
            const newFormState: FormState = { ...formState };
            Object.keys(newFormState).forEach((key) => {
                newFormState[key as keyof FormState].error = "";
            });
            setFormState(newFormState);
            return true;
        }
    }, [formState]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: { value, error: "" },
        }));
    };

    const SaveDetails = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            alert('the data is get seccessfully!')
            console.log("Validated data:", formState);
            
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">User Details</h1>

            <form onSubmit={SaveDetails} className="space-y-6">
                {/* Personal Details */}
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <div>
                    <input
                        name="id"
                        placeholder="Id"
                        type="text"
                        value={formState.id.value}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formState.id.error && <p className="text-red-600 text-sm">{formState.id.error}</p>}
                </div>

                <div>
                    <input
                        name="firstName"
                        placeholder="First name"
                        type="text"
                        value={formState.firstName.value}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formState.firstName.error && <p className="text-red-600 text-sm">{formState.firstName.error}</p>}
                </div>

                <div>
                    <input
                        name="lestName"
                        placeholder="Last Name"
                        type="text"
                        value={formState.lestName.value}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formState.lestName.error && <p className="text-red-600 text-sm">{formState.lestName.error}</p>}
                </div>

                <div>
                    <input
                        name="birthDate"
                        type="date"
                        value={formState.birthDate.value}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formState.birthDate.error && <p className="text-red-600 text-sm">{formState.birthDate.error}</p>}
                </div>

                {/* Contact Details */}
                <h3 className="text-lg font-semibold">Contact Details</h3>
                <div>
                    <input
                        name="email"
                        placeholder="Email"
                        type="text"
                        value={formState.email.value}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formState.email.error && <p className="text-red-600 text-sm">{formState.email.error}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Form;
