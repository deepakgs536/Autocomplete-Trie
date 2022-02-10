import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import classes from './searchBox.module.css';
import { FiSearch } from 'react-icons/fi';
import SmoothCollapse from 'react-smooth-collapse';
import Trie from '../utils/trie';
import list from '../utils/list.json';


const SearchBox = props => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimation, setIsAnimation] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [trie, setTrie] = useState(null);
    const [results, setResults] = useState([])




    useEffect(() => {
        const trie = new Trie();
        for (let company of list) {
            trie.insert(company.name)
        }
        setTrie(trie);
    }, [])


    const handleInputChange = event => {
        trie.resetRec();
        setInputValue(event.target.value);
        const results = event.target.value !== '' ? trie.suggestionsRec(event.target.value) : []
        if (event.target.value !== '' && trie.suggestions.length > 0) {
            setIsExpanded(true)
            setResults(results);
        }
        else {
            setIsExpanded(false)
        }
        console.log(trie.suggestions);

    }


    // From SOF
    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) { 
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
     }



    return (
        <div className={classes.Container}>

            <div style={{ width: '100%' }}>
                <SmoothCollapse className={classes.SC} expanded={isExpanded} heightTransition='0.15s linear' onChangeEnd={() => setIsAnimation(false)} collapsedHeight={'45px'}>
                    <div className={classes.InnerContainer}>
                        <FiSearch size={'1.6em'} style={{ marginLeft: '16px', marginRight: '8px' }} color={'#c1c1c1'} />
                        <input className={classes.Input} placeholder={"Type something..."} value={inputValue} onChange={handleInputChange} />
                    </div>
                    <div>

                    </div>
                    <div style={{ width: '100%', backgroundColor: '#fff', paddingTop: '40px', paddingBottom: '50px' }} >
                        {
                            results.slice(0,8).map((result, idx) => {
                                return (
                                    <div key={idx} className={classes.ResultBox}>
                                        <h4 style={{ margin: 0 }}>{titleCase(result)}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </SmoothCollapse>
            </div>
        </div>
    )
}

SearchBox.propTypes = {

}

export default SearchBox
