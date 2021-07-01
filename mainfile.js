let pup= require("puppeteer");
let getallcompanydata=require("./pro1.js")


let gpage;
let gbrowser;
let phonenum="8282828282";
let product="oil";

pup
.launch({headless:false,
defaultViewport:null,
slowMo:50,
args:["--start-maximized"]
})
.then(function(browser){
    gbrowser=browser;
    return browser.pages();
})
.then(function(pagesarr){
    gpage=pagesarr[0];
    return gpage.goto("https://my.indiamart.com/");
})
.then(function(){
    
    return gpage.waitForSelector("[placeholder='Enter your Mobile Number']");  
})
.then(function(){

        return gpage.type("[placeholder='Enter your Mobile Number']",phonenum);  
})
.then(function(){
    
    return gpage.waitForSelector("[value=' Sign In ']");  
})
.then(function(){
    return Promise.all([
        gpage.waitForNavigation("[value=' Sign In ']"),
        gpage.click("[value=' Sign In ']"),
    ]);
})
.then(function(){
    
    return gpage.waitForSelector("[placeholder='Enter product / service to search']");  
})
.then(function(){

        return gpage.type("[placeholder='Enter product / service to search']",product);  
})
.then(function(){
    
    return gpage.waitForSelector(".hd_srBtn.ch_fr.Hd_pa.cpo");  
})
.then(function(){
    return Promise.all([
        gpage.waitForNavigation(".hd_srBtn.ch_fr.Hd_pa.cpo"),
        gpage.click(".hd_srBtn.ch_fr.Hd_pa.cpo"),
    ]);
})
.then(function(){
     return gpage.evaluate(function(){
        let alldivs=document.querySelectorAll("h4.lcname a")
        let companyname=document.querySelectorAll("h4.lcname a span");
        let links=[];
        for(let i=0;i<alldivs.length;i++){
            let link=alldivs[i].getAttribute("href");
            links.push(link)
        }
        let cmp = []
        for(let i=0;i<alldivs.length;i++){
            let name=companyname[i].textContent;
            cmp.push(name);
            
        }
        return { links, cmp};
    });
   
})
.then(function(obj){
    for(let i=0;i<obj.links.length;i++){
        let URL=obj.links[i];
        getallcompanydata(URL,product);
    }
    return gbrowser;
})
.then(function(){
    gbrowser.close()
})
.catch(function(err){
    console.log(err);
})


