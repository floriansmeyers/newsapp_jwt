module.exports = mongoose => {
  const Tag = mongoose.model(
    "Tag",
    mongoose.Schema(
      {
        Name: String
      },
      { timestamps: true }
    )
  );

  return Tag;
};