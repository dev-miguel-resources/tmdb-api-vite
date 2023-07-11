import PropTypes from 'prop-types'
import s from './particule/style.module.css'

const Logo = ({ image, title }) => (
  <>
    <div className={s.container}>
      <img className={s.img} src={image} alt="logo-tv" />
      <span className={s.title}>{title}</span>
    </div>
  </>
);

Logo.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}

export default Logo
