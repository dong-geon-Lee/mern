const express = require("express");
const router = express.Router();
const Snippet = require("../models/snippetModel");

router.get("/", async (req, res) => {
  try {
    const snippets = await Snippet.find();

    res.json(snippets);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code } = req.body;

    if (!description && !code) {
      return res.json({
        errorMessage: "You need to enter at least a some code.",
      });
    }

    const newSnippet = new Snippet({
      title,
      description,
      code,
    });

    const savedSnippet = await newSnippet.save();

    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
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

  originalSnippet.title = title;
  originalSnippet.description = description;
  originalSnippet.code = code;

  const savedSnippet = await originalSnippet.save();

  res.json(savedSnippet);
});

router.delete("/:id", async (req, res) => {
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

    await exisitingSnippet.delete();

    res.json(exisitingSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
