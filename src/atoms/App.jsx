import { useState, useEffect, useMemo, useCallback } from 'react'
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
  const [recommendationList, setRecommendationList] = useState([])

  // Normal Version
  /*async function fetchPopulars() {
    const popularTVShowList = await TVShowAPI.fetchPopulars()
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0])
      console.log(popularTVShowList[0])
    }
  }*/

  // Optimized Version with useMemo
  /*const fetchPopulars = useMemo(() => {
    return async () => {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0])
      }
    }
  }, []);*/

  // Versión 2 useMemo
  /*const fetchPopulars2 = useMemo(async () => {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0])
    }
  }, []);*/

  // Optimized Version with useCallback
  const fetchPopulars = useCallback(async () => {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0])
    }
  }, []);

  async function fetchByTitle(title) {
    const searchResponse = await TVShowAPI.fetchByTitle(title)
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0])
    }
  }

  async function fetchRecommendations(tvShowId) {
    const recommendationListResponse = await TVShowAPI.fetchRecommendations(
      tvShowId,
    )
    if (recommendationListResponse.length > 0) {
      setRecommendationList(recommendationListResponse.slice(0, 10))
    }
  }

  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow)
  }

  useEffect(() => {
    fetchPopulars()
  }, [fetchPopulars])

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id)
    }
  }, [currentTVShow])

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
        url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : 'black',
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo title="WatchShows" image={logoImg} />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TvShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && (
          <TvShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  )
}

export default App
