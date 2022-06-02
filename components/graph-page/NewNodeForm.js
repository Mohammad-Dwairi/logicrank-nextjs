import classes from './styles.module.scss';
import Select from 'react-select';

import {useState} from "react";

const NewNodeForm = props => {

    const {roadmap, onSubmit} = props;

    const [text, setText] = useState('');
    const [selectedParentNodes, setSelectedParentNodes] = useState([]);
    const [selectedChildNodes, setSelectedChildNodes] = useState([]);

    const onSubmitHandler = e => {
        e.preventDefault();
        const node = {
            id: text,
            text: text,
            parentNodes: selectedParentNodes.map((n) => ({id: n.value, text: n.value})),
            childNodes: selectedChildNodes.map((n) => ({id: n.value, text: n.value}))
        };
        console.log(node, 'NODE')
        onSubmit(node);
    };

    const handleSelectChangeParent = (values) => {
        setSelectedParentNodes(values)
    }

    const handleSelectChangeChild = (values) => {
        setSelectedChildNodes(values);
    }


    return (
        <form className={classes.newNodeForm} onSubmit={onSubmitHandler}>
            <div>
                <label>Node Name</label>
                <input type='text' onChange={e => setText(e.target.value)}/>
            </div>
            <div>
                <label>Parent Nodes</label>
                <Select
                    name='parentNodes'
                    isMulti
                    options={roadmap.nodes.map(node => ({label: node.text, value: node.text}))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelectChangeParent}
                />
            </div>
            <div>
                <label>Child Nodes (Keep empty if leaf node)</label>
                <Select
                    name='childNodes'
                    isMulti
                    options={roadmap.nodes.map(node => ({label: node.text, value: node.text}))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelectChangeChild}
                />
            </div>
            <input type='submit' value='Add Node' className={classes.authButton}/>
        </form>
    );
};

export default NewNodeForm;