const ex = require("express");
const pr = require("./products");
const gm = require("./games");
const ad = require("./address.js");
const cors = require("cors");

const app = ex();
const p = pr.products;
const g = gm.games;
const a = ad.address;

app.use(ex.json());
app.use(cors());

app.get("/api/product", (req, res) => {
  res.send(p);
});

app.get("/api/games", (req, res) => {
  res.send(g);
});

app.get("/api/product/:id", (req, res) => {
  let products = false;
  for (let i = 0; i < p.length; i++) {
    if (p[i].id == Number(req.params.id)) {
      products = p[i];
      break;
    }
  }
});

app.get("/api/games/:id", (req, res) => {
  let games = false;
  for (let i = 0; i < g.length; i++) {
    if (g[i].id == Number(req.params.id)) {
      games = g[i];
      break;
    }
  }
});

//get - address
app.get("/api/address", (req, res) => {
  res.send(a);
});

app.get("/api/address/:id", (req, res) => {
  let address = false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].address_id == Number(req.params.id)) {
      address = a[i];
      break;
    }
  }

  if (address) {
    res.send(address);
    console.log(address);
  } else {
    let err = "Address not found!";
    res.status(404);
    res.send(err);
    console.error(err);
  }
});

//
//
// NEW ADDRESS
app.put("/api/address", (req, res) => {
  let new_address = {
    address_id: a.length,
    city: req.body.city,
    barangay: req.body.barangay,
    street: req.body.street,
    rec_name: req.body.rec_name,
    rec_mnumber: req.body.rec_mnumber,
  };

  console.log(new_address);
  a.push(new_address);
  res.send(new_address);
});
//
//
//UPDATE ADDRESS
app.put("/api/address/:id", (req, res) => {
  let address = false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].address_id == Number(req.params.id)) {
      address = a[i];
      break;
    }
  }

  if (address) {
    if (req.body.city) {
      address.city = req.body.city;
    }
    if (req.body.barangay) {
      address.barangay = req.body.barangay;
    }
    if (req.body.street) {
      address.street = req.body.street;
    }
    if (req.body.rec_name) {
      address.rec_name = req.body.rec_name;
    }
    if (req.body.rec_mnumber) {
      address.rec_mnumber = req.body.rec_mnumber;
    }
    console.log(address);
    res.send(address);
  } else {
    let err = "Address not found!";
    res.status(404);
    console.log(err);
    res.send(err);
  }
});
//
//
//DELETE ADDRESS
app.delete("/api/address/:id", (req, res) => {
  let address = false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].address_id == Number(req.params.id)) {
      address = a[i];
      break;
    }
  }

  if (address) {
    let index = a.indexOf(address);
    console.log(address);
    // a[index] = {};
    a.splice(index, 1);
    console.log("Deleted address_id: " + address.address_id);
    res.send(address);
  } else {
    let err = "Address not found!";
    res.status(404);
    console.log(err);
    res.send(err);
  }
});

let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
