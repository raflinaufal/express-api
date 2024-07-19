import * as profileService from "../services/profileService.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.render("list", {
      title: "Manage Profiles",
      entities: profiles,
      entityType: "profile",
      fields: ["id", "fullName", "address", "image"],
      newEntityUrl: "/profiles/new",
      editEntityUrl: "/profiles",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const createProfile = async (req, res) => {
  try {
    await profileService.createProfile(req.body);
    res.redirect("/profiles");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    await profileService.updateProfile({ ...req.body, id: req.params.id });
    res.redirect("/profiles");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update profile" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await profileService.deleteProfile(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to delete profile" });
  }
};
