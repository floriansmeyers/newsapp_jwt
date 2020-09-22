module.exports = mongoose => {
  const ArticleStatus = mongoose.model(
    "ArticleStatus",
    mongoose.Schema(
      {
        Name: String
      },
      { timestamps: true }
    )
  );

  return ArticleStatus;
};