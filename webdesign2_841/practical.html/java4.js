function calculate() {
    let count = document.getElementById("subjects").value;
    let total = 0;

    for (let i = 1; i <= count; i++) {
        let marks = parseFloat(prompt("Enter marks for subject " + i));
        total += marks;
    }

    let average = total / count;
    let grade = "";
    let result = "";

    if (average >= 75) {
        grade = "A";
        result = "Pass";
    } else if (average >= 50) {
        grade = "B";
        result = "Pass";
    } else if (average >= 35) {
        grade = "C";
        result = "Pass";
    } else {
        grade = "F";
        result = "Fail";
    }

    document.getElementById("result").innerHTML =
        "Total Marks: " + total + "<br>" +
        "Average Marks: " + average.toFixed(2) + "<br>" +
        "Grade: " + grade + "<br>" +
        "Result: " + result;
}