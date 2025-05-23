import cloud1 from "/assets/cloud1.png";
import cloud2 from "../assets/cloud2.png";
import cloud3 from "../assets/cloud3.png";
import "..css/Clouds.css";

function Clouds() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="clouds-container">
      <img src={cloud1} className="cloud cloud1" alt="nuvola 1" />
      <img src={cloud2} className="cloud cloud2" alt="nuvola 2" />
      <img src={cloud3} className="cloud cloud3" alt="nuvola 3" />
    </div>
  );
}
export default Clouds;
