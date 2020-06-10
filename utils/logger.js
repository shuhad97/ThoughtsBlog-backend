


const info = async (...log) =>{

    console.log(...log)

}


const errorMessage = (...params) =>{

    console.error(...params)

}


module.exports ={
    info, errorMessage
}