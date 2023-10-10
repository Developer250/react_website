import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";

export const Projects = () => {
  const projectData = [
    {
      title: "Business Startup 1",
      description: "Design & Development 1",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup 2",
      description: "Design & Development 2",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup 3",
      description: "Design & Development 3",
      imgUrl: projImg3,
    },
    {
      title: "Business Startup 4",
      description: "Design & Development 4",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup 5",
      description: "Design & Development 5",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup 6",
      description: "Design & Development 6",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col>
            <h2>Projects</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            </p>
            <Tab.Container id="projects-tab" defaultActiveKey="first">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="first">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" disabled>
                    tab three
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    {projectData.map((project, index) => (
                      <Col key={index} sm={6} md={4}>
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          imgUrl={project.imgUrl}
                        />
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">Lorem Ipsum</Tab.Pane>
                <Tab.Pane eventKey="third">Lorem Ipsum</Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};
