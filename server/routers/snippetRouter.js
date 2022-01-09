const express = require("express");
const router = express.Router();
const Snippet = require("../models/snippetModel");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user });

    res.json(snippets);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, code } = req.body;

    // validation
    if (!description && !code) {
      return res.json({
        errorMessage: "You need to enter at least a some code.",
      });
    }

    const newSnippet = new Snippet({
      title,
      description,
      code,
      user: req.user,
    });

    const savedSnippet = await newSnippet.save();

    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, description, code } = req.body;
  const snippetId = req.params.id;

  if (!description && !code) {
    return res.json({
      errorMessage: "You need to enter at least a some code.",
    });
  }

  if (!snippetId) {
    return res.json({
      errorMessage: "Snippet ID not given. ",
    });
  }

  const originalSnippet = await Snippet.findById(snippetId);

  if (!originalSnippet) {
    return res.json({
      errorMessage: "No Snippet with this ID was found. ",
    });
  }

  if (originalSnippet.user.toString() !== req.user) {
    return res.status(401).json({ errorMessage: "Unauthorized." });
  }

  originalSnippet.title = title;
  originalSnippet.description = description;
  originalSnippet.code = code;

  const savedSnippet = await originalSnippet.save();

  res.json(savedSnippet);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const snippetId = req.params.id;

    if (!snippetId) {
      return res.json({
        errorMessage: "Snippet ID not given. ",
      });
    }

    const exisitingSnippet = await Snippet.findById(snippetId);

    if (!exisitingSnippet) {
      return res.json({
        errorMessage: "No Snippet with this ID was found. ",
      });
    }

    if (exisitingSnippet.user.toString() !== req.user) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    await exisitingSnippet.delete();

    res.json(exisitingSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
