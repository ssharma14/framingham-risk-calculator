"use strict";

//Ste New date for date input field
const date:Date = new Date()
const year:number = date.getFullYear()

let month: number | string = date.getMonth() + 1
let day: number | string = date.getDate()

if (month < 10) month = '0' + month
if (day < 10) day = '0' + day

const today:string|number = `${year}/${month}/${day}`;
(document.getElementById("cDate") as HTMLInputElement).value = today;

var age_now:number;
var gender:boolean;
var treated_bp:boolean;
var systolic:number;
var total_chol:number;
var hdl:number;
var smoking:boolean;
var isdiabetic:boolean;
var score:number = 0;//total points
var risk:string|number = 0;
var heartAge:number = 0;
var riskLevel:string='';


function testCalculations(){
    age_now = parseFloat((document.getElementById("cAge") as HTMLInputElement).value);
    gender = ((document.getElementById("cMale") as HTMLInputElement).checked) ? true : false;
    treated_bp =  ((document.getElementById("cTreated") as HTMLInputElement).checked) ? true : false;
    systolic =  parseFloat((document.getElementById("cSystolic") as HTMLInputElement).value);
    total_chol = parseFloat((document.getElementById("cCholesterol") as HTMLInputElement).value);
    hdl = parseFloat((document.getElementById("cHDL") as HTMLInputElement).value);
    smoking = ((document.getElementById("cCurSmoker") as HTMLInputElement).checked) ? true : false;
    isdiabetic = ((document.getElementById("isDiabetesY") as HTMLInputElement).checked) ? true : false;
    score = 0;//total points
    risk = 0;
    heartAge = 0;
    riskLevel='';
    
    calculateRisk(); //for calculating total points
    getCvdRisk() //for calculating risk percentage

    getRiskLevel(risk) //for calculating level of risk ie, low,moderate,high
    riskLevel = getRiskLevel(risk);

    getHeartAge(); //for calculating heart age

    validation();
}

function calculateRisk() {
    score = getAgeScore();
    score += getTtlCholesterolScore();
    score += getTtlHdlScore();
    score += getBloodPressureScore();
    score += isSmoking();
    score += isPatientDiabetic()
    console.log(score);
}

function getAgeScore() {
    let ageScore:number = 0;
    if (age_now >= 30 && age_now <= 34) {
        ageScore = 0;
    }

    if (age_now >= 35 && age_now <= 39) {
        ageScore = 2;
    }

    if (age_now >= 40 && age_now <= 44) {
        ageScore = (gender == true) ? 5 : 4;
    }

    if (age_now >= 45 && age_now <= 49) {
        ageScore = (gender == true) ? 7 : 5;
    }

    if (age_now >= 50 && age_now <= 54) {
        ageScore = (gender == true) ? 8 : 7;
    }

    if (age_now >= 55 && age_now <= 59) {
        ageScore = (gender == true) ? 10 : 8;
    }

    if (age_now >= 60 && age_now <= 64) {
        ageScore = (gender == true) ? 11 : 9;
    }

    if (age_now >= 65 && age_now <= 69) {
        ageScore = (gender == true) ? 13 : 10;
    }

    if (age_now >= 70 && age_now <= 74) {
        ageScore = (gender == true) ? 14 : 11;
    }

    if (age_now >= 75) {
        ageScore = (gender == true) ? 15 : 12;
    }
    return ageScore;
}


function getTtlCholesterolScore() {
    let cholScore:number = 0;
    if (total_chol < 4.1) {
        cholScore = 0;
    }

    if (total_chol >= 4.1 && total_chol < 5.2) {
        cholScore = 1;
    }

    if (total_chol >= 5.2 && total_chol < 6.2) {
        cholScore = (gender == true) ? 2 : 3;
    }

    if (total_chol >= 6.2 && total_chol <= 7.2) {
        cholScore = (gender == true) ? 3 : 4;
    }

    if (total_chol > 7.2) {
        cholScore = (gender == true) ? 4 : 5;
    }

    return cholScore;
}


