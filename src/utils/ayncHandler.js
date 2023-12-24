const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler}


// advanced function or higher order function that takes a function as parameter

// other method by using try catch
// const asyncHandler=(fn)=>async (req,res,next)=>{
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         req.status(error.code || 500).json({
//             success:false,
//             message: error.message
//         })
        
//     }


// }

