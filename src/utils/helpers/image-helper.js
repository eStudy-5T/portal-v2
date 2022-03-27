import Resizer from 'react-image-file-resizer'

const DEFAULT_QUALITY = 100
const DEFAULT_ROTATION = 0

export const resizeImage = (file, maxWidth, maxHeight, imgType) => {
  return new Promise((resolve, reject) => {
    const fileType = imgType.split('/')[1].toUpperCase()
    if (
      fileType !== 'PNG' &&
      fileType !== 'JPEG' &&
      fileType !== 'WEBP' &&
      fileType !== 'JPG'
    ) {
      reject('Not support file type')
    } else {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        fileType,
        DEFAULT_QUALITY,
        DEFAULT_ROTATION,
        (uri) => {
          return resolve(uri)
        },
        'file'
      )
    }
  })
}
