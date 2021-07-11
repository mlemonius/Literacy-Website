import {
  createRequire
} from 'module'
import { resolve } from 'path';
const require = createRequire(
  import.meta.url)
const AWS = require('aws-sdk')
const readline = require('readline');
const fs = require('fs');
const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

const getStory = (req, res) => {
  let title = req.query.title
  title =  title.split("+").join(" ")
  const bucketParams = {
    Bucket: 'library.stories',
    Key: `stories/${title}.pdf`
  }
  // const chunks = []
  s3.getObject(bucketParams).createReadStream().pipe(res).on("err", (err) =>{
    console.log(err)
  })

  // // readStream.on ('error', (err) => {
  //   console.log(err)
  // })

  // readStream.on ('data', chunk => {
  //   chunks.push(chunk)
  // })
  // readStream.on('end', () => {
  //   const pdf = Buffer.concat(chunks).toString('base64')
  //   res.json({
  //           message: "success",
  //           file: pdf
  //         })
  // })
  //, (err, data) => {
  //   if (err) {
  //     console.log("Error", err)
  //     res.json({
  //       message: "error",
  //       file: null
  //     }) 
  //   } else {
  //     const file = Buffer.from(data.Body).toString('base64')
  //     res.json({
  //       message: "success",
  //       file: file
  //     })
  //   }
  // })
}

const getAllStoriesDetails = (req, res) => {
const bucketParamsForTitles = {
  Bucket: 'library.stories',
  Prefix: 'stories/'
}

s3.listObjects(bucketParamsForTitles, async (err, data) => {
  let stories = []
    if (err) {
      console.log("error", err)
    } else {
      Promise.all(
        data.Contents.map(async (title, index) =>{
          if (index != 0) {
            //console.log(`index ${index} started`);
            const slashIndex = title.Key.indexOf("/")
            const dotIndex = title.Key.indexOf(".")
            const newTitle = title.Key.slice(slashIndex + 1, dotIndex)

            const bucketParamsForDescription = {
              Bucket: 'library.stories',
              Key: `storiesDescriptions/${newTitle}.txt`
            }
            const myInterface = readline.createInterface({
              input: s3.getObject(bucketParamsForDescription).createReadStream()
            })
            let story = await addDescriptionToStory(myInterface)
            stories.push(story)
          }
        })
      ).then(() => {
        stories.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? - 1 : 0))
        res.json({message: "success", stories: stories})
      })
    }
  })
}

const addDescriptionToStory = (myInterface) => {
  const story = {}
  let lineNum = 0
  let description = ""
  let colonIndex = 0

  return new Promise((resolve) =>{
    myInterface.on('line', function (line) {          
      line = Buffer.from(line).toString('utf8')
      //console.log(line);
      lineNum++
      switch (lineNum) {
        case 1:
          colonIndex = line.indexOf(':')
          const title = line.slice(colonIndex + 1).trim()
          story.title = title
          //console.log(title);
          break;
        case 2:
          colonIndex = line.indexOf(':')
          const author = line.slice(colonIndex + 1).trim()
          story.author = author
          //console.log(story);
          break;
        case 3:
          colonIndex = line.indexOf(':')
          const illustrator = line.slice(colonIndex + 1).trim()
          story.illustrator = illustrator
          //console.log(story);
          break;
        case 4:
          colonIndex = line.indexOf(':')
          const publisher = line.slice(colonIndex + 1).trim()
          story.publisher = publisher
          //console.log(story);
          break;
        case 5:
          colonIndex = line.indexOf(':')
          const pages = line.slice(colonIndex + 1).trim()
          story.pages = pages
          //console.log(story);
          break;
        case 6:
          const ageRanges = []
          colonIndex = line.indexOf(':')
          let ages = line.slice(colonIndex + 1).trim()
          //console.log(ages);
          let commaIndex = ages.indexOf(',')
          while (commaIndex != -1) {
            ageRanges.push(ages.slice(0, commaIndex))
            ages = ages.slice(commaIndex + 1).trim()
            commaIndex = ages.indexOf(',')
            if( commaIndex == -1) {
              ageRanges.push(ages)
            }
          }
          story.ages = ageRanges
          // console.log(story);
          break;
        case 7:
          colonIndex = line.indexOf(':')
          line = convertQuotesToDummy(line.slice(colonIndex + 1).trim())
          description += line + " "
          // console.log(description);
          break;
        default:
          if (line == '' || line == require("os").EOL) {
            // console.log(description);
            story.description = description.trim()
            //console.log(`index ${index} finished`);
            resolve(story)
          } else {
            line = convertQuotesToDummy(line.trim())
            description += line + " "
          }
          break;
      }
    })
  })
}

const convertQuotesToDummy = (line) => {     // utf-8 does not recognize “” and ’
  let index = line.indexOf("�")
  while(index !== -1){

    if( line.charAt(index + 1) !== " " && line.charAt(index + 1) === line.charAt(index + 1).toUpperCase()){
      line = line.slice(0, index) + "“" + line.slice(index + 1)  
    }
    
    else if(line.charAt(index + 1) === " "){
      line = line.slice(0, index) + "”" + line.slice(index + 1)
    }

    else{
      line = line.slice(0, index) + "’" + line.slice(index + 1)
    }

    index = line.indexOf("�")
  }
  return line
}

export {
  getStory,
  getAllStoriesDetails
}
