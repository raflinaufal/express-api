import * as profileService from "../services/profileService.js";

export const getProfile = async (req, res) => {
  const profile = await profileService.getProfile(req.userId);
  res.json(profile);
};

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
    res.status(400).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { fullName, address, image } = req.body;

  try {
    const profile = await profileService.updateProfile(userId, {
      fullName,
      address,
      image,
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    await profileService.deleteProfile(userId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
