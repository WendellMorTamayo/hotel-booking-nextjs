import axios from "axios"
import { getServerSession } from "next-auth"


export const createHotelRoom = async() => {
    const session = await getServerSession()

    const response = await axios.post('/api/hotel/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'token'
        },
        body: JSON.stringify({
            name: 'Room 1',
            description: 'This is a room',
            price: 100,
            quantity: 5,
            hotelId: 1
        })
    })

    const data = await response.json()

    console.log(data)
}