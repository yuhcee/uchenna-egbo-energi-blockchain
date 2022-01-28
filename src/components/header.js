import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#f8f8f8`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        <StaticImage
          src="../images/energi-image.jpg"
          width={120}
          height={60}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt="Energi Logo"
          style={{ verticalAlign: "baseline" }}
        />
        {/* {siteTitle} */}
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
