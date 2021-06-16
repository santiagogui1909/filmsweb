import { useEffect, useState } from 'react';
import ListSearch from "./ListSearch";
import Pagination from '../Pagination/Pagination';

import "./searcher.css";
import "../Films/films.css";


const Searcher = () => {

    const [inputMovie, setInputMovie] = useState("");
    const [searchMovies, setSearchMovie] = useState([]);
    const [boxList, setBoxList] = useState(false);

    //search movies
    const searchMovie = async () => {
        const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=8f18f8939b1b8b2b379a9ccf6b0b6e43&query=${inputMovie}`;
        const responseSearchMovie = await fetch(urlSearch);
        const responseSearch = await responseSearchMovie.json();
        // console.log(responseSearch);
        setSearchMovie(responseSearch.results);
        // console.log(responseSearch);
    }

    useEffect(() => {
        if (inputMovie !== "") {
            searchMovie();
        }
    }, [inputMovie]);

    const handleChange = (e) => {
        setInputMovie(e.target.value);
        console.log(inputMovie);
    }

    const search = (e) => {
        e.preventDefault()

        if (!validSearch(inputMovie)) {
            alert("Please enter a search without numbers");
            setBoxList(false);
        } else {
            return setBoxList(true);
        }
    }

    const validSearch = (inputMovie) => {
        const userRegex = /^[A-Z ]+$/i;
        return userRegex.test(inputMovie);
    }

    return (
        <>
            <div className="container-search">
                <img src="https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_960_720.jpg"></img>
                <header>
                    <h1>movie<span>Web</span></h1>
                </header>
                <section className="box-input">
                    <input type="search" name="search" placeholder="search movies,siries,tv" onChange={handleChange} value={inputMovie} />
                    <button className="btn-search" onClick={search}><span className="icon-search"></span></button>
                </section>
                <span className="icon-up-open"></span>
            </div>
            <section className={boxList ? "listSearch" : "hide-listSearch"}>
                <label>results of your search: "{inputMovie}"</label>
                <div className="list">
                    {searchMovies.map((searchs) => {
                        return <ListSearch searchs={searchs} />
                    })}
                </div>            
            </section>
        </>
    );
};

export default Searcher;