function getTtlHdlScore() {
    let hd1Score:number = 0;
    if (hdl < 0.9) {
        hd1Score =  2;
    }

    if (hdl >= 0.9 && hdl <= 1.19) {
        hd1Score = 1;
    }

    if (hdl >= 1.2 && hdl <= 1.29) {
        hd1Score = 0;
    }

    if (hdl >= 1.3 && hdl <= 1.6) {
        hd1Score = -1;
    }

    if (hdl > 1.6) {
        hd1Score = -2;
    }
    return hd1Score;
}

function getBloodPressureScore() {
    let bpScore:number = 0;
    if (systolic < 120) {
        if (gender == true) {
            bpScore = (treated_bp) ? 0 : -2;
        }
        else {
            bpScore = (treated_bp) ? -1 : -3;
        }
    }

    if (systolic >= 120 && systolic <= 129) {
        bpScore = (treated_bp) ? 2 : 0;
    }

    if (systolic >= 130 && systolic <= 139) {
        bpScore = (treated_bp) ? 3 : 1;
    }

    if (systolic >= 140 && systolic <= 149) {
        if (gender == true) {
            bpScore = (treated_bp) ? 4 : 2;
        }
        else {
            bpScore = (treated_bp) ? 5 : 2;
        }
    }

    if (systolic >= 150 && systolic <= 159) {
        if (gender == true) {
            bpScore = (treated_bp) ? 4 : 2;
        }
        else {
            bpScore = (treated_bp) ? 6 : 4;
        }
    }

    if (systolic >= 160) {
        if (gender == true) {
            bpScore = (treated_bp) ? 5 : 3;
        }
        else {
            bpScore = (treated_bp) ? 7 : 5;
        }
    }
    return bpScore;
}

function isSmoking() {
    let smokingScore:number = 0;
    if (smoking == true) {
        if (gender == true) {
            smokingScore = 4;
        }
        else {
            smokingScore = 3;
        }
    }
    else {
        smokingScore = 0;
    }
    return smokingScore;
}

function isPatientDiabetic() {
    let diabetesScore:number = 0;
    if (isdiabetic == true) {
        if (gender == true) {
            diabetesScore = 3;
        }
        else {
            diabetesScore = 4;
        }
    }
    else {
        diabetesScore = 0;
    }
    return diabetesScore;
}

function getCvdRisk() {
    var i = 0; //for getting index of risk and heart table
    var j = (gender == true) ? 0 : 1;
    const cvdRiskTable:any|undefined[][] = [['LT1', 'LT1'], [1.1, 'LT1'], [1.4, 1.0], [1.6, 1.2], [1.9, 1.5], [2.3, 1.7], [2.8, 2.0], [3.3, 2.3], [3.9, 2.8], [4.7, 3.3], [5.6, 3.9], [6.7, 4.5], [7.9, 5.3], [9.4, 6.3], [11.2, 7.3], [13.3, 8.6], [15.6, 10.0], [18.4, 11.7], [21.6, 13.7], [25.3, 15.9], [29.4, 18.51], ['GT30', 21.5], ['GT30', 24.8], ['GT30', 27.5], ['GT30', 'GT30']]; // male, female - starts at -3

    // translate score to index. Basically we are getting values from cvdRiskTable
    if (score > -3 && score <= 21) {
        i = score + 3;

    } else if (score > 21) {
        i = 24;
    }
    
    risk = cvdRiskTable[i][j];

    // if (Number.isNaN(risk)) {
    //     // risk = risk.replace('LT', '&lt;');
    //     // risk = risk.replace('GT', '&gt;');
    // }

    return risk;
}

