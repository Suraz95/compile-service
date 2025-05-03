const { asyncHandler, ApiError, ApiResponse } = require("shared-utils");
const axios = require("axios");
require("dotenv").config();

const compileCode = asyncHandler(async (req, res) => {
  const { code, stdin = "" } = req.body;
  const { language } = req.params; 
  // console.log(language)

  if (!code || !language) {
    throw new ApiError(400, "Code and language are required");
  }

  // Supported languages list
  const supportedLanguages = [
    "c",
    "cpp",
    "java",
    "python3",
    "ruby",
    "go",
    "nodejs",
  ];

  // Check if the language is supported
  if (!supportedLanguages.includes(language)) {
    throw new ApiError(400, "Unsupported language");
  }

  const payload = {
    script: code,
    language: language,
    versionIndex: "0", // Use the default version
    stdin: stdin,
    clientId: process.env.JDOODLE_CLIENT_ID,
    clientSecret: process.env.JDOODLE_CLIENT_SECRET,
  };

  try {
    // Call the JDoodle API
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      payload,
      {
        timeout: 10000,
      }
    );

    const output = {
      output: response.data.output,
      memory: response.data.memory,
      cpuTime: response.data.cpuTime,
      statusCode: response.data.statusCode,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, output, "Compilation successful"));
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new ApiError(504, "Request Timeout");
    }
    console.error("JDoodle Error:", error.response?.data || error.message);
    throw new ApiError(500, "Compilation failed");
  }
});


module.exports = compileCode;