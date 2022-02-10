import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const readline = require('readline')
import s3 from "../aws/s3.js"

const getStory = (req, res) => {
  let title = req.query.title
  title = title.split("+").join(" ")
  const bucketParams = {
    Bucket: 'library.stories',
    Key: `stories/${title}.pdf`
  }
  s3.getObject(bucketParams).createReadStream().pipe(res).on("err", (err) => { // get the story based on the given title and pipe it to the response
    console.log(err)
  })
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
        data.Contents.map(async (title, index) => {
          if (index != 0) {
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
        stories.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? - 1 : 0))
        res.json({ message: "success", stories: stories })
      })
    }
  })
}

const addDescriptionToStory = (myInterface) => {
  const story = {}
  let lineNum = 0
  let description = ""
  let colonIndex = 0

  return new Promise((resolve) => {
    myInterface.on('line', function (line) {
      line = Buffer.from(line).toString('utf8')
      lineNum++
      switch (lineNum) {
        case 1:
          colonIndex = line.indexOf(':')
          const title = line.slice(colonIndex + 1).trim()
          story.title = title
          break;
        case 2:
          colonIndex = line.indexOf(':')
          const author = line.slice(colonIndex + 1).trim()
          story.author = author
          break;
        case 3:
          colonIndex = line.indexOf(':')
          const illustrator = line.slice(colonIndex + 1).trim()
          story.illustrator = illustrator
          break;
        case 4:
          colonIndex = line.indexOf(':')
          const publisher = line.slice(colonIndex + 1).trim()
          story.publisher = publisher
          break;
        case 5:
          colonIndex = line.indexOf(':')
          const pages = line.slice(colonIndex + 1).trim()
          story.pages = pages
          break;
        case 6:
          const ageRanges = []
          colonIndex = line.indexOf(':')
          let ages = line.slice(colonIndex + 1).trim()
          let commaIndex = ages.indexOf(',')
          if (commaIndex == -1) {
            ageRanges.push(ages.trim())
          }else {
            while (commaIndex != -1) {
              ageRanges.push(ages.slice(0, commaIndex))
              ages = ages.slice(commaIndex + 1).trim()
              commaIndex = ages.indexOf(',')
              if (commaIndex == -1) {
                ageRanges.push(ages)
              }
            }
          }
          story.ages = ageRanges
          break;
        case 7:
          colonIndex = line.indexOf(':')
          line = convertQuotesToDummy(line.slice(colonIndex + 1).trim())
          description += line + ' '
          story.description = description.trim()
          if(require("os").EOL) {
            resolve(story)
          }
          break;
        default:
          if (line == '' || line == require("os").EOL) {
            story.description = description.trim()
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
  //console.log(index);
  while (index !== -1) {

    if (line.charAt(index + 1) !== " " && line.charAt(index + 1) === line.charAt(index + 1).toUpperCase()) {
      line = line.slice(0, index) + "“" + line.slice(index + 1)
    }

    else if (line.charAt(index + 1) === " ") {
      line = line.slice(0, index) + "”" + line.slice(index + 1)
    }

    else {
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
