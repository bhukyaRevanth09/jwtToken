import questionModel from "../models/questionModel.js";

export const getQuestionCount = async (data) => {


  try {
    const totalQuestions = await questionModel.countDocuments();

 console.log('totototot :: ',totalQuestions)
 
if(totalQuestions){
     return totalQuestions
}else{
    return 0
}


  } catch (error) {
    console.error("Question count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get question count"
    });
  }
};