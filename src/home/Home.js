import AgricultureImage from "./img.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

const Home = () => {
    return (
        <div className="home-container">
            {/*<img src={AgricultureImage} alt="Agriculture" className="background-img" />*/}
            <div className="overlay">
                <div className="container">
                    <h1 className="company-name">AgriSupport Ltd.</h1>
                    <p className="tagline">Empowering Farmers, Strengthening Communities</p>

                    <div className="company-info">
                        <h2 className="display-4">About Us</h2>
                        <p>
                            AgriSupport Ltd. is dedicated to providing farmers with the support they need to
                            succeed. We partner with agricultural companies and government programs to ensure
                            that farmers receive the best products, guidance, and financial aid.
                        </p>

                        <h2 className="display-4">Our Mission</h2>
                        <p>
                            We strive to create a sustainable agricultural ecosystem where every farmer has
                            access to quality seeds, fertilizers, and resources to boost productivity and
                            improve livelihoods.
                        </p>

                        <h2 className="display-4">How It Works</h2>
                        <p>
                            Farmers submit their credentials to our company for verification. Once approved,
                            they receive agricultural products such as seeds, fertilizers, and other necessary
                            farming materials. Our system ensures transparency, fairness, and efficiency in
                            product allocation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;