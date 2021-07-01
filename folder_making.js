let fs=require('fs');
let path=require('path');
const { createInflate } = require('zlib');
//let convertfile=require("./XLS.js")
let xlsx=require("xlsx")

let requiredpath

function folder_making(product,companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address)
{
    requiredpath=path.join("./data",product)
    if(fs.existsSync(requiredpath))
    {
        createfile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address);
    }
    else{
        fs.mkdirSync(requiredpath)
        createfile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address);
    }
    mainfile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address);
}


function createfile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address)
{
    let paths=path.join(requiredpath,companyname+".json")
    let companyfile=[];
    let Details=
    {
        Company_Name:companyname,
        Stars_in_review:star,
        Nature_of_Business:Nature_of_Business,
        Total_Number_of_Employees:Total_Number_of_Employees,
        Legal_Status_of_Firm:Legal_Status_of_Firm,
        Annual_Turnover:Annual_Turnover,
        Phone_Number:number,
        Address:address
    }
    companyfile.push(Details);
    fs.writeFileSync(paths,JSON.stringify(companyfile));
}

function mainfile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address)
{
    requiredpath=path.join("./data","Compiled.json")
    if(fs.existsSync(requiredpath))
    {
        updatefile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address);
    }
    else{
        createmainfile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address);
    }
}

function createmainfile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address)
{
    let ourrequiredpath=path.join("./data","Compiled.json")
    let companyfile=[];
    let Details=
    {
        Company_Name:companyname,
        Stars_in_review:star,
        Nature_of_Business:Nature_of_Business,
        Total_Number_of_Employees:Total_Number_of_Employees,
        Legal_Status_of_Firm:Legal_Status_of_Firm,
        Annual_Turnover:Annual_Turnover,
        Phone_Number:number,
        Address:address
    }
    companyfile.push(Details);
    fs.writeFileSync(ourrequiredpath,JSON.stringify(companyfile));
}

function updatefile(companyname,star,Nature_of_Business,Total_Number_of_Employees,Legal_Status_of_Firm,Annual_Turnover,number,address)
{
    let ourrequiredpath=path.join("./data","Compiled.json")
    let companydata=fs.readFileSync(requiredpath);
    companydata=JSON.parse(companydata);
    let Details=
    {
        Company_Name:companyname,
        Stars_in_review:star,
        Nature_of_Business:Nature_of_Business,
        Total_Number_of_Employees:Total_Number_of_Employees,
        Legal_Status_of_Firm:Legal_Status_of_Firm,
        Annual_Turnover:Annual_Turnover,
        Phone_Number:number,
        Address:address
    }
    companydata.push(Details);
    fs.writeFileSync(ourrequiredpath,JSON.stringify(companydata));
}


module.exports=folder_making;