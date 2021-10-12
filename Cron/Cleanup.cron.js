const ParkController = require("../Controller/Park.controller")
const moment = require('moment');
const ParkModel = require("../model/Park.model");

const cleanupCron = (cron) => {
    
    cron.schedule('* * * * *', async () => {
        console.log('running a task every minute');
        let parkModel = await ParkController.parkModel.getAll();

        let SP = parkModel.SP.parked;
        let MP = parkModel.MP.parked;
        let LP = parkModel.LP.parked;

        await Promise.all(SP.map(async (parkedCar, index) => {
            console.log(parkedCar)
            if (parkedCar.status == 'leave') {
                var timeDuration = moment() - moment(parkedCar.time)
                if (timeDuration > process.env.cleanupTimePeriod * 60000) {
                    SP.splice(index, 1);
                }
            }
        }),
            MP.map(async (parkedCar, index) => {
                console.log(parkedCar)
                if (parkedCar.status == 'leave') {
                    var timeDuration = moment() - moment(parkedCar.time)
                    if (timeDuration > process.env.cleanupTimePeriod * 60000) {
                        MP.splice(index, 1);
                    }
                }
            }),
            LP.map(async (parkedCar, index) => {
                console.log(parkedCar)
                if (parkedCar.status == 'leave') {
                    var timeDuration = moment() - moment(parkedCar.time)
                    if (timeDuration > process.env.cleanupTimePeriod * 60000) {
                        LP.splice(index, 1);
                    }
                }
            })
        )
        ParkModel.SP.parked = SP;
        ParkModel.MP.parked = MP;
        ParkModel.LP.parked = LP;
        ParkController.parkModel.updateData(parkModel);

        console.log(parkModel);
    });

}

module.exports = cleanupCron;