const ParkModel = require('../model/Park.model')
const parkModel = new ParkModel()
const moment = require('moment');

const ParkController = {
    parkModel,

    async AddParking(req, res) {
        const body = req.body;
        //You can use Joi library schema validation
        //You can also put it on middleware as a validation
        if (!body.size) {
            return res.status(400).send({
                message: 'No size in body!'
            });
        }
        if (!body.parkingSize) {
            return res.status(400).send({
                message: 'No parkingSize in the body!'
            });
        }
        if (body.parkingSize != "SP" && body.parkingSize != "MP" && body.parkingSize != "LP") {
            return res.status(400).send({
                message: 'Invalid parkingSize!'
            });
        }
        if (!body.name) {
            return res.status(400).send({
                message: 'No name in body!'
            });
        }
        if (body.size != "S") {
            return res.status(400).send({
                message: 'Invalid size!'
            });
        }
        if (parkModel.getCar(body.name, body.parkingSize)) {
            return res.status(400).send({
                message: 'Name in parking already exist!'
            });
        }
        try {
            const resData = await parkModel.addPark(body.name, body.size, body.parkingSize)
            res.send(resData)
        } catch (error) {
            console.log(error)
            return res.status(400).send(error);
        }
    },
    async leaveParking(req, res) {

        const body = req.body;
        console.log(body)
        if (!body.name) {
            return res.status(400).send({
                message: 'No name in body!'
            });
        }
        if (!body.parkingSize) {
            return res.status(400).send({
                message: 'No parkingSize in body!'
            });
        }
        if (!parkModel.getCar(body.name, body.parkingSize)) {
            return res.status(400).send({
                message: 'No parking name exist in that parking'
            });
        }
        const car = parkModel.getCar(body.name, body.parkingSize);
        if (car.status == "leave") {
            return res.status(400).send({
                message: 'Car is already leave'
            });
        }

        try {
            const respData = await parkModel.leaveCar(body.name, body.parkingSize);
            const duration = moment.duration(moment().diff(respData.time));
            var hours = parseInt(duration.asHours());
            var days = parseInt(duration.asDays());
            console.log(days)
            var costPerHour
            switch (body.parkingSize) {
                case "SP":
                    costPerHour = 20
                    break;
                case "MP":
                    costPerHour = 60
                    break;
                case "LP":
                    costPerHour = 100
                    break;
                default:
                    break;
            }
            if (days >= 1) {
                respData.totalCost = + days * 5000;
            }
            respData.totalCost = + respData.cost + (hours * costPerHour);
            return res.send(JSON.stringify(respData))
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: JSON.stringify(error)
            });
        }
    },
    async getParking(req, res) {
        res.send(JSON.stringify(parkModel.getAll()));
    }



}

module.exports = ParkController