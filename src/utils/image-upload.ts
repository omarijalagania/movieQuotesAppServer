import multer from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
  destination: function (_, _res, cb) {
    cb(null, 'images')
  },
  filename: function (_, file, cb) {
    cb(null, file.fieldname + '-' + file.originalname)
  },
})

const fileFilter = (_: Request, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export const upload = multer({ storage: storage, fileFilter: fileFilter })
