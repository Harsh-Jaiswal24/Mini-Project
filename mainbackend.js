const express = require("express");
const cors = require("cors"); 
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const app = express();
require('dotenv').config();

const PORT= process.env.PORT || 8000;

// Feedback Handleing using Mailgun
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun.client({username: 'api', key: MAILGUN_API_KEY });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//From Feedback Handling using MailGun
app.post('/feedback', (req, res) => {
    const { feedbackMessage } = req.body;
    console.log('Received feedback:', feedbackMessage);
   
             mg.messages.create('sandboxafead3e9064c4182b351b0cd913de954.mailgun.org', {
                 from:  'Excited User <mailgun@sandboxafead3e9064c4182b351b0cd913de954.mailgun.org>',
                 to: ["harsh4jaiswal@gmail.com"],
                 subject: "Feedback From NoteSolver User",
                 text: feedbackMessage,
                //  html: `<p>${feedbackMessage}</p>`
               })
               .then(msg => console.log(msg)) // logs response data
               .catch(err => console.error(err)); // logs any error
                 // Respond with a success message
                 res.json({ message: "Feedback received successfully!" });
               });
//Feedback


//Gemini Image Processing
// Gemini API Key (ensure this is securely stored)
const API_KEY = process.env.GEMINI_API_KEY;

// Route to upload image and send it for analysis
app.post("/analyze", async (req, res) => {
    const { dataURL } = req.body;

    if (!dataURL) {
        return res.status(400).send({ message: "No image data provided." });
    };

    try {
        // Send image to Gemini for analysis
        const analysisResult = await analyzeWithGemini(dataURL);

        return res.status(200).send({ message: "Image analyzed successfully.", analysisResult });
    } catch (err) {
        console.error("Error processing image with Gemini:", err);
        return res.status(500).send({ message: "Error analyzing image." });
    }
});

// Analyze the image with Google Gemini API
async function analyzeWithGemini(imageBase64) {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // or gemini-1.5-pro
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
            ],
        });

        const contents = [
            {
                role: 'user',
                parts: [
                    { inline_data: { mime_type: 'image/png', data: imageBase64.split(',')[1] } }, // Remove the data URL prefix
                    { text:   "You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. " +
    "Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). Parentheses have the highest priority, followed by Exponents, then Multiplication and Division, and lastly Addition and Subtraction. " +
    "For example: " +
    "Q. 2 + 3 * 4 " +
    "(3 * 4) => 12, 2 + 12 = 14. " +
    "Q. 2 + 3 + 5 * 4 - 8 / 2 " +
    "5 * 4 => 20, 8 / 2 => 4, 2 + 3 => 5, 5 + 20 => 25, 25 - 4 => 21. " +
    "YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND ONLY ONE CASE SHALL APPLY EVERY TIME: " +
    "Following are the cases: " +
  "1. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.: In this case, solve and return the answer in the format of a 2+2=4 ,3*4=12,5/6= 0.8333, 7-8= -1" +
"2. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.: In this case, solve for the given variable and just return that x^2 + 2x + 1 = 0 Solution is x = -1 , 3y + 4x = 0 ,5x^2 + 6y + 7 = 12 Solution is x= 4/5- √41/3 y= -16/15 + 4√41/15 " +
"3. Assigning values to variables like x = 4, y = 5, z = 6, etc.: In this case just return x=4, y=5, z=6" +
"4. Analyzing Graphical Math problems and try to return the function or equation for which graph can exists and if ask for something to solve the graph than solve it and return the answer, There can be word problems represented in drawing form, such as cars colliding, distance measuring from shadow, trigonometric problems, problems on the Pythagorean theorem,"+
 "adding runs from a cricket wagon wheel, etc for this return the peoblem statement that is shown in figure with answer in concise. These will have a drawing representing some  and accompanying information with the image. PAY CLOSE ATTENTION TO DIFFERENT COLORS FOR THESE PROBLEMs and for this return a brief and very short and concise description for that scenario or senery. " +
 "5 . There can be any differentiation or integration you just solve and give answer like d/dx x^2 so you return d/dx x^2 = 2x and same wth any dirrentiation" +
"5. Detecting Abstract Concepts that a drawing might show, such as love, hate, jealousy, patriotism, or a historic reference to war, invention, discovery, quote, etc.for this return a brief very short and concise description about the drawn thing."
                     }  // Optional prompt for Gemini
                ]
            }
        ];

        const result = await model.generateContentStream({ contents });
        let responseText = '';
        for await (let response of result.stream) {
            responseText += response.text();
        }
        return responseText;
    } catch (err) {
        console.error("Error analyzing with Gemini:", err);
        return "Analysis failed.";
    }
}

app.listen(PORT, () => {
    console.log("Server is listening on port 8000");
});

