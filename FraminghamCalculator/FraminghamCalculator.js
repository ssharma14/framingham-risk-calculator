"use strict";
const date = new Date();
const year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
if (month < 10)
    month = '0' + month;
if (day < 10)
    day = '0' + day;
const today = `${year}/${month}/${day}`;
document.getElementById("cDate").value = today;
class testCalculation {
    constructor() {
        this.age_now = parseFloat(document.getElementById("cAge").value);
        this.gender = (document.getElementById("cMale").checked) ? true : false;
        this.treated_bp = (document.getElementById("cTreated").checked) ? true : false;
        this.systolic = parseFloat(document.getElementById("cSystolic").value);
        this.total_chol = parseFloat(document.getElementById("cCholesterol").value);
        this.hdl = parseFloat(document.getElementById("cHDL").value);
        this.smoking = (document.getElementById("cCurSmoker").checked) ? true : false;
        this.isdiabetic = (document.getElementById("isDiabetesY").checked) ? true : false;
        this.score = 0;
        this.risk = 0;
        this.heartAge = 0;
        this.riskLevel = '';
    }
}
function testCalculations() {
    const values = new testCalculation();
    calculateRisk(values.age_now, values.score, values.gender, values.total_chol, values.hdl, values.systolic, values.isdiabetic, values.smoking, values.treated_bp);
    getCvdRisk(values.score, values.gender, values.risk);
    getRiskLevel(values.risk, values.score, values.riskLevel);
    getHeartAge(values.score, values.gender, values.heartAge);
    validation(values.score, values.riskLevel, values.risk, values.heartAge);
}
function calculateRisk(age_now, score, gender, total_chol, hdl, systolic, smoking, isdiabetic, treated_bp) {
    score = getAgeScore(age_now, gender);
    score += getTtlCholesterolScore(total_chol, gender);
    score += getTtlHdlScore(hdl);
    score += getBloodPressureScore(systolic, gender, treated_bp);
    score += isSmoking(smoking, gender);
    score += isPatientDiabetic(isdiabetic, gender);
    console.log(score);
}
function getAgeScore(age_now, gender) {
    let ageScore = 0;
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
function getTtlCholesterolScore(total_chol, gender) {
    let cholScore = 0;
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
function getTtlHdlScore(hdl) {
    let hd1Score = 0;
    if (hdl < 0.9) {
        hd1Score = 2;
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
function getBloodPressureScore(systolic, gender, treated_bp) {
    let bpScore = 0;
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
function isSmoking(smoking, gender) {
    let smokingScore = 0;
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
function isPatientDiabetic(isdiabetic, gender) {
    let diabetesScore = 0;
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
function getCvdRisk(score, gender, risk) {
    var i = 0;
    var j = (gender == true) ? 0 : 1;
    const cvdRiskTable = [['LT1', 'LT1'], [1.1, 'LT1'], [1.4, 1.0], [1.6, 1.2], [1.9, 1.5], [2.3, 1.7], [2.8, 2.0], [3.3, 2.3], [3.9, 2.8], [4.7, 3.3], [5.6, 3.9], [6.7, 4.5], [7.9, 5.3], [9.4, 6.3], [11.2, 7.3], [13.3, 8.6], [15.6, 10.0], [18.4, 11.7], [21.6, 13.7], [25.3, 15.9], [29.4, 18.51], ['GT30', 21.5], ['GT30', 24.8], ['GT30', 27.5], ['GT30', 'GT30']];
    if (score > -3 && score <= 21) {
        i = score + 3;
    }
    else if (score > 21) {
        i = 24;
    }
    risk = cvdRiskTable[i][j];
    if (Number.isNaN(risk)) {
    }
    return risk;
}
function getRiskLevel(risk, score, riskLevel) {
    if (isNaN(score)) {
        document.getElementById('low-risk').style.display = 'none';
        document.getElementById('high-risk').style.display = 'none';
        document.getElementById('moderate-risk').style.display = 'none';
    }
    else {
        if (Number.isNaN(risk) && risk != null) {
        }
        if (risk < 10 && risk != null) {
            document.getElementById('low-risk').style.display = 'inline-block';
            document.getElementById('high-risk').style.display = 'none';
            document.getElementById('moderate-risk').style.display = 'none';
            riskLevel = 'Low Risk';
        }
        else if (risk >= 20 && risk != null) {
            document.getElementById('high-risk').style.display = 'inline-block';
            document.getElementById('low-risk').style.display = 'none';
            document.getElementById('moderate-risk').style.display = 'none';
            riskLevel = 'High Risk';
        }
        else if (risk != null) {
            document.getElementById('moderate-risk').style.display = 'inline-block';
            document.getElementById('high-risk').style.display = 'none';
            document.getElementById('low-risk').style.display = 'none';
            riskLevel = 'Moderate Risk';
        }
    }
    return riskLevel;
}
function getHeartAge(score, gender, heartage) {
    var i = 0;
    var j = (gender == true) ? 0 : 1;
    const heartAgeTable = [['LT30', 'LT30'], [30, 'LT30'], [32, 31], [34, 34], [36, 36], [38, 39], [40, 42], [42, 45], [45, 48], [48, 51], [51, 55], [54, 59], [57, 64], [60, 68], [64, 73], [68, 79], [72, 'GT80'], [76, 'GT80'], ['GT80', 'GT80']];
    if (score > -1 && score <= 17) {
        i = score + 1;
    }
    else if (score > 17) {
        i = 18;
    }
    heartage = heartAgeTable[i][j];
    if (Number.isNaN(heartage)) {
    }
    return heartage;
}
;
function validation(score, riskLevel, risk, heartage) {
    var _a, _b;
    const systolicBp = document.getElementById("cSystolic").value;
    const tchol = document.getElementById("cCholesterol").value;
    const chdl = document.getElementById("cHDL").value;
    const age = document.getElementById("cAge").value;
    if (systolicBp.length == 0 || tchol.length == 0 || chdl.length == 0 || age.length == 0) {
        alert("please fill on all the information correctly");
        ageValidation();
        hdlValidation();
        tlchlValidation();
        bpValidation();
        (_a = document.getElementById("cal")) === null || _a === void 0 ? void 0 : _a.setAttribute('data-target', '');
    }
    else {
        var score1 = Object();
        document.getElementById("total_points").innerHTML = 'Total Score: ' + score + ' points';
        document.getElementById("result_value").innerHTML = 'Risk: ' + risk + '%';
        document.getElementById("heart_age").innerHTML = 'HeartAge: ' + heartage + ' years';
        document.getElementById("risk_level").innerHTML = riskLevel;
        score1.Framingham_Total_points = parseInt(document.getElementById("total_points").innerHTML);
        score1.Framingham_Risk_percentage = document.getElementById("result_value").innerHTML;
        score1.Heart_age_in_years = document.getElementById("heart_age").innerHTML;
        score1.Risk_level = document.getElementById("risk_level").innerHTML;
        (_b = document.getElementById("cal")) === null || _b === void 0 ? void 0 : _b.setAttribute('data-target', '#exampleModal');
    }
}
function ageValidation() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let age = document.getElementById("cAge").value;
    let ageStyle = document.getElementById("cAge");
    const age_now = Number(document.getElementById("cAge").value);
    const error = document.getElementById("age_error");
    if (age.length == 0) {
        error === null || error === void 0 ? void 0 : error.classList.add('visible');
        ageStyle === null || ageStyle === void 0 ? void 0 : ageStyle.classList.add('error');
    }
    else {
        error === null || error === void 0 ? void 0 : error.classList.remove('visible');
        ageStyle === null || ageStyle === void 0 ? void 0 : ageStyle.classList.remove('error');
    }
    if (age.length != 0) {
        if (age_now < 30) {
            alert("Your patient age is " + age_now + " years. Framingham risk calculator is only applicable for patients of age 30 years and above.");
            (_a = document.querySelector("#cSystolic")) === null || _a === void 0 ? void 0 : _a.setAttribute('disabled', 'disabled');
            (_b = document.querySelector("#cCholesterol")) === null || _b === void 0 ? void 0 : _b.setAttribute('disabled', '');
            (_c = document.querySelector("#cHDL")) === null || _c === void 0 ? void 0 : _c.setAttribute('disabled', '');
            (_d = document.querySelector("#cal")) === null || _d === void 0 ? void 0 : _d.setAttribute('disabled', '');
        }
        else {
            (_e = document.querySelector("#cSystolic")) === null || _e === void 0 ? void 0 : _e.removeAttribute('disabled');
            (_f = document.querySelector("#cCholesterol")) === null || _f === void 0 ? void 0 : _f.removeAttribute('disabled');
            (_g = document.querySelector("#cHDL")) === null || _g === void 0 ? void 0 : _g.removeAttribute('disabled');
            (_h = document.querySelector("#cal")) === null || _h === void 0 ? void 0 : _h.removeAttribute('disabled');
        }
    }
}
;
function bpValidation() {
    let bp = document.getElementById("cSystolic").value;
    let bpStyle = document.getElementById("cSystolic");
    const error = document.getElementById("bp_error");
    if (bp.length == 0) {
        error === null || error === void 0 ? void 0 : error.classList.add('visible');
        bpStyle === null || bpStyle === void 0 ? void 0 : bpStyle.classList.add('error');
    }
    else if (Number(bp) < 10) {
        if (error != undefined) {
            error.innerHTML = "";
            error.innerHTML = "*Enter a value greater than or equal to 10";
        }
        bpStyle === null || bpStyle === void 0 ? void 0 : bpStyle.classList.add('error');
    }
    else {
        error === null || error === void 0 ? void 0 : error.classList.remove('visible');
        bpStyle === null || bpStyle === void 0 ? void 0 : bpStyle.classList.remove('error');
    }
}
;
function tlchlValidation() {
    let tlchol = document.getElementById("cCholesterol").value;
    let cholStyle = document.getElementById("cCholesterol");
    const error = document.getElementById("chl_error");
    if (tlchol.length == 0) {
        error === null || error === void 0 ? void 0 : error.classList.add('visible');
        cholStyle === null || cholStyle === void 0 ? void 0 : cholStyle.classList.add('error');
    }
    else if (Number(tlchol) < 0) {
        if (error != undefined) {
            error.innerHTML = "";
            error.innerHTML = "*Enter a value greater than or equal to 10";
        }
        cholStyle === null || cholStyle === void 0 ? void 0 : cholStyle.classList.add('error');
    }
    else {
        error === null || error === void 0 ? void 0 : error.classList.remove('visible');
        cholStyle === null || cholStyle === void 0 ? void 0 : cholStyle.classList.remove('error');
    }
}
;
function hdlValidation() {
    let chdl = document.getElementById("cHDL").value;
    let chdlStyle = document.getElementById("cSystolic");
    const error = document.getElementById("hdl_error");
    if (chdl.length == 0) {
        error === null || error === void 0 ? void 0 : error.classList.add('visible');
        chdlStyle === null || chdlStyle === void 0 ? void 0 : chdlStyle.classList.add('error');
    }
    else if (Number(chdl) < 0) {
        if (error != undefined) {
            error.innerHTML = "";
            error.innerHTML = "*Enter a value greater than or equal to 0";
        }
        chdlStyle === null || chdlStyle === void 0 ? void 0 : chdlStyle.classList.add('error');
    }
    else {
        error === null || error === void 0 ? void 0 : error.classList.remove('visible');
        chdlStyle === null || chdlStyle === void 0 ? void 0 : chdlStyle.classList.remove('error');
    }
}
;
function onModalClose() {
    var formID = 'framingham';
    var resetForm = document.getElementById(formID);
    resetForm.reset();
}
//# sourceMappingURL=FraminghamCalculator.js.map