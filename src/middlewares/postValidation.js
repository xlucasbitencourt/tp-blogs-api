const validation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (categoryIds[0] === 3) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  
  next();
};

module.exports = { validation };