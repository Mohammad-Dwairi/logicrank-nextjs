import dynamic from "next/dynamic";
import {useWindowDimensions} from "../../hooks/useWindowDimensions";
import Image from "next/image";
import LoadingView from "../../hoc/LoadingView";

const Canvas = dynamic(() =>
    import('reaflow/dist/index.esm.js').then((mod) => mod.Canvas).catch(() => LoadingView));


const GraphCanvas = props => {

    const {graph, direction} = props;
    const {height, width} = useWindowDimensions();

    let dir = direction || 'RIGHT';
    if (height > width) {
        dir = 'DOWN';
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
            defaultPosition={dir === 'DOWN' ? 'top' : 'center'}
            maxWidth={width}
            maxHeight={height - 185}
            direction={dir}
            nodes={graph?.nodes}
            edges={graph?.edges}
        />
    );
};

export default GraphCanvas;