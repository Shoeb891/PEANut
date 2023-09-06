"use client"

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/Faculty/Logout')
            toast.success('Logout successful')
            router.push('/Faculty/Login')

        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)

        }
    }

    return (
        <button
            onClick={logout}
            className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
    )
}