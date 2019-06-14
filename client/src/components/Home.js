import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../components/Home.css"
import logo from "../components/images/Family_Guy_Logo.png"

class Home extends Component {

    state = {
        show: [],
        search: ''
    }

    componentDidMount() {
        // const artistId = this.props.match.params.id;
        // this.fetchArtist(artistId)
        this.fetchEpisode()
    }

    fetchEpisode = async () => {
        try {
            const showResponse = await axios.get(`/api/v1/episodes/`)
            this.setState({
                // shows: artistResponse.data,
                // songs: artistResponse.data.songs,
                show: showResponse.data
            })

            this.searchEpisode()
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }
    searchEpisode(e) {
        e.preventDefault()
        let guess = this.state.search
        let showData = this.state.show
        let results = []
        for (let i = 0; i < showData.length; i++) {
            if (guess === showData[i].season ||
                guess === showData[i].number ||
                guess === showData[i].name
            ) {
                results.push(showData[i])
            }
        }
        console.log(results)
    }
    handleChange = () => {
        
    }

    render() {
        return (
            <div id='homeBody'>
                <header>
                    <div id='highsky2'>
                    </div>
                </header>
                <div id='homeArticle'>
                    <div>
                        <Link to="/"><img src={logo} height='33%' /></Link>
                        <br />
                        <img id='eFLogo' src='https://fontmeme.com/permalink/190612/383739e555ee61e58f0add813ab63630.png' height='4%' />
                        <br />
                        <form id='homeSearch' onSubmit={this.searchEpisode}>
                            <label htmlFor="search">Search</label>
                            <input
                                id="search"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.search}>
                            </input>
                            <button type='submit'>Find</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;