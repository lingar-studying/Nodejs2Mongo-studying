module.exports = class Product {
  constructor(
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    images,
    thumbnail
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.discountPercentage = discountPercentage;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.images = images;
    this.thumbnail = thumbnail;
  }
};
