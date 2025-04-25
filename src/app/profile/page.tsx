// Suggested code may be subject to a license. Learn more: ~LicenseLog:3737178826.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3535016254.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1164842551.
"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [username, setUsername] = useState("YourUsername");
  const [email, setEmail] = useState("your@email.com");
  const [bio, setBio] = useState("Your bio here...");
  const [profilePicture, setProfilePicture] = useState("/placeholder.jpg"); // Replace with actual image handling

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you'd handle file uploads here
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // In a real app, you'd upload the file and update the profilePicture state with the new URL
      setProfilePicture(URL.createObjectURL(file)); // temporary until real upload functionality
    }
  };

  const handleSave = () => {
    // Here you would send the data to your backend to update the user's profile
    console.log("Saving changes:", { username, email, bio, profilePicture });
    // Add logic to make the PUT API call and update the user data.
    alert("Changes saved!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Profile Picture */}
        <div>
          <div className="mb-4">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mx-auto"
            />
            <label
              htmlFor="profilePictureUpload"
              className="block mt-2 text-center text-blue-500 cursor-pointer"
            >
              Change Profile Picture
            </label>
            <input
              type="file"
              id="profilePictureUpload"
              className="hidden"
              onChange={handleProfilePictureChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Right side: User Information */}
        <div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input type="text" id="username" className="w-full border p-2" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input type="email" id="email" className="w-full border p-2" value={email} onChange={handleEmailChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block mb-1">
              Bio
            </label>
            <textarea id="bio" className="w-full border p-2" value={bio} onChange={handleBioChange} />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
