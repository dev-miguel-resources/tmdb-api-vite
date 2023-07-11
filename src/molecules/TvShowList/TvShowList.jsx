import PropTypes from 'prop-types'
import TvShowListItem from '../TvShowListItem/TvShowListItem'
import s from './particule/style.module.css'

const TvShowList = ({ onClickItem, tvShowList }) => (
  <>
    <div className={s.title}>You probably like:</div>
    <div className={s.list}>
      {tvShowList.map((tvShow) => {
        return (
          <span key={tvShow.id}>
            <TvShowListItem tvShow={tvShow} onClick={onClickItem} />
          </span>
        )
      })}
    </div>
  </>
)

TvShowList.propTypes = {
  onClickItem: PropTypes.func,
  tvShowList: PropTypes.array,
}

export default TvShowList
