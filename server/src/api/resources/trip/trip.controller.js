import { Trip } from "./trip.model"

export const getAllTrips = (req, res) => {
  Trip.find({})
    .then(trips => {
      res.status(200).json(trips)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const createTrip = (req, res) => {
  const newTrip = new Trip({
    name: req.body.name,
    isArchived: req.body.isArchived,
    start: req.body.start,
    end: req.body.end,
    lat: req.body.lat,
    lon: req.body.lon
  })
  Trip.findOne({ name: req.body.name })
    .then(trip => {
      if (trip) return res.status(400).send("trip already exists")
      newTrip
        .save()
        .then(trip => {
          res.status(201).json(trip)
        })
        .catch(err => {
          res.status(500).send(err.message)
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const getOneTrip = (req, res) => {
  Trip.findOne({ _id: req.params.id })
    .populate("waypoints")
    .exec()
    .then(trip => {
      res.status(200).json(trip)
    })
    .catch(err => {
      return res.status(500).send(err)
    })
}

export const updateTrip = (req, res) => {
  const id = req.params.id
  const update = req.body

  if (update.waypoints)
    return res
      .status(401)
      .send(
        "Waypoints cannot be modified from Trip model. Use Waypoint model instead"
      )

  Trip.findOneAndUpdate({ _id: id }, update)
    .then(oldTrip => {
      Trip.findOne({ _id: oldTrip.id })
        .then(newTrip => {
          res.status(200).json(newTrip)
        })
        .catch(() => {
          res.status(404).json("Not Found")
        })
    })
    .catch(() => {
      res.status(404).json("Not Found")
    })
}

export const deleteTrip = (req, res) => {
  Trip.findOneAndDelete({ _id: req.params.id })
    .then(trip => {
      if (!trip) return res.status(404).send("trip not found")
      res.status(202).json(trip)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const populateWaypoints = (req, res) => {
  User.findById(req.params.id)
    .populate("waypoints")
    .exec((err, trip) => {
      if (err) res.status(500).send(err)
      res.status(200).json(trip.waypoints)
    })
}
