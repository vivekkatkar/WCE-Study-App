import HighlightedText from "../components/core/Homepage/HighlightedText";
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from '../assets/Images/FoundingStory.png';
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/AboutPage/ContactForm";
import ReviewSlider from "../components/core/Homepage/ReviewSlider";
import Footer from "../components/common/Footer";

const AboutUs = () => {
    return (
        <div className="">
            <div className="max-w-screen-xl mx-auto">
                {/* Sec1 */}
                <section className="flex flex-col gap-6 mt-16 md:mt-24 lg:mt-32">
                    <header className="text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold">
                            Driving Innovation in Online Education for a <HighlightedText>Brighter Future</HighlightedText>
                        </h1>
                        <p className="text-white mt-4 md:mt-6 text-base md:text-lg">
                            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <img src={BannerImage1} className="w-full md:w-1/3 lg:w-1/4 object-cover rounded-lg" alt="Banner 1"/>
                        <img src={BannerImage2} className="w-full md:w-1/3 lg:w-1/4 object-cover rounded-lg" alt="Banner 2"/>
                        <img src={BannerImage3} className="w-full md:w-1/3 lg:w-1/4 object-cover rounded-lg" alt="Banner 3"/>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="my-16">
                    <Quote />
                </section>

                {/* Section 3 */}
                <section className="text-richblack-50 mt-14">
                    <div className="flex flex-col gap-8">
                        {/* 1 box */}
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 justify-between items-center">
                            <div className="w-full lg:w-1/2">
                                <h2 className="text-2xl font-semibold">Our Founding Story</h2>
                                <div className="mt-4">
                                    <p className="mb-4">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                                    <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <img src={FoundingStory} className="w-full h-auto object-cover rounded-lg" alt="Founding Story" />
                            </div>
                        </div>

                        {/* 2 box */}
                        <div className="flex flex-col md:flex-row gap-8 mt-12">
                            {/* Left Box */}
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">Our Vision</h2>
                                <p className="mt-2">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                            </div>
                            {/* Right Box */}
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">Our Mission</h2>
                                <p className="mt-2">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="my-16">
                    <StatsComponent />
                </section>

                {/* Section 5 */}
                <section className="flex flex-col gap-16 my-16">
                    <LearningGrid />
                    <ContactForm />
                </section>

                {/* Reviews and Ratings */}
                <section className="my-16">
                    <h2 className="text-center text-2xl font-semibold text-richblack-50">Reviews and Ratings</h2>
                    <ReviewSlider />
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