function getRiskLevel(risk:string|number) {
    if (isNaN(score)) {
        (document.getElementById('low-risk') as HTMLInputElement).style.display = 'none';
        (document.getElementById('high-risk') as HTMLInputElement).style.display = 'none';
        (document.getElementById('moderate-risk') as HTMLInputElement).style.display = 'none';
    }
    else {
        if (risk != null) {
            // risk = risk.substring(4);
        }
        if (risk < 10 && risk != null) {
            (document.getElementById('low-risk') as HTMLInputElement).style.display = 'inline-block';
            (document.getElementById('high-risk') as HTMLInputElement).style.display = 'none';
            (document.getElementById('moderate-risk') as HTMLInputElement).style.display = 'none';
            riskLevel = 'Low Risk';
        }
        else if (risk >= 20 && risk != null) {
            (document.getElementById('high-risk') as HTMLInputElement).style.display = 'inline-block';
            (document.getElementById('low-risk') as HTMLInputElement).style.display = 'none';
            (document.getElementById('moderate-risk') as HTMLInputElement).style.display = 'none';
            riskLevel = 'High Risk';
        }
        else if (risk != null) {
            (document.getElementById('moderate-risk') as HTMLInputElement).style.display = 'inline-block';
            (document.getElementById('high-risk') as HTMLInputElement).style.display = 'none';
            (document.getElementById('low-risk') as HTMLInputElement).style.display = 'none';
            riskLevel = 'Moderate Risk';
        }
    }
    return riskLevel;
}

function getHeartAge() {
    var i = 0;
    var j = (gender == true) ? 0 : 1;

    const heartAgeTable:any|undefined[][] = [['LT30', 'LT30'], [30, 'LT30'], [32, 31], [34, 34], [36, 36], [38, 39], [40, 42], [42, 45], [45, 48], [48, 51], [51, 55], [54, 59], [57, 64], [60, 68], [64, 73], [68, 79], [72, 'GT80'], [76, 'GT80'], ['GT80', 'GT80']]; // male, female - starts at -1

    // translate score to index. getting heart age from heartAgeTable
    if (score > -1 && score <= 17) {
        i = score + 1;
    }
    else if (score > 17) {
        i = 18;
    }

    heartAge = heartAgeTable[i][j]
    // if (Number.isNaN(heartAge)) {
    //     // heartage = heartage.replace('LT', '&lt;');
    //     // heartage = heartage.replace('GT', '&gt;');
    // }
    return heartAge;
};

function validation() {
    console.log(score);
    const systolicBp:string = (document.getElementById("cSystolic") as HTMLInputElement).value;
    const tchol:string = (document.getElementById("cCholesterol") as HTMLInputElement).value;
    const chdl:string = (document.getElementById("cHDL") as HTMLInputElement).value;
    const age:string = (document.getElementById("cAge") as HTMLInputElement).value;
    if (systolicBp.length == 0 || tchol.length == 0 || chdl.length == 0 || age.length == 0) {
        alert("please fill on all the information correctly");
        ageValidation();
        hdlValidation();
        tlchlValidation();
        bpValidation();
        document.getElementById("cal")?.setAttribute('data-target', '');
    }
    else {
        var score1 = Object();
        (document.getElementById("total_points") as HTMLInputElement).innerHTML = 'Total Score: ' +  score + ' points';
        (document.getElementById("result_value") as HTMLInputElement).innerHTML = 'Risk: ' + risk + '%';
        (document.getElementById("heart_age") as HTMLInputElement).innerHTML = 'HeartAge: ' + heartAge + ' years';
        (document.getElementById("risk_level") as HTMLInputElement).innerHTML = riskLevel;
        score1.Framingham_Total_points = parseInt((document.getElementById("total_points") as HTMLInputElement).innerHTML);
        score1.Framingham_Risk_percentage = (document.getElementById("result_value") as HTMLInputElement).innerHTML;
        score1.Heart_age_in_years = (document.getElementById("heart_age") as HTMLInputElement).innerHTML;
        score1.Risk_level = (document.getElementById("risk_level") as HTMLInputElement).innerHTML
        document.getElementById("cal")?.setAttribute('data-target', '#exampleModal');
    }
}

