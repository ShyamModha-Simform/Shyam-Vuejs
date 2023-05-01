import axios from 'axios'

const getCarDetails = async () => {
  try {
    let responseData = await axios.get('https://testapi.io/api/dartya/resource/cardata')
    console.log(responseData.data.data)
    return responseData.data.data
  } catch (e) {
    alert("Couldn't get Car Details")
  }
}

const addCarDetails = async (data) => {
  try {
    let responseData = await axios.post('https://testapi.io/api/dartya/resource/cardata', {
      ...data
    })
    return responseData
  } catch (e) {
    alert("Couldn't able to post Data..")
  }
}

const deleteCarDetails = async (id) => {
  try {
    let responseData = await axios.delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
    return responseData
  } catch (e) {
    alert("Couldn't able to delete Data..")
  }
}

const updataCarDetails = async (data) => {
  try {
    let responseData = await axios.put(
      `https://testapi.io/api/dartya/resource/cardata/${data.id}`,
      {
        ...data
      }
    )
    return responseData
  } catch (e) {
    alert("Couldn't able to delete Data..")
  }
}

export { getCarDetails, addCarDetails, deleteCarDetails, updataCarDetails }
