import { useState, useEffect } from 'react'
import Logo from '../molecules/Logo/Logo'
import SearchBar from '../molecules/SearchBar/SearchBar'
import TvShowDetail from '../molecules/TvShowDetail/TvShowDetail'
import TvShowList from '../molecules/TvShowList/TvShowList'
import { TVShowAPI } from '../api/tv-show'
import { BACKDROP_BASE_URL } from '../config'
import logoImg from '../assets/images/logo.png'
import s from './particule/style.module.css'

function App() {

  const [currentTVShow, setCurrentTVShow] = useState()

  // Normal Version
  async function fetchPopulars() {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0]);
      console.log(popularTVShowList[0]);
    }
  }

  // Optimized Version with useCallback

  // Optimized Version with useMemo

  async function fetchByTitle(title) {
    const searchResponse = await TVShowAPI.fetchByTitle(title);
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);


  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow 
        ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
        url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
        : "black",
      }}
    >

      <div className={s.header}>
        <div className='row'>
          <div className='col-4'>
            <Logo title="WatchShows" image={logoImg} />
          </div>
          <div className='col-md-12 col-lg-4'>
            <SearchBar onSubmit={fetchByTitle}  />
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TvShowDetail tvShow={currentTVShow} />}
      </div>
    </div>
  )
}

export default App
