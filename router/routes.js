const express = require("express");
const router = express.Router();
const axios = require("axios");
const registry = require("./kvm/registry.json")
router.all("/:apiName/:pathName",(req,res)=>{
    // we will write all logic here for API Gateway
    if(typeof registry.services[req.params.apiName] != 'undefined')
    {
        axios({
            "method" :  req.method,
            "url"    :  registry.services[req.params.apiName].url+req.params.pathName,
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
        */
    }
    else{
        res.status(404).send("API not found");
    }
    
})


module.exports = router;