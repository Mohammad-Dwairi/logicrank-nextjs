import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewPostInput from "./NewPostInput";
import NewsFeedSection from "./NewsFeedSection";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import LoadingView from "../../hoc/LoadingView";


const NewsFeedPage = props => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingView isLoading={isLoading}>
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col xl={7}>
                        <NewPostInput
                            onSubmitStart={() => setIsLoading(true)}
                            onSubmitFinish={() => setIsLoading(false)}
                        />
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col xl={7}>
                        <NewsFeedSection/>
                    </Col>
                </Row>
            </Container>
        </LoadingView>
    );
};

export default NewsFeedPage;