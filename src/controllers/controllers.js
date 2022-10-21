const axios = require('axios');
require('dotenv').config();
const API_KEY=process.env.API_KEY;

//--Utils--//
const getApiFile = async (fileName) => {
    try {
        const response = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`, { headers: { Authorization: API_KEY } });
        if (response.data) {
            if (response.data.status) {
                return { message: "file not found" }
            }
            const apiFile = response.data;
            return apiFile;
        };
    } catch (error) {
        return (error);
    };
};


//--challenge--//
const challenge = async (req, res, next) => {
    // console.log(API_KEY)
    try {
        const response = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/files`, { headers: {Authorization: API_KEY} });
        const listFiles = response.data.files;
        if (Array.isArray(listFiles)) {
            let data = [];
            for (i = 0; i < listFiles.length; i++) {
                const file = await getApiFile(listFiles[i]);
                if (!file.message) {
                    let formatByNtestFile = file.split(["\n"+listFiles[i]]);
                    let formatByCommaFile = formatByNtestFile.map((e) => e.split([","]));
                    let eliminateEmpty = formatByCommaFile.map((e) => e.filter(item => item !== "" ));
                    let filterValidDataFile = eliminateEmpty.filter((e) => e.length === 3);
                    let FormatedLines=[];
                    filterValidDataFile.map((e) => FormatedLines.push( { text:e[0], number:e[1],hex:e[2] }));
                    let ReformatedFile = {file : listFiles[i],lines: FormatedLines};
                    filterValidDataFile.length !== 0 ? data.push(ReformatedFile):null ;
                }
            };
            return res.json(data).status(200);
        };
        return res.json({ message: "bad response from API" }).status(404);
    } catch (error) {
        return next(error);
    };
};

//--optional--//
const getApiList = async (req, res, next) => {
    try {
        const response = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/files`, { headers: { Authorization: API_KEY } });
        if (response.data.files){
        const listFiles = response.data.files;
        return res.json(listFiles).status(200);
        };
        return res.json({ message: "bad response from API" }).status(404);
    } catch (error) {
        return (error);
    };
};

module.exports = { challenge, getApiList };