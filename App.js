
import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orderType, setOrderType] = useState("Online"); // Online or Dine-in
  const [tableNumber, setTableNumber] = useState("");

  const carouselImages = [
    "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg",
    "https://www.themealdb.com/images/media/meals/1529444830.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Menu and specials
  const menu = {
    "Main Course": [
      { name: "Chicken Biryani", price: 150, calories: 450, vegetarian: false, image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg", type: "Main" },
      { name: "Paneer Butter Masala", price: 120, calories: 350, vegetarian: true, image: "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg", type: "Main" },
      { name: "Veg Pulao", price: 100, calories: 300, vegetarian: true, image: "https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg", type: "Main" },
    ],
    Desserts: [
      { name: "Gulab Jamun", price: 70, calories: 150, vegetarian: true, image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg", type: "Dessert" },
      { name: "Ice Cream", price: 60, calories: 200, vegetarian: true, image: "https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg", type: "Dessert" },
    ],
    Beverages: [
      { name: "Cold Coffee", price: 50, calories: 120, vegetarian: true, image: "https://www.themealdb.com/images/media/meals/ytpstt1511814614.jpg", type: "Beverage" },
      { name: "Lassi", price: 40, calories: 100, vegetarian: true, image: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg", type: "Beverage" },
    ],
  };

  const specials = [
    { name: "Hyderabadi Dum Biryani", price: 180, calories: 500, image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg", type: "Main" },
    { name: "Butter Naan with Curry", price: 130, calories: 400, image: "https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg", type: "Main" },
    { name: "Paneer Tikka", price: 140, calories: 350, image: "https://www.themealdb.com/images/media/meals/uwxvrr1511723488.jpg", type: "Main" },
  ];

  // Preferences with cost
  const preferenceOptions = {
    Main: [
      { name: "Extra Spice", price: 10 },
      { name: "Less Salt", price: 0 },
      { name: "Extra Gravy", price: 20 },
      { name: "Add Raita", price: 30 },
      { name: "Extra Cheese", price: 25 },
    ],
    Dessert: [
      { name: "Add Topping", price: 15 },
      { name: "Extra Syrup", price: 10 },
      { name: "Double Scoop", price: 30 },
    ],
    Beverage: [
      { name: "Less Sugar", price: 0 },
      { name: "Extra Ice", price: 0 },
      { name: "Add Milk", price: 20 },
    ],
  };

  const addToOrder = (item) => {
    const newItem = { ...item, preferences: [] };
    setOrders([...orders, newItem]);
    alert(`${item.name} added to cart ✅`);
  };

  const getTotal = () => {
    return orders.reduce((total, item) => {
      const prefCost = item.preferences.reduce((pTotal, p) => pTotal + p.price, 0);
      return total + item.price + prefCost;
    }, 0);
  };

  if (!user) {
    return (
      <div style={styles.loginBg}>
        <div style={styles.authCard}>
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          <input type="text" placeholder="Username" id="username" style={styles.input} />
          {isSignup && <input type="email" placeholder="Email" id="email" style={styles.input} />}
          <input type="password" placeholder="Password" id="password" style={styles.input} />
          <button
            style={styles.btnPrimary}
            onClick={() => {
              const username = document.getElementById("username").value;
              const password = document.getElementById("password").value;
              if (username.trim() === "" || password.trim() === "") {
                alert("Please fill all fields!");
                return;
              }
              setUser(username);
            }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
          <p style={{ marginTop: "10px" }}>
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span style={styles.link} onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (page === "home") {
      return (
        <div style={styles.homePage}>
          <h1>Welcome to Smart Canteen 🍽️</h1>
          <p>Order your favorite meals online or enjoy dining in!</p>
          <div style={styles.carousel}>
            <img src={carouselImages[currentIndex]} alt="Food Slide" style={styles.foodImage} />
          </div>
          <div>
            <label>
              <input type="radio" name="orderType" checked={orderType==="Online"} onChange={() => setOrderType("Online")} /> Online Order
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input type="radio" name="orderType" checked={orderType==="Dine-in"} onChange={() => setOrderType("Dine-in")} /> Dine-in
            </label>
            {orderType==="Dine-in" && (
              <input
                type="number"
                placeholder="Table Number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                style={{ marginLeft: "10px", padding: "5px" }}
              />
            )}
          </div>
        </div>
      );
    }

    if (page === "menu") {
      return (
        <div>
          <h2 style={styles.sectionTitle}>Menu</h2>
          {Object.keys(menu).map((category) => (
            <div key={category}>
              <h3>{category}</h3>
              <div style={styles.cards}>
                {menu[category].map((item, i) => (
                  <div key={i} style={styles.card}>
                    <img src={item.image} alt={item.name} style={styles.foodImg} />
                    <h4>{item.name}</h4>
                    <p>₹{item.price} | {item.calories} cal</p>
                    <button style={styles.btnSecondary} onClick={() => addToOrder(item)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (page === "specials") {
      return (
        <div>
          <h2 style={styles.sectionTitle}>Today's Specials</h2>
          <div style={styles.cards}>
            {specials.map((item, i) => (
              <div key={i} style={styles.card}>
                <img src={item.image} alt={item.name} style={styles.foodImg} />
                <h4>{item.name}</h4>
                <p>₹{item.price} | {item.calories} cal</p>
                <button style={styles.btnSecondary} onClick={() => addToOrder(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (page === "preferences") {
      return (
        <div>
          <h2>Preferences</h2>
          {orders.length === 0 ? <p>No items in cart.</p> :
            orders.map((item, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <h4>{item.name}</h4>
                {preferenceOptions[item.type].map((pref) => (
                  <label key={pref.name} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      checked={item.preferences.some(p => p.name === pref.name)}
                      onChange={() => {
                        const newOrders = [...orders];
                        if (newOrders[i].preferences.some(p => p.name === pref.name)) {
                          newOrders[i].preferences = newOrders[i].preferences.filter(p => p.name !== pref.name);
                        } else {
                          newOrders[i].preferences.push(pref);
                        }
                        setOrders(newOrders);
                      }}
                    /> {pref.name} (+₹{pref.price})
                  </label>
                ))}
              </div>
            ))
          }
        </div>
      );
    }

    if (page === "nutrition") {
      return (
        <div>
          <h2>Nutrition Info</h2>
          {orders.length === 0 ? <p>No items in cart.</p> :
            orders.map((item, i) => (
              <p key={i}>{item.name}: {item.calories} cal</p>
            ))
          }
        </div>
      );
    }

    if (page === "orders") {
      return (
        <div>
          <h2>My Orders ({orderType})</h2>
          {orders.length === 0 ? <p>No items in cart.</p> :
            orders.map((item, i) => (
              <div key={i}>
                <strong>{item.name}</strong> - ₹{item.price}
                {item.preferences.length > 0 && (
                  <ul>
                    {item.preferences.map((p, idx) => (
                      <li key={idx}>{p.name} (+₹{p.price})</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          }
          <h3>Total: ₹{getTotal()}</h3>

          {orders.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              {orderType === "Online" ? (
                <>
                  <h3>Payment Options</h3>
                  <label><input type="radio" name="payment" onChange={() => setPaymentMethod("Cash on Delivery")} /> Cash on Delivery</label><br />
                  <label><input type="radio" name="payment" onChange={() => setPaymentMethod("UPI/PhonePe")} /> UPI/PhonePe</label><br />
                  {paymentMethod && (
                    <>
                      <p>Selected Payment: {paymentMethod}</p>
                      <button
                        style={styles.btnPrimary}
                        onClick={() => {
                          alert(`Payment successful via ${paymentMethod}!`);
                          setOrders([]);
                          setPaymentMethod("");
                          setPage("home");
                        }}
                      >
                        Confirm Payment
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h3>Dine-in Payment</h3>
                  {!paymentMethod ? (
                    <button
                      style={styles.btnPrimary}
                      onClick={() => setPaymentMethod("QR/UPI")}
                    >
                      Pay via QR/UPI
                    </button>
                  ) : (
                    <>
                      <p>Scan the QR code to pay for Table {tableNumber}</p>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/QR_code_for_mobile_English_Wikipedia.svg/240px-QR_code_for_mobile_English_Wikipedia.svg.png"
                        alt="QR Code"
                        style={{ width: "150px", margin: "10px 0" }}
                      />
                      <button
                        style={styles.btnPrimary}
                        onClick={() => {
                          alert(`Payment successful for Table ${tableNumber}!`);
                          setOrders([]);
                          setPaymentMethod("");
                          setPage("home");
                        }}
                      >
                        Confirm Payment
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.navbar}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("menu")}>Menu</button>
        <button onClick={() => setPage("specials")}>Today's Specials</button>
        <button onClick={() => setPage("orders")}>My Orders</button>
        <button onClick={() => setPage("preferences")}>Preferences</button>
        <button onClick={() => setPage("nutrition")}>Nutrition Info</button>
        <button onClick={() => setUser("")}>Logout</button>
      </div>
      <div style={{ padding: "20px" }}>{renderPage()}</div>
    </div>
  );
}

const styles = {
  app: { fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#fff5f5" },
  navbar: {
    background: "linear-gradient(90deg, #ff512f, #dd2476)",
    padding: "10px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  loginBg: {
    background: "url('https://img.freepik.com/free-photo/top-view-indian-food-frame_23-2148747718.jpg') no-repeat center center/cover",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  authCard: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
    width: "300px",
  },
  input: { width: "100%", padding: "10px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ccc" },
  btnPrimary: { padding: "10px 20px", background: "#ff512f", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px" },
  btnSecondary: { padding: "8px 12px", background: "#333", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
  link: { color: "#ff512f", cursor: "pointer" },
  homePage: { textAlign: "center" },
  carousel: { width: "100%", height: "300px", overflow: "hidden", borderRadius: "12px", margin: "20px 0" },
  foodImage: { width: "100%", height: "100%", objectFit: "cover", transition: "all 0.5s ease-in-out" },
  sectionTitle: { marginTop: "30px", marginBottom: "15px", color: "#ff512f" },
  cards: { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" },
  card: { border: "1px solid #ddd", padding: "15px", width: "200px", borderRadius: "10px", background: "white", textAlign: "center" },
  foodImg: { width: "100%", borderRadius: "8px" },
};
