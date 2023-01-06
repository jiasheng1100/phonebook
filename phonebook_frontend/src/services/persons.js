import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => (
    axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.log('fail')
        })
)

const create = newObject => (
    axios.post(baseUrl, newObject)
        .then(response => response.data)
        .catch(error => {
            console.log('fail')
        })
)

const remove = (id) => (
    axios.delete(`${baseUrl}/${id}`)
        .catch(error => {
            console.log('fail')
        })
)

const update = (id, newObject) => (
    axios.put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
)

export default { 
    getAll: getAll, 
    create: create,
    remove: remove,
    update: update
}
