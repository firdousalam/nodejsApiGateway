const express = require("express");
const router = express.Router();
const axios = require("axios");
const registry = require("../kvm/registry.json");
//console.log(registry);
router.all("/proxy/:apiName",(req,res)=>{
    console.log("API get Called");
    // we will write all logic here for API Gateway
    console.log(req.params.apiName);
   // console.log(registry)
    if(typeof registry.service[req.params.apiName] != 'undefined')
    {
        const url = registry.service[req.params.apiName].url+registry.service[req.params.apiName].apiName;
        console.log(url)
        axios({
            "method" :  req.method,
            "url"    : url ,
            "headers": req.headers,
            "data"   : req.body
        }).then((response)=>{
            if(typeof response.data !='undefined'){  
                res.send(response.data);
            }
            else
            {
                res.status(500).send(response);
            }
        }).catch((error)=>{
            res.status(500).send(error);
        })
    } else{
        res.status(404).send("API not found");
    }
})
/*
router.all('/testapi/:apiName/:pathName',(req,res)=>{
    console.log("API get Called");
    // we will write all logic here for API Gateway
    console.log(req.params.apiName);
    console.log(registry.services)
    if(typeof registry.services[req.params.apiName] != 'undefined')
    {
        console.log(req.method);
        console.log(registry.services[req.params.apiName].url+"/"+registry.services[req.params.apiName].apiName+req.params.pathName)
        const url = registry.services[req.params.apiName].url+"/"+registry.services[req.params.apiName].apiName+req.params.pathName;
        axios({
            "method" :  req.method,
            "url"    : url ,
            "headers": req.headers,
            "data"   : req.body
        }).then((response)=>{
            if(typeof response.data !='undefined'){  
                res.send(response.data);
            }
            else
            {
                res.status(500).send(response);
            }
        }).catch((error)=>{
            res.status(500).send(error);
        })
        /* 
        // service discovery for get method i.e to fetch data
        if(registry.services[req.params.apiName].method == 'get')
        {
            axios.get(registry.services[req.params.apiName].url+req.params.pathName).then((response)=>{
                if(typeof response.data !='undefined'){  
                    res.send(response.data);
                }
                else
                {
                    res.status(500).send(response);
                }
            }).catch((error)=>{
                res.status(500).send(error);
            })
        }
       
        // service discovery for post method i.e to Save Data
        if(registry.services[req.params.apiName].method == 'post')
        {
            var postData = req.body;
            axios.post(registry.services[req.params.apiName].url+req.params.pathName,data).then((response)=>{
                if(typeof response.data !='undefined'){  
                    res.send(response.data);
                }
                else
                {
                    res.status(500).send(response);
                }
            }).catch((error)=>{
                res.status(500).send(error);
            })
        }
         // service discovery for put method i.e to Update Data
        if(registry.services[req.params.apiName].method == 'put')
        {
            var postData = req.body;
            axios.put(registry.services[req.params.apiName].url+req.params.pathName,data).then((response)=>{
                if(typeof response.data !='undefined'){  
                    res.send(response.data);
                }
                else
                {
                    res.status(500).send(response);
                }
            }).catch((error)=>{
                res.status(500).send(error);
            })
        }
        // service discovery for delete method i.e to delete Data
        if(registry.services[req.params.apiName].method == 'delete')
        {
            axios.delete(registry.services[req.params.apiName].url+req.params.pathName).then((response)=>{
                if(typeof response.data !='undefined'){  
                    res.send(response.data);
                }
                else
                {
                    res.status(500).send(response);
                }
            }).catch((error)=>{
                res.status(500).send(error);
            })
        }
       
    }
    else{
        res.status(404).send("API not found");
    }
    
})

*/
module.exports = router;