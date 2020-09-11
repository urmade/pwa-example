import express from "express";
import path from "path";
import notificationsHandler from "./notifications";

const app = express();

app.use(express.static(path.join(__dirname,"..","..","assets")));
app.use("/api", notificationsHandler);

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"..","..","assets","index.html"));
})
app.get("/blog/new", (req,res) => {
    res.sendFile(path.join(__dirname,"..","..","assets","newblog.html"));
})

app.listen(process.env.PORT || 5000, () => { console.info("Server running on Port 5000") })