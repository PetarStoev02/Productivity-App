"use client";

import { AccountForm } from "@/components/account/AccountForm";
import { ProfileImage } from "@/components/account/ProfileImage";

export default function AccountPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <div className="space-y-6">
        <ProfileImage />
        <AccountForm />
      </div>
    </div>
  );
}