// import Carousel from "react-grid-carousel";
import GlobalContext from "../Hooks/GlobalContext";
import { useContext } from "react";
import Layout from "../Components/Layout";
import storeImage from "../images/store.jpg";
import Product from "../Components/Product";

const Home = () => {
  const { storeProducts } = useContext(GlobalContext);

  return (
    <div>
      <Layout>
        <div className="w-100">
          <div className="position-relative">
            <img
              src={storeImage}
              alt="store"
              style={{
                height: "300px",
                width: "100vw",
                objectFit: "cover",
              }}
            />
            <h1
              style={{
                position: "absolute",
                top: "40%",
                left: "35%",
                color: "white",
                backgroundColor: "rgba(13,113,172,0.7)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              Shop online with confident...
            </h1>
          </div>
          <div className="container ">
            <h3 className="pt-5">
              Featured Products (15% Discount and more!!!)
            </h3>
            <div className="row">
              {storeProducts.map((el) =>
                el.discountPercentage >= 15 ? (
                  <Product {...el} sender="main" key={el.id} />
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
