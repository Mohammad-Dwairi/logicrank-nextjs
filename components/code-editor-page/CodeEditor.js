import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs/components/prism-core";
import {useState} from "react";

import classes from './styles.module.scss';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";


const CodeEditor = props => {

    const [code, setCode] = useState(`function add(a, b) {return a + b;}`);
    const [lang, setLang] = useState('C++');

    return (
        <div className={classes.editorContainer}>
            <div className='d-flex justify-content-between'>
                <span>
                    <label htmlFor='lang-select'>Language</label>
                    <select
                        id='lang-select'
                        value={lang}
                        className={classes.languageSelect}
                        onChange={(e) => setLang(e.target.value)}
                    >
                        <option name='C++'>C++</option>
                        <option name='Java'>Java</option>
                        <option name='Python'>Python</option>
                        <option name='JavaScript'>JavaScript</option>
                    </select>
                </span>
                <span>
                    <label htmlFor='lang-select'>Font Size</label>
                    <select
                        id='lang-select'
                        value={lang}
                        className={classes.languageSelect}
                        onChange={(e) => setLang(e.target.value)}
                    >
                        <option name='C++'>10 px</option>
                        <option name='Java'>12 px</option>
                        <option name='Python'>14 px</option>
                        <option name='JavaScript'>16 px</option>
                        <option name='JavaScript'>18 px</option>
                        <option name='JavaScript'>20 px</option>
                        <option name='JavaScript'>22 px</option>
                        <option name='JavaScript'>24 px</option>
                    </select>
                </span>
            </div>
            <Editor
                className={classes.codeEditor}
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages['js'])}
                padding={10}
            />
            <button className={classes.runBtn}>Run</button>
        </div>
    );
};

export default CodeEditor;