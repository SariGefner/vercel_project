"use client"

import React, { useState, useCallback } from "react";
import { UserSchema } from '@/app/schemas/user.schema'
import FormState from "../types/formState";

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
            console.log("Validated data:", formState);
        }
    };

    return (
        <div>
            <h1>User Details</h1>
            <form>
                <h3>Personal Details</h3>

                <input
                    name="id"
                    placeholder="Id"
                    type="text"
                    value={formState.id.value}
                    onChange={handleChange}
                />
                {formState.id.error && <p>{formState.id.error}</p>}

                <input
                    name="firstName"
                    placeholder="First name"
                    type="text"
                    value={formState.firstName.value}
                    onChange={handleChange}
                />
                {formState.firstName.error && <p>{formState.firstName.error}</p>}

                <input
                    name="lestName"
                    placeholder="Last Name"
                    type="text"
                    value={formState.lestName.value}
                    onChange={handleChange}
                />
                {formState.lestName.error && <p>{formState.lestName.error}</p>}

                <input
                    name="birthDate"
                    type="date"
                    value={formState.birthDate.value}
                    onChange={handleChange}
                />
                {formState.birthDate.error && <p>{formState.birthDate.error}</p>}

                <h3>Contact Details</h3>
                <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={formState.email.value}
                    onChange={handleChange}
                />
                {formState.email.error && <p>{formState.email.error}</p>}

                <button type="submit" onClick={SaveDetails}>Save</button>
            </form>
        </div>
    );
};

export default Form;