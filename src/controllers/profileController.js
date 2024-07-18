import * as profileService from "../services/profileService.js";

// Mendapatkan semua profil
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
};

// Mendapatkan profil berdasarkan ID
export const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await profileService.getProfileById(id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Membuat profil baru
export const createProfile = async (req, res) => {
  const { fullName, address, image, userId } = req.body;
  try {
    const profile = await profileService.createProfile({
      fullName,
      address,
      image,
      userId,
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: "Failed to create profile" });
  }
};

// Memperbarui profil
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { fullName, address, image } = req.body;
  try {
    const profile = await profileService.updateProfile({
      id,
      fullName,
      address,
      image,
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: "Failed to update profile" });
  }
};

// Menghapus profil
export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    await profileService.deleteProfile(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete profile" });
  }
};
