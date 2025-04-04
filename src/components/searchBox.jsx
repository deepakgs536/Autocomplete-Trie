import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import classes from './searchBox.module.css';
import { FiSearch , FiX} from 'react-icons/fi';
import SmoothCollapse from 'react-smooth-collapse';
import Trie from '../utils/trie';
import list from '../utils/list.json';


const SearchBox = props => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimation, setIsAnimation] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [trie, setTrie] = useState(null);
    const [results, setResults] = useState([])
    const [count , setCount] = useState(10);



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

     const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(inputValue)}`, '_blank');
            handleClearInput('');
        }
    };

    const handleClearInput = (selectedValue) => {
        setInputValue(selectedValue);
        setResults([]);
        setIsExpanded(false);
    };
    

    return (
        <div className={classes.Container}>

            <div className={classes.countContainer}>
                <div className={classes.countHeader}>Count :  </div>
                <input className={classes.countInput} value={count} type='number' min={0} max={100} onChange={(e)=>{setCount(e.target.value)}} />
            </div>

            <div style={{ width: '100%' }}>
                    <div className={classes.Header}>
                        AutoComplete - Trie
                    </div>
                
                    <div className={classes.InnerContainer}>
                        <FiSearch size={'20px'} style={{ marginRight: '8px' }} color={'#636B74'} />
                        <input className={classes.Input} placeholder={"Type something..."} value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                        {inputValue && ( // Show close icon only if input has text
                            <FiX
                                size="24px"
                                className={classes.ClearIcon}
                                onClick={()=>handleClearInput('')}
                                style={{ cursor: 'pointer', marginLeft: '8px', color: '#636B74' }}
                            />
                        )}
                    </div>
                    <div>

                    </div>
                    <SmoothCollapse className={classes.SC} expanded={isExpanded} heightTransition='0.15s linear' onChangeEnd={() => setIsAnimation(false)} collapsedHeight={'0px'}>
                    <div style={{ width: '100%',maxHeight:'55vh', backgroundColor: 'white', paddingTop: '0px', paddingBottom: '0px', overflowY: 'scroll' , scrollbarWidth:'none' }} >
                        {
                            results.slice(0,count || 5).map((result, idx) => {
                                return (
                                    <div key={idx} className={classes.ResultBox} onClick={() => handleClearInput(result)}>
                                        <h4 style={{ margin: 0 , fontWeight:500 }}>{titleCase(result)}</h4>
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
