const fs = require("fs")
const csv = require("csv-parser")
let countries =[]
let canada = []
let usa = []

const getSingleCountry = (countryName, dataSet) =>{
  return  dataSet.filter(line=>line.country.toLowerCase() == countryName.toLowerCase() )
}
const makeContent = (dataSet) => {
    let content = "country,year,population\n"
    dataSet.map(rec=>{
        let {country,year,population} = rec
        content += `${country},${year},${population}\n`
    })
    return content
}
fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on('data', (data) => countries.push(data))
  .on('end', () => {
    console.log("parsing completed... YISSSS!")
     canada = getSingleCountry("canada",countries)
     usa = getSingleCountry("united States",countries)
     fs.readdirSync(".",(err, listOfFiles)=>{
        listOfFiles.filter(file=>{file=="canada.txt"||file=="usa.txt"}).map(file=>{
            fs.unlink(file,(err)=>{
                if(err){
                    console.log(`whoops big boi we got an error with file: ${file}`)
                    console.log(err)
                }
            })
        })
     })
     fs.writeFile("canada.txt", makeContent(canada), (err)=>{
            console.log("Write Successful")
        })
     fs.writeFile("usa.txt", makeContent(usa), (err)=>{
            console.log("Write Successful")
        })
        console.log("The beacons has been lit sir. This must mean the deed was done")

    });

  