const port = 4010;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Kết nối db mongodb
mongoose.connect(
  "mongodb+srv://cloneswe:chien123456789@cluster0.jgbzzce.mongodb.net/"
);
// API test
app.get("/", (req, res) => {
  res.send("Express app đang chạy");
});

// Storage engine cho multer
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint upload hình
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema cho sản phẩm
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
});

// Endpoint thêm sản phẩm
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    quantity: req.body.quantity,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// Endpoint xóa sản phẩm
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// API lấy tất cả sản phẩm
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

// Schema cho user
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
    default: {}, // Ensure cartData is always initialized as an empty object
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Endpoint cho user đăng ký
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "trung email" });
  }
  // tạo một đối tượng cart để đại diện cho giỏ hàng của người dùng. Ở đây, một vòng lặp được sử dụng để khởi tạo giỏ hàng với 300 sản phẩm, mỗi sản phẩm có số lượng là 0.
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// Endpoint cho user đăng nhập
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Sai mật khẩu" });
    }
  } else {
    res.json({ success: false, errors: "Sai email" });
  }
});

// Endpoint cho new collection data
app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New collection fetched");
  res.send(newcollection);
});

// Middleware để fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Vui lòng cung cấp token hợp lệ" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).send({ errors: "Token không hợp lệ" });
    }
  }
};

// Endpoint thêm sản phẩm vào cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (!userData) {
    return res
      .status(404)
      .json({ success: false, message: "Không tìm thấy người dùng" });
  }
  userData.cartData[req.body.itemId] =
    (userData.cartData[req.body.itemId] || 0) + 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

// Endpoint xóa sản phẩm khỏi cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (!userData) {
    return res
      .status(404)
      .json({ success: false, message: "Không tìm thấy người dùng" });
  }
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

// Endpoint lấy cart item
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
// Endpoint để cập nhật giá sản phẩm
app.post("/updateproductprice", async (req, res) => {
  const { id, field, value } = req.body;

  try {
    const product = await Product.findOne({ id });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    product[field] = value;
    await product.save();

    res.json({ success: true, message: "Cập nhật giá sản phẩm thành công" });
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật giá sản phẩm:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
});

// Schema cho Order
const Order = mongoose.model("Order", {
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: String,
      quantity: Number,
      price: Number,
    },
  ],
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Endpoint để xử lý mua hàng
app.post("/purchase", fetchUser, async (req, res) => {
  const { items, phoneNumber, address } = req.body;
  const userId = req.user.id;

  if (!phoneNumber || !address) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng cung cấp số điện thoại và địa chỉ",
    });
  }

  try {
    // Bắt đầu một phiên giao dịch
    const session = await mongoose.startSession();
    session.startTransaction();

    // Lưu đơn hàng vào cơ sở dữ liệu
    const order = new Order({
      userId,
      items,
      phoneNumber,
      address,
    });
    await order.save({ session });

    // Cập nhật số lượng sản phẩm trong kho
    for (const item of items) {
      const product = await Product.findOne({ id: item.productId }).session(
        session
      );
      if (product) {
        if (product.quantity >= item.quantity) {
          product.quantity -= item.quantity;
          product.sold += item.quantity; // Cập nhật số lượng đã bán
          await product.save({ session });
        } else {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: `Không đủ số lượng cho sản phẩm ID ${item.productId}`,
          });
        }
      } else {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy sản phẩm với ID ${item.productId}`,
        });
      }
    }

    // Commit giao dịch
    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: "Mua hàng thành công!" });
  } catch (error) {
    console.error("Lỗi trong quá trình mua hàng:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
});

// Endpoint để cập nhật số lượng sản phẩm sau khi thêm vào giỏ hàng
app.post("/updateproductquantity", async (req, res) => {
  const { productId, quantityToUpdate } = req.body;

  try {
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    product.quantity -= quantityToUpdate;
    await product.save();

    res.json({
      success: true,
      message: "Cập nhật số lượng sản phẩm thành công",
    });
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật số lượng sản phẩm:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ nội bộ",
    });
  }
});
// Endpoint để lấy sản phẩm bán nhiều nhất
app.get("/bestsellers", async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ sold: -1 }).limit(10);
    res.json(bestSellers);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm bán chạy nhất:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
});

// Endpoint để cập nhật số lượng sản phẩm đã bán
app.post("/updateproductsold/:productId", async (req, res) => {
  const { productId } = req.params;
  const { sold } = req.body;

  try {
    await Product.findOneAndUpdate({ id: productId }, { sold: sold });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating sold:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Endpoint để lấy danh sách đơn hàng
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 }); // Sắp xếp theo ngày giảm dần để lấy đơn hàng mới nhất đầu tiên
    res.json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
});
// Endpoint để xóa đơn hàng
app.post("/removeorder", async (req, res) => {
  const { orderId } = req.body;

  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId });

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    res.json({
      success: true,
      message: "Đơn hàng đã được xóa thành công",
      orderId: deletedOrder._id,
    });
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ nội bộ",
    });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Kết nối chạy ở port " + port);
  } else {
    console.log("Error chưa kết nối" + error);
  }
});
