import * as profileService from "../../services/profileService.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.render("profiles/list", {
      title: "Manage Profiles",
      entities: profiles,
      entityType: "profile",
      fields: ["id", "fullName", "address", "image"],
      newEntityUrl: "/admin/profiles/new",
      editEntityUrl: "/admin/profiles",
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
    await profileService.createProfile(req.body);
    res.redirect("/admin/profiles");
  } catch (error) {
    res.status(400).json({ error: "Failed to create profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    await profileService.updateProfile({ ...req.body, id: req.params.id });
    res.redirect("/admin/profiles");
  } catch (error) {
    res.status(400).json({ error: "Failed to update profile" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await profileService.deleteProfile(req.params.id);
    res.redirect("/admin/profiles");
  } catch (error) {
    res.status(400).json({ error: "Failed to delete profile" });
  }
};
