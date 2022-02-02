import React from "react"
import Button from "@mui/material/Button"

const ButtonComp = ({
  handleClick,
  buttonText,
  variant,
  startIcon,
  endIcon,
}) => {
  return (
    <Button
      sx={{
        color: `#03e775`,
        background: `#060e09`,
        fontFamily: `Avenir`,
        lineHeight: `normal`,
      }}
      variant={variant}
      startIcon={startIcon && startIcon}
      endIcon={endIcon && endIcon}
      onClick={() => {
        handleClick()
      }}
    >
      {buttonText}
    </Button>
  )
}

export default ButtonComp
