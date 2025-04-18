import HighlightedText from "../Homepage/HighlightedText";

const Quote = () =>{

    return(
        <div className=" text-4xl font-semibold  text-white">
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlightedText>combines technology</HighlightedText>
            <span className=" text-caribbeangreen-300">{" "} expertise</span>
            and community to create an
            <span className="text-blue-500">unparalleled educational experience.</span>
        </div>
    )
}

export default Quote;
