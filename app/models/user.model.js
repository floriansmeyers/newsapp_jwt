module.exports = mongoose => {
  const User = mongoose.model(
    "User",
    mongoose.Schema(
      {
        FirstName: String,
        LastName: String,
        Email: String,
        Username: String,
        Password: String,
        RoleID: String
      },
      { timestamps: true }
    )
  );

  return User;
};