exports.validateProduct = (product) => {
  if (
    !product.title ||
    !product.description ||
    !product.category ||
    !product.price ||
    !product.discountPercentage ||
    !product.rating ||
    !product.stock ||
    !product.brand ||
    !product.images ||
    !product.thumbnail
  ) {
    return false;
  }
  if (
    typeof product.title !== "string" ||
    typeof product.description !== "string" ||
    typeof product.category !== "string" ||
    typeof product.price !== "number" ||
    typeof product.discountPercentage !== "number" ||
    typeof product.rating !== "number" ||
    typeof product.stock !== "number" ||
    typeof product.brand !== "string" ||
    !Array.isArray(product.images) ||
    typeof product.thumbnail !== "string"
  ) {
    return false;
  }
  return true;
};

exports.validateUser = (user) => {
  if (!user.name || !user.email || !user.password) return false;
  if (
    typeof user.name !== "string" ||
    typeof user.email !== "string" ||
    typeof user.password !== "string"
  )
    return false;
  return true;
};
