import { Container } from "react-bootstrap";

export const Projects = () => {
     const Projects = () => {

        const projects = [
          {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg1,
          },
          {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg2,
          },
          {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg3,
          },
          {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg1,
          },
          {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg2,
          },
          {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg3,
          },
        ];
  
    return ( 
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col>
                        <h2>Projects</>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
                    </Col>
                </Row>
            </Container>
        </section>
     );
}
 
 