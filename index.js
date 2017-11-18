const async = require('async')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')

const item = [
    {
        name: 'taara',
        url: 'http://rov.wikia.com/wiki/Taara'
    },
    {
        name: 'Valhein',
        url: 'http://rov.wikia.com/wiki/Valhein'
    }
]

const queue = async.queue((task, callback) => {
    request(task.url, (error, response, body) => {
        $ = cheerio.load(body)
        const text = $('#mw-content-text p').text()
        
        fs.writeFile(task.name + ".txt", text, (err) => {
            if (err) {
                console.log(err)
                callback()
            }
            console.log("file saved")
            callback()
        })
    })
}, 1)

queue.drain = () => {
    console.log("All process complete")
}

queue.push(item)