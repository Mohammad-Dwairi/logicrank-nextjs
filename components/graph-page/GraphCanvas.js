import dynamic from "next/dynamic";
import {useWindowDimensions} from "../../hooks/useWindowDimensions";
import Image from "next/image";

const Canvas = dynamic(() =>
    import('reaflow/dist/index.esm.js').then((mod) => mod.Canvas)
);


const GraphCanvas = props => {

    const {graph} = props;
    const {height, width} = useWindowDimensions();

    let direction = 'RIGHT';
    if (height > width) {
        direction = 'DOWN';
    }

    if (graph?.nodes.length === 0) {
        return (
            <div style={{maxWidth: 400, minWidth: 300}} className='absCenter'>
                <Image src={require('../../public/graph.svg')} alt=''/>
            </div>
        )
    }

    return (
        <Canvas
            fit
            defaultPosition='center'
            maxWidth={width}
            maxHeight={height - 185}
            direction={direction}
            nodes={graph?.nodes}
            edges={graph?.edges}
        />
    );
};

export default GraphCanvas;