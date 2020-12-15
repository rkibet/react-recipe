import React,{useEffect,useState}from 'react';
import Recipe from './Recipe';
import './App.css';

const App =()=>{
    const APP_ID='2e41d4b8';
    const APP_KEY='8872bac390ece2ef00fc7923183384e3';
    // const APP_API=`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
    // const[counter,setCounter]=useState(0);
    const[recipes,setRecipes]=useState([]);
    const [search,setSearch]=useState('')
    const [query,setQuery]=useState('beef');

    useEffect(()=>{
        // console.log('effect has been run')get
        getReceipe();
    },[query])

    const getReceipe=async()=>{
        const resposnce =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data=await resposnce.json();
       setRecipes(data.hits)
       console.log(data.hits)
    }
    const updateSearch=e=>{
        setSearch(e.target.value)
        console.log(search)
    }
    const getSearch = e =>{
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }



    return(
        <div className="App">
            <h1>Welcome To React Project</h1>
            <form className='search-form' onSubmit={getSearch}>
                <input type='text' className='search-bar' value={search} onChange={updateSearch} />
                <button type='submit' className='search-button'>Search</button>
            </form>
           <div className='recipe'>
           {recipes.map(recipe=>(
                <Recipe 
                key={recipe.recipe.calories}
                title={recipe.recipe.label}
                ingredients={recipe.recipe.ingredients}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                />
            ))}
           </div>
           
        </div>
    );
}

export default App;