function ageValidation() {
    let age = (document.getElementById("cAge") as HTMLInputElement).value;
    let ageStyle = document.getElementById("cAge") as HTMLElement|null;
    const age_now:number = Number((document.getElementById("cAge") as HTMLInputElement).value);
    const error = document.getElementById("age_error") as HTMLElement|null;
    if(age.length == 0) {
        error?.classList.add('visible');
        ageStyle?.classList.add('error');
        // document.querySelector("#cAge").focus();
    }
    else {
        error?.classList.remove('visible');
        ageStyle?.classList.remove('error');
    }
    if(age.length != 0){
        if (age_now < 30) {
            alert("Your patient age is " + age_now + " years. Framingham risk calculator is only applicable for patients of age 30 years and above.");
            document.querySelector("#cSystolic")?.setAttribute('disabled', 'disabled');
            document.querySelector("#cCholesterol")?.setAttribute('disabled', '');
            document.querySelector("#cHDL")?.setAttribute('disabled', '');
            document.querySelector("#cal")?.setAttribute('disabled', '');
        }
        else {
            document.querySelector("#cSystolic")?.removeAttribute('disabled');
            document.querySelector("#cCholesterol")?.removeAttribute('disabled');
            document.querySelector("#cHDL")?.removeAttribute('disabled');
            document.querySelector("#cal")?.removeAttribute('disabled');
        }
    }
};


function bpValidation() {
    let bp = (document.getElementById("cSystolic") as HTMLInputElement).value;
    let bpStyle: HTMLElement|null = document.getElementById("cSystolic");
    const error = document.getElementById("bp_error") as HTMLElement|null;
    if (bp.length == 0) {
        error?.classList.add('visible');
        bpStyle?.classList.add('error');
    }
    else if (Number(bp) < 10) {
        if(error != undefined){
            error.innerHTML = "";
            error.innerHTML = "*Enter a value greater than or equal to 10";
        }
        bpStyle?.classList.add('error');
        //document.querySelector("#cSystolic").focus();
    }
    else {
        error?.classList.remove('visible');
        bpStyle?.classList.remove('error');
    }
};

function tlchlValidation() {
    let tlchol = (document.getElementById("cCholesterol")  as HTMLInputElement).value;
    let cholStyle = document.getElementById("cCholesterol") as HTMLElement|null;
    const error = document.getElementById("chl_error") as HTMLElement|null;
    if (tlchol.length == 0) {
        error?.classList.add('visible');
        cholStyle?.classList.add('error');
    }
    else if (Number(tlchol) < 0) {
        if(error != undefined){
            error.innerHTML = "";
            error.innerHTML = "*Enter a value greater than or equal to 10";
        }
        cholStyle?.classList.add('error');
    }
    else {
        error?.classList.remove('visible');
        cholStyle?.classList.remove('error');
    }
};

function hdlValidation() {
    let chdl = (document.getElementById("cHDL") as HTMLInputElement).value;
    let chdlStyle: HTMLElement|null = document.getElementById("cSystolic");
    const error = document.getElementById("hdl_error") as HTMLElement|null;
    if (chdl.length == 0) {
        error?.classList.add('visible');
        chdlStyle?.classList.add('error');
    }
    else if (Number(chdl) < 0) {
        if(error != undefined){
            error.innerHTML = "";
            error.innerHTML = "*Enter a value greater than or equal to 0";
        }
        chdlStyle?.classList.add('error');
    }
    else {
        error?.classList.remove('visible');
        chdlStyle?.classList.remove('error');
    }
};

function onModalClose(){
    var formID = 'framingham';
    var resetForm = <HTMLFormElement>document.getElementById(formID);
    resetForm.reset();
}