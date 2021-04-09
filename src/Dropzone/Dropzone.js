import React from 'react'
import PropTypes from 'prop-types'
import { fromEvent } from 'file-selector'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

import WarningIcon from '@material-ui/icons/Warning'
import DescriptionIcon from '@material-ui/icons/Description'
import PhotoIcon from '@material-ui/icons/Photo'

import { getFileExtension, sizeToBytes } from '../utils/files'
import CircleLoader from '../CircleLoader'
import Spacer from '../Spacer'

const IMAGE_TYPES = ['png', 'jpg', 'jpeg', 'gif', 'svg']

const useStyles = makeStyles(theme => ({
  fileInput: {
    position: 'fixed',
    top: -9999,
    left: -9999,
    height: 0,
    width: 0,
  },
  dropzone: {
    height: props => (props.isResponsive ? '100%' : 250),
    width: props => (props.isResponsive ? '100%' : 250),
    padding: 16,
    border: props =>
      props.isDragging ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: props => (props.isDragging ? theme.palette.primary[50] : theme.palette.grey[100]),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      border: `2px solid ${theme.palette.secondary.main}`,
      backgroundColor: `2px solid ${theme.palette.grey[50]}`,
    },
  },
  dropzoneIcon: {
    fontSize: theme.typography.h3.fontSize,
    color: props => (props.hasError ? theme.palette.error.main : theme.palette.grey[300]),
  },
}))

function validateFile({ file, allowedExtensions, maxFileSize }) {
  if (!file) {
    throw new Error('No file value')
  }

  const extension = getFileExtension(file.name)

  if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension)) {
    throw new Error(`Only the following file types are accepted: ${allowedExtensions.join(', ')}.`)
  }

  if (maxFileSize && file.size > sizeToBytes(maxFileSize)) {
    throw new Error(`Maximum file size is ${maxFileSize}`)
  }
}

const Dropzone = ({
  onChange,
  allowedExtensions: allowedExtensionsFromProps = [],
  maxFileSize = '5 M',
  isImage = false,
  isResponsive = false,
  maxFileCount = 1,
  label = '+ Add Files',
  isLoading = false,
}) => {
  const allowedExtensions = !isImage
    ? allowedExtensionsFromProps
    : allowedExtensionsFromProps.length
    ? allowedExtensionsFromProps.filter(ext => IMAGE_TYPES.includes(ext))
    : IMAGE_TYPES

  const inputRef = React.useRef()
  const containerRef = React.useRef()
  const [errors, setErrors] = React.useState(null)
  const [isDragging, setIsDragging] = React.useState(null)
  const classes = useStyles({
    isResponsive,
    isDragging,
    hasError: errors?.length,
  })

  // Stop the global event from dropping the file.
  const onWindowDrop = event => {
    if (containerRef.current && containerRef.current.contains(event.target)) {
      return
    }

    event.preventDefault()
  }

  const onDragOver = event => {
    event.stopPropagation()
    event.preventDefault()

    const isValidDrag =
      containerRef.current &&
      containerRef.current.contains(event.target) &&
      event.dataTransfer.items &&
      event.dataTransfer.items.length > 0

    if (isValidDrag) {
      setIsDragging(true)
      // processFile({ setError, allowedExtensions, maxFileSize, onChange, event })
    } else {
      setIsDragging(false)
    }
  }

  const onDragEnd = event => {
    event.stopPropagation()
    event.preventDefault()
    setIsDragging(false)
  }

  const processFiles = fileList => {
    const errors = []
    const validFiles = []

    for (let index = 0; index < fileList.length; index += 1) {
      const file = fileList[index]

      try {
        validateFile({ file, allowedExtensions, maxFileSize })
        validFiles.push(file)
      } catch (error) {
        errors.push([file.name, error])
      }
    }

    setErrors(errors)

    return onChange({ errors, files: validFiles })
  }

  React.useEffect(() => {
    const onDrop = async event => {
      event.stopPropagation()
      event.preventDefault()

      const files = await fromEvent(event)
      if (files.length > 0) {
        processFiles(files)
      }
    }

    window.addEventListener('dragover', onDragOver, false)
    window.addEventListener('dragend', onDragEnd, false)
    window.addEventListener('drop', onWindowDrop, false)

    if (containerRef.current) {
      containerRef.current.addEventListener('drop', onDrop, false)
    }

    return () => {
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('dragend', onDragEnd)
      window.removeEventListener('drop', onDrop)

      if (containerRef.current) {
        containerRef.current.removeEventListener('drop', onDrop)
      }
    }
  }, [onChange])

  const focusInput = event => {
    event.stopPropagation()
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const IconComponent = errors?.length ? WarningIcon : isImage ? PhotoIcon : DescriptionIcon

  return (
    <ButtonBase ref={containerRef} className={classes.dropzone} onClick={focusInput}>
      {isLoading ? <CircleLoader size={48} /> : <IconComponent className={classes.dropzoneIcon} />}

      <Spacer axis="vertical" size={16} />

      {errors?.length ? (
        errors.map((error, index) => (
          <Typography key={index} color="error" align="center">
            {`Error with ${error[0]}: ${error[1]?.message || 'Error'}`}
          </Typography>
        ))
      ) : (
        <Typography color="textSecondary" align="center">
          {isLoading ? 'Uploading files...' : label}
        </Typography>
      )}
      <input
        disabled={isLoading}
        className={classes.fileInput}
        type="file"
        ref={inputRef}
        multiple={maxFileCount > 1}
        onChange={event => {
          if (!event.target.files.length) {
            return onChange(null)
          }

          return processFiles(event.target.files)
        }}
      />
    </ButtonBase>
  )
}

Dropzone.propTypes = {
  onChange: PropTypes.func.isRequired,
  allowedExtensions: PropTypes.arrayOf(PropTypes.string),
  maxFileSize: PropTypes.string,
  isImage: PropTypes.bool,
  isLoading: PropTypes.bool,
  /** If `true`, the container element will stretch to the wrapper's height and width. */
  isResponsive: PropTypes.bool,
  maxFileCount: PropTypes.number,
  label: PropTypes.string,
}

export default Dropzone
