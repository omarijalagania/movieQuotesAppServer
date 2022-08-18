import { Request, Response } from 'express'
import { Notification } from 'models'
import { validateNotifications } from 'schema'

export const addNotificationHandler = async (req: Request, res: Response) => {
  const { error } = validateNotifications(req.body)

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const data = {
    userId: req.body.userId,
    notificationType: req.body.notificationType,
    isRead: req.body.isRead,
    notificationFor: req.body.notificationFor,
  }

  const notification = await Notification.create(data)

  return res.status(200).json(notification)
}

export const getNotificationHandler = async (_: Request, res: Response) => {
  const notification = await Notification.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        __v: 0,
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ])

  if (!notification) {
    return res.status(404).send('Not found')
  }

  return res.status(200).json(notification)
}

export const updateNotificationHandler = async (_: Request, res: Response) => {
  const notification = await Notification.updateMany({
    $set: {
      isRead: true,
    },
  })

  return res.status(200).json(notification)
}
