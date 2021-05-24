import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const  AWS = require('aws-sdk')
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
const getStory = (req, res) => {
     const bucketParams = {
          Bucket : 'library.stories',
          Key : `stories/${req.body.title}.pdf`
        }
          s3.getObject(bucketParams, function (err, data) {
          if (err) {
            console.log("Error", err)
            res.json({message: "error", file: null})
          } else {
               const file = Buffer.from(data.Body).toString('base64')
               res.json({message: "success", file: file})
          }
        })
}

const getAllStoriesTitles = (req, res) => {
     const bucketParams = {
          Bucket : 'library.stories',
          Prefix : 'stories/'
        }
        s3.listObjects(bucketParams, function(err, data) {
          if (err) {
            console.log("error", err)
            res.json({message: "error", titles: null})
          } else {
            const titles =[]
            data.Contents.forEach((title, index, filesList) => {        // stories/*title*.pdf   slice the string from / to .
               if(index != 0){
                    const slashIndex = title.Key.indexOf("/")
                    const dotIndex = title.Key.indexOf(".")
                    const newTitle = title.Key.slice(slashIndex + 1, dotIndex)
                    titles.push(newTitle)
                    //console.log(newTitle)
                    if(index === filesList.length - 1){
                         res.json({message: "success", titles: titles})
                    }
               }
            })
          }
        })
}


export {getStory, getAllStoriesTitles}








