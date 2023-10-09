import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";


export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setDeleting] = useState(false);
    const toRotate = ["web Developer", "web Designer", "UI/UX Designer"];
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(300 - Math.random() * 100 );
    const period = 200;

    useEffect(() => {
        let ticker = setInterval(() =>{
            ticker();
        },delta )
        return() => {clearInterval (ticker)};
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let upDatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text);

        setText(upDatedText);

        if(isDeleting) {
            setDelta(prevDelta => prevDelta  / 2)
        }

        if(!isDeleting && upDatedText === fullText) {
            setDeleting(true);
            setDelta(period);
        } else if (isDeleting && upDatedText === '') {
            setDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

 return (
    <section className="banner"id="home" >
        <Container>
            <Row  className="align-items-center">
              <Col xs={12} md={6} xl={7}>
                <span className="tagline"> Welcome to my portfolio</span>
                <h1>{'Hi! Im a webcoded '}<span className="wrap">{text} web developer </span></h1>
                <p>Lorem impsun jne. </p>
                <button onClick={() => console.log("connect")}> Let's connect <ArrowRightCircle size={25}></ArrowRightCircle> 
                </button>
              </Col>
              <Col xs={12} md={6} xl={5}>
                <img src={headerImg} alt="Header Img"></img>
              </Col>
            </Row>
        </Container>
     </section>
    )
}