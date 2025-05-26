import { Container } from "react-bootstrap";

function Footer() {
  return (
    <Container fluid className="bg-info   text-dark bg-opacity-50">
      <p className=" p-3 ps-4">
        Creato da Federico Brunetti. <br /> Api fornite da Open Weather maps. Le immagini dei personaggi appartengono alla Warner Bros. Le icone delle immagini
        sono gratuite.
      </p>
    </Container>
  );
}

export default Footer;
