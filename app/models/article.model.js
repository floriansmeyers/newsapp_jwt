module.exports = mongoose => {
  const Article = mongoose.model(
    "Article",
    mongoose.Schema(
      {
        Title: String,
		SubTitle: String,
		ShortSummary: String,
		Body: String,
		TagID: String,
		UserID: String,
		ArticleStatusID: String
      },
      { timestamps: true }
    )
  );

  return Article;
};