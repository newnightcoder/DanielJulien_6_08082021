import Sauce from "../models/Sauce.js";

export const getAll = async (req, res) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getOne = async (req, res) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    console.log("findOne sauce", sauce);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const addSauce = async (req, res) => {
  try {
    const sauce = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
    console.log("file", req.file);
    const newSauce = await Sauce.create(sauce);
    console.log("sauce ajoutée", newSauce);
    res.status(201).json({ message: "Nouvelle sauce ajoutée avec succès!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateSauce = async (req, res) => {
  const sauceObject = req.file
    ? // to check if user modifies the image file or just the text (req.body)
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : req.body;

  console.log("req.body", req.body);

  try {
    await Sauce.updateOne({ _id: req.params.id }, sauceObject);
    res.status(200).json({ message: "Sauce modifiée avec succès!" });
  } catch (error) {
    console.log("erreur update", error.message);
    res.status(500).json({ error });
  }
};

export const deleteSauce = async (req, res) => {
  try {
    await Sauce.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Sauce supprimée!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
