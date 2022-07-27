const { Router } = require('express');
const router = Router();



router.get('/iecho', (req, res, next) => {
   const text = req.query.text
   let flag = isNaN(text)
   
   try {
       if (text) {
           if (flag === false) {
               return res.status(400).json({ error:'no text' })
           } else {
                let reverseText = text.split('').reverse();
                reverseText = reverseText.join('') 

                if (text == reverseText) {
                    return res.status(200).json({
                        palindromo: true,
                        text: reverseText
                    })
                }
                return res.status(200).json({
                    palindromo: false,
                    text : reverseText
                })

           }
           
       } else {
           return res.status(200).json({ message: 'No ingresoningin texto' })
       }
   } catch (error) {
       next(error);
   }
})



module.exports = router