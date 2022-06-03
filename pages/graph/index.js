import {withProtected} from "../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import GraphCanvas from "../../components/graph-page/GraphCanvas";
import GraphPageHeader from "../../components/graph-page/GraphPageHeader";
import AppModal from "../../components/shared/AppModal";
import ModalContentWrapper from "../../components/shared/ModalContentWrapper";
import {useState} from "react";
import NewNodeForm from "../../components/graph-page/NewNodeForm";

const GraphVisualizerPage = ({roadmap, onAddNodeFinish, title, direction}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [graph, setGraph] = useState(roadmap || {nodes: [], edges: []});

    const newNodeHandler = async (node) => {
        const updatedGraph = {...graph};
        let nodes = [{id: node.id, text: node.text}];

        if (updatedGraph.nodes) {
            nodes = [...nodes, ...graph.nodes];
        }

        let edges = [];

        if (updatedGraph.edges) {
            edges = [...updatedGraph.edges];
        }

        node.parentNodes.forEach(parentNode => edges.push({
            id: `${parentNode.id}-${node.id}`,
            from: parentNode.id,
            to: node.id
        }));

        node.childNodes.forEach(childNode => edges.push({
            id: `${node.id}-${childNode.id}`,
            from: node.id,
            to: childNode.id
        }));

        updatedGraph.nodes = nodes;
        updatedGraph.edges = edges;
        setGraph(updatedGraph);
        setIsModalOpen(false);
        onAddNodeFinish && await onAddNodeFinish(updatedGraph);
    };

    return (
        <div>
            <Container>
                <GraphPageHeader onClick={() => setIsModalOpen(true)} title={title}/>
                <GraphCanvas graph={graph} direction={direction}/>
                <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <ModalContentWrapper>
                        <NewNodeForm roadmap={graph} onSubmit={newNodeHandler}/>
                    </ModalContentWrapper>
                </AppModal>
            </Container>
        </div>
    );
};

export default withProtected(GraphVisualizerPage);