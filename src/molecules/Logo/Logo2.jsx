import PropTypes from 'prop-types'
import { LogoContainer, LogoImg, LogoTitle } from './StyledLogo'

// Styled Components
const Logo2 = ({ image, title }) => (
  <>
    <LogoContainer>
      <LogoImg src={image} alt="logo-tv" />
      <LogoTitle>{title}</LogoTitle>
    </LogoContainer>
  </>
)

Logo2.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}

export default Logo2
