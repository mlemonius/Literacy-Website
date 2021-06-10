import {
  createRequire
} from 'module'
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
let titles = []
const bucketParamsForTitles = {
  Bucket: 'library.stories',
  Prefix: 'stories/'
}
s3.listObjects(bucketParamsForTitles, (err, data) => {
  const stories = []
    if (err) {
      console.log("error", err)
    } else {
      data.Contents.forEach((title, index, filesList) => { // stories/*title*.pdf   slice the string from / to .
        if (index != 0) {
          const slashIndex = title.Key.indexOf("/")
          const dotIndex = title.Key.indexOf(".")
          const newTitle = title.Key.slice(slashIndex + 1, dotIndex)
          // console.log(newTitle);
          titles.push(newTitle)
        }
      })
      // console.log(titles);
      titles.forEach((title, index, titlesList) => {
        // console.log(titlesList.length);
        const story = {}
        const bucketParamsForDescription = {
          Bucket: 'library.stories',
          Key: `storiesDescriptions/${title}.txt`
        }
        const myInterface = readline.createInterface({
          input: s3.getObject(bucketParamsForDescription).createReadStream()
        })
        let lineNum = 0
        let description = ""
        let colonIndex = ""
        myInterface.on('line', function (line) {          
          line = Buffer.from(line).toString('utf8')
          lineNum++
          switch (lineNum) {
            case 1:
              colonIndex = line.indexOf(':')
              const title = line.slice(colonIndex + 1).trim()
              story.title = title
              //console.log(story);
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
                stories.push(story) 
                setTimeout(() => {
                  if (index === titlesList.length - 1 ) {
                    // res.header("Content-Type", "text/json; charset=utf-8")
                    res.json({message: "success", stories: stories})
                  }
                }, 100);
              } else {
                line = convertQuotesToDummy(line.trim())
                description += line + " "
              }
              break;
          }
        })
      })
    }
  })
}

const convertQuotesToDummy = (line) => {
  let index = line.indexOf(" ")

  while(index !== -1){

    if( line.charAt(index + 1) !== " " && line.charAt(index + 1) === line.charAt(index + 1).toUpperCase()){
      line = line.slice(0, index) + "“" + line.slice(index + 1)   //one for opening quote
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
