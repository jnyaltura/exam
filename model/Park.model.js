
const moment = require('moment');

var ParkData;

class ParkModel {
    constructor () {
        ParkData = {
            SP:{
                parked:[]
            },
            MP:{
                parked:[]
            },
            LP:{
                parked:[]
            }
        }
    }

    addPark = (name, size, parkingSize) =>{
        const carData = {
            name: name,
            size: size,
            time: moment().format("YYYY-MM-DDTHH:mm:ss"),
            cost: 40,
            status: "parked"
        }
        ParkData[parkingSize].parked.push(carData)
        return ParkData[parkingSize].parked
    }

    returnPark = (name, size, parkingSize) =>{
        const carData = {
            name: name,
            size: size,
            time: moment().format("YYYY-MM-DDTHH:mm:ss"),
            cost: 40,
            status: "parked"
        }
        ParkData[parkingSize].parked.push(carData)
        return ParkData[parkingSize].parked
    }


    getCar = (name, parkingSize) => {
        const parkingData = ParkData[parkingSize].parked
        return parkingData.some((el)=>{
            if(el.name == name)
                return el
        })
    }

    leaveCar = async (name, parkingSize) => {
        const parkingData = ParkData[parkingSize].parked
        var retVal
        await parkingData.some((el, index)=>{
            if(el.name == name) {
                el.status = 'leave';
                console.log(ParkData[parkingSize])
                ParkData[parkingSize].parked[index] = el;
                retVal = el;
                return el
            }
        })
        return retVal;
    }


    getPark = (size) => {
        return ParkData[parkingSize].parked
    }

    getAll = () =>{
        return ParkData;
    }

    updateData = (updatedParkData) => {
        ParkData = updatedParkData;
    }

}

module.exports = ParkModel