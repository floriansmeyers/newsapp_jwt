module.exports = mongoose => {
  const Role = mongoose.model(
    "Role",
    mongoose.Schema(
      {
        Name: String
      },
      { timestamps: true }
    )
  );

  return Role;
};