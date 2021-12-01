import './search.css';



const Search = (props) => {
    return (
        <div className="search_box">
            <div className="search__text">Search weather in all countries of the world</div>
            <input
            className="search__input" 
            placeholder="Search..."
            onChange={e => props.setQuery_1(e.target.value)}
            value={props.valueInp}
            onKeyPress={props.searchItem}
            />
           
      </div>
    )
    
}

export default Search;