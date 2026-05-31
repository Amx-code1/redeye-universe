"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";


export default function ProfileSetup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .insert({
        user_id: user.id,
        full_name: name,
        username,
        age: Number(age),
        gender,
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Profile created!");
    window.location.href = "/profile";
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Complete Profile
      </h1>

      <div className="space-y-4 max-w-xl">
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        >
          <option value="">
            Select Gender
          </option>

          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <button
          onClick={saveProfile}
          className="rounded-xl bg-red-600 px-6 py-3"
        >
          Save Profile
        </button>
      </div>
    </main>
  );
}