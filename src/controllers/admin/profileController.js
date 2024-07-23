import * as profileService from "../../services/profileService.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.render("admin/profiles/list", {
      title: "Manage Profiles",
      content: "Manage Profiles",
      profiles,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const createProfile = async (req, res) => {
  try {
    const { fullName, address } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    await profileService.createProfile({ fullName, address, image });
    res.json({ success: true, message: "Profile created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, address } = req.body;
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.existingImage;

    await profileService.updateProfile({
      id: req.params.id,
      fullName,
      address,
      image,
    });
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update profile" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await profileService.deleteProfile(req.params.id);
    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete profile" });
  }
};
