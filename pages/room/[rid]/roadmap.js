import {withProtected} from "../../../hoc/RouteAuth";
import LoadingView from "../../../hoc/LoadingView";
import {useEffect, useState} from "react";
import GraphVisualizerPage from "../../graph";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import {ROOMS_COLLECTION} from "../../../firebase/constants/COLLECTIONS";
import {useRouter} from "next/router";
import {fbQueryDocByUID} from "../../../firebase/functions/firestore-docs-functions";

const RoadmapPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [roadmap, setRoadmap] = useState({nodes: [], edges: []});

    const {rid} = useRouter().query;

    const onAddNodeFinish = async (updatedGraph) => {
        await updateDoc(doc(db, ROOMS_COLLECTION, rid), {roadmap: updatedGraph});
    };

    useEffect(() => {
        const handle = async () => {
            const room = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
            if (room && room.roadmap) {
                setRoadmap(room.roadmap);
            }
        };
        handle().then(() => setIsLoading(false));
    }, [rid]);

    if (isLoading) return <LoadingView/>;

    return (
        <GraphVisualizerPage
            title='Topics Road Map'
            direction='DOWN'
            onAddNodeFinish={onAddNodeFinish}
            roadmap={roadmap}
        />
    );
};

export default withProtected(RoadmapPage);