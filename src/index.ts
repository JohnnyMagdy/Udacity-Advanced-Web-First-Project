import express from 'express';

const app = express();
const port = 3000;

app.get('/test', (req,res)=>{
    res.send("Hello, worled");
});

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
});

export default app;