let request=require('request');
let cheerio=require('cheerio');
let folder_making=require("./folder_making.js")

function getallcompanydata(link,product){
    request(link,function(error,response,data)
{
    processdata(data,product);
});
}

let Nature_of_Business;
let Total_Number_of_Employees;
let Legal_Status_of_Firm;
let Annual_Turnover;

function processdata(html,product)
{
    // let companyname="abcd"
    // let product="cashew"
    let ch=cheerio.load(html);
    let rating=ch(".FM_str.FM_c7.FM_mb15 .FM_bo");
    let star=ch(rating).text();
    //console.log(star);
    let name=ch(".FM_C0.FM_lh1.FM_Lsp1.FM_f28.FM_bo.FM_cpdef [href='javascript:void(0);']");
    let companyname=ch(name).text();

    let data=ch(".Fm_lh18.FM_f16.FM_c1")
    for(let i=0;i<data.length;i++)
    {
        Nature_of_Business=ch(data[0]).text();
        Total_Number_of_Employees=ch(data[1]).text();
        Legal_Status_of_Firm=ch(data[3]).text();
        Annual_Turnover=ch(data[4]).text();
    }
    let callnum=ch("#footerPNS");
    let number=ch(callnum).attr("data-pnsno");
    //console.log(num);
    let fulladdress=ch(".FM_f14.FM_Lsp4.Fm_lh10.FM_m3.FM_fl");
    let address=ch(fulladdress).text().trim();
    folder_making(product,companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address)
}
module.exports=getallcompanydata;

