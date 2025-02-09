const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = IdleDeadline;
  }

  save() {
    const db = getDb();
    db.collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.Console.log(err);
      });
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex((cp) => {
      return cp._id === product._id;
    });
    product.quantity = 1;
    const updatedCart = { items: [product] };
    const db = getDb();
    db.collection("users").updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId !== productId.toString();
    });
    const db = getDb();
    db.collection("users").updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      { $set: { cart: { items: updatedCartItems } } }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
