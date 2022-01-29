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
